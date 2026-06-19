"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-navy-900">
        Something went wrong
      </h1>
      <p className="mt-4 text-muted-foreground">
        We encountered an unexpected error. Please try again or contact us
        directly.
      </p>
      <Button
        onClick={reset}
        className="mt-6 bg-navy-900 hover:bg-navy-800"
      >
        Try again
      </Button>
    </div>
  );
}
