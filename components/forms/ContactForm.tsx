"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LeadInput } from "@/lib/schemas";
import { SITE_NAME } from "@/lib/site-content";

interface ContactFormProps {
  source?: LeadInput["source"];
  className?: string;
}

export function ContactForm({ source = "Website", className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: (formData.get("phoneNumber") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
      source,
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit form"
      );
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="font-medium text-green-900">Thank you for reaching out!</p>
          <p className="mt-2 text-sm text-green-700">
            We will be in touch within one business day.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" required />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="phoneNumber">Phone (optional)</Label>
        <Input id="phoneNumber" name="phoneNumber" type="tel" />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your real estate goals..."
        />
      </div>

      <div className="mt-4 flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-input"
        />
        <Label htmlFor="consent" className="text-sm text-muted-foreground">
          I agree to be contacted by {SITE_NAME} regarding my inquiry.
        </Label>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-destructive">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 h-11 w-full bg-navy-900 px-8 text-xs uppercase tracking-widest hover:bg-navy-800 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
