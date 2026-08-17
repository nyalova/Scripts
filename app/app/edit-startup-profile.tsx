import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import { StartupProfileForm, type StartupProfileFormValues } from '../components/domain/StartupProfileForm';
import { colors } from '../constants/theme';
import { useAuth } from '../lib/auth-context';
import { supabase } from '../lib/supabase';

export default function EditStartupProfileScreen() {
  const { session } = useAuth();
  const [initialValues, setInitialValues] = useState<StartupProfileFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    supabase
      .from('startup_profiles')
      .select('name, description, sector, funding_amount')
      .eq('user_id', session.user.id)
      .single()
      .then(({ data }) => {
        if (data) setInitialValues(data);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <StartupProfileForm
      title="Startup Profilini Düzenle"
      submitLabel="Kaydet"
      initialValues={initialValues ?? undefined}
      onSubmit={async (values) => {
        if (!session) return 'Oturum bulunamadı, tekrar giriş yapın.';

        const { error } = await supabase
          .from('startup_profiles')
          .update(values)
          .eq('user_id', session.user.id);

        if (error) return error.message;

        router.back();
        return null;
      }}
    />
  );
}
