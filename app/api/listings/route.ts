import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getListings, isListingsConfigured } from "@/lib/simplyrets";
import { ListingQuerySchema } from "@/lib/schemas";

export async function GET(request: Request) {
  if (!isListingsConfigured()) {
    return NextResponse.json(
      {
        error: "MLS feed not configured",
        listings: [],
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const raw: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      raw[key] = value;
    });

    const query = ListingQuerySchema.parse(raw);
    const listings = await getListings(query);

    return NextResponse.json({
      listings,
      count: listings.length,
      configured: true,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.flatten() },
        { status: 400 }
      );
    }

    console.error("Listings API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch listings",
      },
      { status: 500 }
    );
  }
}
