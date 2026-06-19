import { z } from "zod";

export const LeadSourceSchema = z.enum([
  "Website",
  "Chatbot",
  "Valuation",
  "ShowingRequest",
  "SavedSearch",
]);

export const LeadInputSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().max(20).optional(),
  source: LeadSourceSchema.default("Website"),
  message: z.string().max(2000).optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to be contacted" }),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;
export type LeadSource = z.infer<typeof LeadSourceSchema>;

// ── SimplyRETS listing schemas ─────────────────────────────────────────────

export const AddressSchema = z.object({
  deliveryLine: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
});

export const SimplyRetsListingSchema = z.object({
  mlsId: z.union([z.string(), z.number()]).transform(String),
  listPrice: z.number().optional(),
  address: AddressSchema.optional(),
  property: z
    .object({
      bedrooms: z.number().optional(),
      bathsFull: z.number().optional(),
      bathsHalf: z.number().optional(),
      area: z.number().optional(),
    })
    .optional(),
  mls: z
    .object({
      status: z.string().optional(),
    })
    .optional(),
  photos: z.array(z.string()).optional(),
});

export const SimplyRetsListSchema = z.array(SimplyRetsListingSchema);

export const ListingQuerySchema = z.object({
  minprice: z.coerce.number().optional(),
  maxprice: z.coerce.number().optional(),
  minbeds: z.coerce.number().optional(),
  maxbeds: z.coerce.number().optional(),
  minbaths: z.coerce.number().optional(),
  cities: z.string().optional(),
  zipcodes: z.string().optional(),
  status: z.enum(["Active", "Pending", "Closed"]).optional(),
  limit: z.coerce.number().min(1).max(500).optional(),
  offset: z.coerce.number().min(0).optional(),
  sort: z.enum(["listprice", "listdate", "beds", "baths"]).optional(),
  sortdir: z.enum(["asc", "desc"]).optional(),
});

export type ListingQuery = z.infer<typeof ListingQuerySchema>;

export interface Listing {
  mlsId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  photos: string[];
  image: string;
  status: string;
}
