import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Role } from '../types/database';

interface AuthContextValue {
  session: Session | null;
  role: Role | null;
  hasCompletedProfile: boolean;
  loading: boolean;
  setRole: (role: Role) => Promise<{ error: string | null }>;
  markProfileCompleted: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadProfileStatus(
  userId: string
): Promise<{ role: Role | null; hasCompletedProfile: boolean }> {
  const { data: profileRow } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (!profileRow) {
    return { role: null, hasCompletedProfile: false };
  }

  const table = profileRow.role === 'startup' ? 'startup_profiles' : 'investor_profiles';
  const { data: profileDetail } = await supabase
    .from(table)
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  return { role: profileRow.role, hasCompletedProfile: !!profileDetail };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRoleState] = useState<Role | null>(null);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      if (data.session) {
        const status = await loadProfileStatus(data.session.user.id);
        if (!isMounted) return;
        setRoleState(status.role);
        setHasCompletedProfile(status.hasCompletedProfile);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      if (newSession) {
        setLoading(true);
        const status = await loadProfileStatus(newSession.user.id);
        if (!isMounted) return;
        setRoleState(status.role);
        setHasCompletedProfile(status.hasCompletedProfile);
        setLoading(false);
      } else {
        setRoleState(null);
        setHasCompletedProfile(false);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      role,
      hasCompletedProfile,
      loading,
      async setRole(newRole) {
        if (!session) return { error: 'Oturum bulunamadı.' };
        const { error } = await supabase
          .from('profiles')
          .insert({ id: session.user.id, role: newRole });
        if (error) return { error: error.message };
        setRoleState(newRole);
        return { error: null };
      },
      markProfileCompleted() {
        setHasCompletedProfile(true);
      },
      async signOut() {
        await supabase.auth.signOut();
      },
    }),
    [session, role, hasCompletedProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
