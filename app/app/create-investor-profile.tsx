import { InvestorProfileForm } from '../components/domain/InvestorProfileForm';
import { useAuth } from '../lib/auth-context';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';

export default function CreateInvestorProfileScreen() {
  const { session, markProfileCompleted } = useAuth();

  return (
    <InvestorProfileForm
      title="Investor Profilini Oluştur"
      submitLabel="Kaydet"
      onSubmit={async (values) => {
        if (!session) return 'Oturum bulunamadı, tekrar giriş yapın.';

        const { error } = await supabase.from('investor_profiles').insert({
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
