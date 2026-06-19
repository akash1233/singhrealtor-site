import type { LeadInput } from "./schemas";

function mapSource(source: LeadInput["source"]): string {
  const map: Record<LeadInput["source"], string> = {
    Website: "Web Site",
    Chatbot: "Other",
    Valuation: "Web Site",
    ShowingRequest: "Web Site",
    SavedSearch: "Web Site",
  };
  return map[source];
}

export async function createLead(lead: LeadInput): Promise<string> {
  const url = process.env.ESPOCRM_URL;
  const apiKey = process.env.ESPOCRM_API_KEY;

  if (!url || !apiKey) {
    throw new Error("EspoCRM is not configured");
  }

  const response = await fetch(`${url}/api/v1/Lead`, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: lead.firstName,
      lastName: lead.lastName,
      emailAddress: lead.email,
      phoneNumber: lead.phoneNumber,
      description: lead.message,
      leadSource: mapSource(lead.source),
      status: "New",
      assignedUserId: process.env.ESPOCRM_SHWETA_USER_ID,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`EspoCRM error: ${response.status} ${error}`);
  }

  const data = (await response.json()) as { id: string };
  return data.id;
}
