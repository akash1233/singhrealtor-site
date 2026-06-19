import type { LeadInput } from "./schemas";

export async function sendLeadNotification(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !toEmail) {
    throw new Error("Resend email is not configured");
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: `New lead from ${lead.firstName} ${lead.lastName}`,
      html: `
        <h2>New Website Lead</h2>
        <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phoneNumber ?? "Not provided"}</p>
        <p><strong>Source:</strong> ${lead.source}</p>
        <p><strong>Message:</strong></p>
        <p>${lead.message ?? "No message"}</p>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend error: ${response.status} ${error}`);
  }
}
