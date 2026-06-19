"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const fields = ["minprice", "maxprice", "minbeds", "minbaths", "cities"];
    for (const field of fields) {
      const value = form.get(field)?.toString().trim();
      if (value) params.set(field, value);
    }

    router.push(`/listings?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-border bg-white p-6 sm:grid-cols-2 lg:grid-cols-5"
    >
      <div className="space-y-2">
        <Label htmlFor="minprice">Min Price</Label>
        <Input
          id="minprice"
          name="minprice"
          type="number"
          placeholder="300000"
          defaultValue={searchParams.get("minprice") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxprice">Max Price</Label>
        <Input
          id="maxprice"
          name="maxprice"
          type="number"
          placeholder="600000"
          defaultValue={searchParams.get("maxprice") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="minbeds">Min Beds</Label>
        <Input
          id="minbeds"
          name="minbeds"
          type="number"
          min={1}
          placeholder="3"
          defaultValue={searchParams.get("minbeds") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="minbaths">Min Baths</Label>
        <Input
          id="minbaths"
          name="minbaths"
          type="number"
          min={1}
          placeholder="2"
          defaultValue={searchParams.get("minbaths") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cities">City</Label>
        <Input
          id="cities"
          name="cities"
          placeholder="Buford, Suwanee"
          defaultValue={searchParams.get("cities") ?? ""}
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-5">
        <Button type="submit" className="bg-navy-900 hover:bg-navy-800">
          Search Homes
        </Button>
      </div>
    </form>
  );
}
