import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminNotification(data: { name: string, phone: string, equipment?: string, message?: string }) {
  try {
    const { name, phone, equipment, message } = data;
    
    await resend.emails.send({
      from: 'NAF Texnika <onboarding@resend.dev>', // Resend pulsuz hesabı üçün bu standartdır
      to: 'xalisliumudvar98@gmail.com',
      subject: 'Yeni Sifariş / Müraciət (NAF Texnika)',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #f59e0b;">Yeni Müraciət</h2>
          <p><strong>Ad:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          ${equipment ? `<p><strong>Texnika:</strong> ${equipment}</p>` : ''}
          ${message ? `<p><strong>Mesaj:</strong> ${message}</p>` : ''}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Bu bildiriş NAF Texnika saytından avtomatik göndərilib.</p>
        </div>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}
