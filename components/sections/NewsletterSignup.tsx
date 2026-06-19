"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Newsletter",
          lastName: "Subscriber",
          email,
          source: "Website",
          message: "Newsletter signup from homepage",
          consent: true,
        }),
      });

      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-y border-border bg-navy-900 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Newsletter
          </p>
          <h2 className="mt-2 font-heading text-2xl font-light sm:text-3xl">
            Sign up for market updates
          </h2>
          <p className="mt-2 text-sm text-navy-200">
            New listings, neighborhood guides, and Northeast Atlanta market news.
          </p>
        </div>

        {status === "success" ? (
          <p className="text-sm text-gold-400">Thank you for subscribing!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-11 bg-white px-6 text-xs uppercase tracking-widest text-navy-900 hover:bg-gold-400"
            >
              {status === "loading" ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="text-sm text-red-300">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
