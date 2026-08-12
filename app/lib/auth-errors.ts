export function mapAuthError(message: string | undefined): string {
  if (!message) return 'Bir şeyler ters gitti, tekrar deneyin.';
  const lower = message.toLowerCase();

  if (lower.includes('network') || lower.includes('fetch')) {
    return 'İnternet bağlantınızı kontrol edin.';
  }
  if (lower.includes('expired')) {
    return 'Kodun süresi doldu, yeni kod isteyin.';
  }
  if (lower.includes('otp') || (lower.includes('token') && lower.includes('invalid'))) {
    return 'Girdiğiniz kod hatalı.';
  }
  if (lower.includes('rate limit') || lower.includes('security purposes')) {
    return 'Çok fazla deneme yapıldı, birkaç saniye sonra tekrar deneyin.';
  }
  return message;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
