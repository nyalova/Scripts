import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import { InvestorProfileForm, type InvestorProfileFormValues } from '../components/domain/InvestorProfileForm';
import { colors } from '../constants/theme';
import { useAuth } from '../lib/auth-context';
import { supabase } from '../lib/supabase';

export default function EditInvestorProfileScreen() {
  const { session } = useAuth();
  const [initialValues, setInitialValues] = useState<InvestorProfileFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    supabase
      .from('investor_profiles')
      .select('name, about, sector_interest, investment_amount')
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
    <InvestorProfileForm
      title="Investor Profilini Düzenle"
      submitLabel="Kaydet"
      initialValues={initialValues ?? undefined}
      onSubmit={async (values) => {
        if (!session) return 'Oturum bulunamadı, tekrar giriş yapın.';

        const { error } = await supabase
          .from('investor_profiles')
          .update(values)
          .eq('user_id', session.user.id);

        if (error) return error.message;

        router.back();
        return null;
      }}
    />
  );
}
