import type { LeadInput } from "./schemas";

const RESEND_SANDBOX_FROM = "Singh Realtor LLC <onboarding@resend.dev>";

function getFromAddress(): string {
  if (
    process.env.RESEND_SANDBOX === "true" ||
    !process.env.RESEND_FROM_EMAIL
  ) {
    return RESEND_SANDBOX_FROM;
  }
  const from = process.env.RESEND_FROM_EMAIL;
  return from.includes("<") ? from : `Singh Realtor LLC <${from}>`;
}

function parseResendError(status: number, body: string): string {
  try {
    const data = JSON.parse(body) as { message?: string };
    const message = data.message ?? body;

    if (status === 403 && message.includes("not verified")) {
      return (
        "Sender domain is not verified in Resend. For testing, set RESEND_SANDBOX=true " +
        "and RESEND_FROM_EMAIL=onboarding@resend.dev in .env.local. For production, verify " +
        "your domain at https://resend.com/domains."
      );
    }

    if (status === 403 && message.includes("only send testing emails")) {
      return (
        "Resend test mode: emails can only be sent to your Resend account email. " +
        "Set LEAD_NOTIFICATION_EMAIL to the address you used to sign up for Resend."
      );
    }

    return message;
  } catch {
    return body;
  }
}

export async function sendLeadNotification(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !toEmail) {
    throw new Error("Resend email is not configured");
  }

  const fromEmail = getFromAddress();

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
    throw new Error(
      `Resend error: ${response.status} ${parseResendError(response.status, error)}`
    );
  }
}
