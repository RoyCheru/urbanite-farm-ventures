import eggs from "@/assets/eggs.jpg";
import eggsCollection from "@/assets/eggs-collection.jpg";
import eggSorting from "@/assets/egg-sorting.jpg";
import broilers from "@/assets/broilers.jpg";
import broilersFeeding from "@/assets/broilers-feeding.jpg";
import birdCheck from "@/assets/bird-check.jpg";
import pigs from "@/assets/pigs.jpg";
import pigsWeaners from "@/assets/pigs-weaners.jpg";
import produce from "@/assets/produce.jpg";
import produceCrate from "@/assets/produce-crate.jpg";

/**
 * Sample catalogue data. Prices, stock and specifications are intentionally
 * NOT set — the farm confirms them per enquiry. When a backend exists, replace
 * this module with a fetch (keep the Product shape).
 *
 * Pricing: each option can carry `priceKes` + `priceUnit` (e.g. "tray",
 * "bird", "kg", "pig"). Leave `priceKes` null until the farm confirms a real
 * figure — the UI then shows "Request a Quote" instead of an invented price.
 */
export type ProductOption = {
  id: string;
  label: string;
  hint?: string;
  /** null/undefined = price confirmed per enquiry. */
  priceKes?: number | null;
  /** Unit the price applies to, e.g. "tray", "bird", "kg", "pig". */
  priceUnit?: string;
};

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  name: string;
  category: "Poultry" | "Piggery" | "Produce";
  image: string;
  /** Gallery images for the product page — first is the main photo. */
  images: ProductImage[];
  /** Short factual availability note shown on the product page. */
  availability: string;
  short: string;
  description: string[];
  highlights: string[];
  optionLabel: string;
  options: ProductOption[];
  unit: string; // plural unit used for quantities
  minQty: number;
  /** null = "Request a Quote"; set a number (KES) only when the farm confirms it. */
  priceKes: number | null;
  priceUnit?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "farm-eggs",
    name: "Farm Eggs",
    category: "Poultry",
    image: eggs,
    images: [
      { src: eggs, alt: "Fresh brown farm eggs" },
      { src: eggsCollection, alt: "Collecting eggs into trays in the layer house" },
      { src: eggSorting, alt: "Sorting and packing eggs into trays" },
    ],
    availability: "Collected daily",
    short: "Fresh, clean eggs from our layers — by the tray or in bulk.",
    description: [
      "Our eggs are collected from our layer flock in Solai and sorted before sale.",
      "Available for households, shops, hotels and resellers. Tell us how many trays you need and how often, and we'll confirm availability and price.",
    ],
    highlights: ["Collected and sorted on the farm", "Single trays or bulk quantities", "One-off or regular supply"],
    optionLabel: "Order type",
    options: [
      { id: "trays", label: "Trays", hint: "Standard egg trays", priceKes: null, priceUnit: "tray" },
      { id: "regular", label: "Regular supply", hint: "Weekly or monthly — mention in notes", priceKes: null, priceUnit: "tray" },
    ],
    unit: "trays",
    minQty: 1,
    priceKes: null,
  },
  {
    slug: "broiler-chickens",
    name: "Broiler Chickens",
    category: "Poultry",
    image: broilers,
    images: [
      { src: broilers, alt: "Broiler chickens in their house" },
      { src: broilersFeeding, alt: "Broilers feeding in a clean poultry house" },
      { src: birdCheck, alt: "Health check on a broiler chicken" },
    ],
    availability: "Raised in batches",
    short: "Market-ready broilers, available live or dressed on request.",
    description: [
      "We raise broilers on the farm for households, butcheries, hotels and caterers.",
      "Choose live or dressed birds and the quantity you need. We'll get back to you with availability, current price and pickup or delivery options.",
    ],
    highlights: ["Live or dressed on request", "Small and bulk quantities", "Suitable for hospitality buyers"],
    optionLabel: "Preparation",
    options: [
      { id: "live", label: "Live birds", priceKes: null, priceUnit: "bird" },
      { id: "dressed", label: "Dressed (on request)", priceKes: null, priceUnit: "bird" },
    ],
    unit: "birds",
    minQty: 1,
    priceKes: null,
  },
  {
    slug: "pigs",
    name: "Pigs & Live Pigs",
    category: "Piggery",
    image: pigs,
    images: [
      { src: pigs, alt: "Pigs in the piggery" },
      { src: pigsWeaners, alt: "Weaner pigs being checked in their pen" },
    ],
    availability: "On request",
    short: "Weaners, growers and market-weight pigs from our piggery.",
    description: [
      "Our piggery supplies pigs at different stages, whether you are starting a pig unit or buying for market.",
      "Select the stage you're interested in. Weights, ages and prices vary, so we confirm details with you directly.",
    ],
    highlights: ["Weaners for starting or growing a unit", "Growers and market-weight pigs", "Details confirmed per enquiry"],
    optionLabel: "Stage",
    options: [
      { id: "weaners", label: "Weaners", priceKes: null, priceUnit: "pig" },
      { id: "growers", label: "Growers", priceKes: null, priceUnit: "pig" },
      { id: "market", label: "Market-weight", priceKes: null, priceUnit: "pig" },
    ],
    unit: "pigs",
    minQty: 1,
    priceKes: null,
  },
  {
    slug: "other-farm-products",
    name: "Other Farm Products",
    category: "Produce",
    image: produce,
    images: [
      { src: produce, alt: "Seasonal farm produce" },
      { src: produceCrate, alt: "A crate of freshly harvested vegetables" },
    ],
    availability: "Seasonal",
    short: "Seasonal produce from the farm — ask what's available.",
    description: [
      "Besides poultry and pigs, the farm produces seasonal items that change through the year.",
      "Add this to your basket and describe what you're looking for in the notes. We'll tell you what's currently available.",
    ],
    highlights: ["Changes with the season", "Ask about current availability", "Combine with other products in one enquiry"],
    optionLabel: "Request",
    options: [{ id: "seasonal", label: "Seasonal produce", hint: "Describe what you need in the notes", priceKes: null, priceUnit: "unit" }],
    unit: "units",
    minQty: 1,
    priceKes: null,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function priceLabel(p: Product) {
  return p.priceKes == null ? "Request a Quote" : `KES ${p.priceKes.toLocaleString()}${p.priceUnit ? ` / ${p.priceUnit}` : ""}`;
}

/** Price line for a single option, e.g. "KES 450 / tray"; null when unconfirmed. */
export function optionPriceLabel(o: ProductOption) {
  if (o.priceKes == null) return null;
  return `KES ${o.priceKes.toLocaleString()}${o.priceUnit ? ` / ${o.priceUnit}` : ""}`;
}
