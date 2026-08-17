import { StartupProfileForm } from '../components/domain/StartupProfileForm';
import { useAuth } from '../lib/auth-context';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';

export default function CreateStartupProfileScreen() {
  const { session, markProfileCompleted } = useAuth();

  return (
    <StartupProfileForm
      title="Startup'ını Oluştur"
      submitLabel="Yayınla"
      onSubmit={async (values) => {
        if (!session) return 'Oturum bulunamadı, tekrar giriş yapın.';

        const { error } = await supabase.from('startup_profiles').insert({
          user_id: session.user.id,
          ...values,
        });

        if (error) return error.message;

        markProfileCompleted();
        router.replace('/');
        return null;
      }}
    />
  );
}
