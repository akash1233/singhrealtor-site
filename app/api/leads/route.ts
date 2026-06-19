import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createLead } from "@/lib/crm";
import { sendLeadNotification } from "@/lib/email";
import { LeadInputSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = LeadInputSchema.parse(body);

    let leadId: string | undefined;
    let method: "crm" | "email" = "email";

    const crmConfigured =
      process.env.ESPOCRM_URL && process.env.ESPOCRM_API_KEY;

    if (crmConfigured) {
      try {
        leadId = await createLead(lead);
        method = "crm";
      } catch (crmError) {
        console.error("EspoCRM failed, falling back to email:", crmError);
      }
    }

    if (method !== "crm") {
      await sendLeadNotification(lead);
    }

    return NextResponse.json({
      success: true,
      leadId,
      method,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.flatten() },
        { status: 400 }
      );
    }

    console.error("Lead submission failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process lead submission",
      },
      { status: 500 }
    );
  }
}
