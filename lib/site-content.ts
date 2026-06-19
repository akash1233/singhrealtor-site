/** Site constants and curated imagery for Northeast Atlanta suburban real estate */

export const SITE_NAME = "Singh Realtor LLC";
export const AGENT_NAME = "Shweta Singh";
export const SITE_EMAIL = "shweta03singh@gmail.com";

export const SITE_PHONE = "9802547720";
export const SITE_PHONE_DISPLAY = "(980) 254-7720";
export const SITE_PHONE_TEL = "+19802547720";
export const SERVICE_AREA = "Northeast Atlanta Suburbs";
export const SERVICE_AREA_DETAIL = "Gwinnett & Forsyth Counties, GA";
export const SERVICE_CITIES =
  "Buford, Suwanee, Duluth, Lawrenceville, Sugar Hill, and Cumming";

export const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80",
    alt: "Charming suburban home in Northeast Atlanta",
    caption: "Northeast Atlanta",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
    alt: "Classic brick home on a tree-lined street",
    caption: "Buford & Suwanee",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    alt: "Welcoming family home with porch and landscaping",
    caption: "Sugar Hill",
  },
  {
    src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=80",
    alt: "Quiet suburban neighborhood street",
    caption: "Gwinnett County",
  },
] as const;

export const agentPhoto = {
  src: "/images/shweta-singh.webp",
  alt: `${AGENT_NAME} — ${SITE_NAME} real estate agent`,
};

export const featuredListings = [
  {
    id: "1",
    address: "123 Oak Lane",
    city: "Buford",
    state: "GA",
    zip: "30518",
    price: 425000,
    beds: 4,
    baths: 3,
    sqft: 2280,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  },
  {
    id: "2",
    address: "456 Maple Drive",
    city: "Sugar Hill",
    state: "GA",
    zip: "30518",
    price: 385000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    id: "3",
    address: "789 Pine Court",
    city: "Suwanee",
    state: "GA",
    zip: "30024",
    price: 475000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  },
  {
    id: "4",
    address: "210 Heritage Way",
    city: "Lawrenceville",
    state: "GA",
    zip: "30043",
    price: 355000,
    beds: 3,
    baths: 2,
    sqft: 1720,
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9ad2?w=800&q=80",
  },
  {
    id: "5",
    address: "1520 Peachtree Parkway",
    city: "Duluth",
    state: "GA",
    zip: "30096",
    price: 399000,
    beds: 4,
    baths: 3,
    sqft: 2100,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
  {
    id: "6",
    address: "88 Mill Creek Road",
    city: "Dacula",
    state: "GA",
    zip: "30019",
    price: 445000,
    beds: 4,
    baths: 3,
    sqft: 2380,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
] as const;

export const neighborhoods = [
  {
    slug: "buford",
    name: "Buford",
    description: "Historic downtown, Lake Lanier access, and growing family neighborhoods.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    slug: "suwanee",
    name: "Suwanee",
    description: "Award-winning town center, top schools, and vibrant community events.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    slug: "duluth",
    name: "Duluth",
    description: "Festivals, dining, and convenient access along the I-85 corridor.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    slug: "lawrenceville",
    name: "Lawrenceville",
    description: "Historic square, diverse housing options, and Gwinnett County hub.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
  },
  {
    slug: "sugar-hill",
    name: "Sugar Hill",
    description: "Quiet streets, excellent schools, and a tight-knit suburban feel.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  },
  {
    slug: "cumming",
    name: "Cumming",
    description: "Forsyth County living with parks, lake recreation, and new construction.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Shweta made our first home purchase stress-free. Her knowledge of Northeast Atlanta suburbs helped us find the perfect fit for our family.",
    name: "Jennifer & Mark T.",
    title: "First-Time Buyers",
    location: "Buford, GA",
  },
  {
    quote:
      "We sold above asking in under two weeks. Shweta's marketing and pricing advice were spot on — she treated our sale like her own.",
    name: "David R.",
    title: "Seller",
    location: "Sugar Hill, GA",
  },
  {
    quote:
      "Professional, responsive, and genuinely caring. Shweta helped us relocate to Suwanee and made the whole process easy.",
    name: "Priya S.",
    title: "Relocation Client",
    location: "Suwanee, GA",
  },
  {
    quote:
      "From staging advice to negotiation, Shweta guided us through every step. We felt informed and confident the entire time.",
    name: "Michael & Lisa K.",
    title: "Buyers",
    location: "Lawrenceville, GA",
  },
  {
    quote:
      "Shweta knows the Gwinnett County market well. She helped us find a home in our budget without compromising on what mattered to us.",
    name: "Robert H.",
    title: "Buyer",
    location: "Duluth, GA",
  },
] as const;
