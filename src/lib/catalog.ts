import eggs from "@/assets/eggs.jpg";
import broilers from "@/assets/broilers.jpg";
import pigs from "@/assets/pigs.jpg";
import produce from "@/assets/produce.jpg";

/**
 * Sample catalogue data. Prices, stock and specifications are intentionally
 * NOT set — the farm confirms them per enquiry. When a backend exists, replace
 * this module with a fetch (keep the Product shape).
 */
export type ProductOption = { id: string; label: string; hint?: string };

export type Product = {
  slug: string;
  name: string;
  category: "Poultry" | "Piggery" | "Produce";
  image: string;
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
    short: "Fresh, clean eggs from our layers — by the tray or in bulk.",
    description: [
      "Our eggs are collected from our layer flock in Solai and sorted before sale.",
      "Available for households, shops, hotels and resellers. Tell us how many trays you need and how often, and we'll confirm availability and price.",
    ],
    highlights: ["Collected and sorted on the farm", "Single trays or bulk quantities", "One-off or regular supply"],
    optionLabel: "Order type",
    options: [
      { id: "trays", label: "Trays", hint: "Standard egg trays" },
      { id: "regular", label: "Regular supply", hint: "Weekly or monthly — mention in notes" },
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
    short: "Market-ready broilers, available live or dressed on request.",
    description: [
      "We raise broilers on the farm for households, butcheries, hotels and caterers.",
      "Choose live or dressed birds and the quantity you need. We'll get back to you with availability, current price and pickup or delivery options.",
    ],
    highlights: ["Live or dressed on request", "Small and bulk quantities", "Suitable for hospitality buyers"],
    optionLabel: "Preparation",
    options: [
      { id: "live", label: "Live birds" },
      { id: "dressed", label: "Dressed (on request)" },
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
    short: "Weaners, growers and market-weight pigs from our piggery.",
    description: [
      "Our piggery supplies pigs at different stages, whether you are starting a pig unit or buying for market.",
      "Select the stage you're interested in. Weights, ages and prices vary, so we confirm details with you directly.",
    ],
    highlights: ["Weaners for starting or growing a unit", "Growers and market-weight pigs", "Details confirmed per enquiry"],
    optionLabel: "Stage",
    options: [
      { id: "weaners", label: "Weaners" },
      { id: "growers", label: "Growers" },
      { id: "market", label: "Market-weight" },
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
    short: "Seasonal produce from the farm — ask what's available.",
    description: [
      "Besides poultry and pigs, the farm produces seasonal items that change through the year.",
      "Add this to your basket and describe what you're looking for in the notes. We'll tell you what's currently available.",
    ],
    highlights: ["Changes with the season", "Ask about current availability", "Combine with other products in one enquiry"],
    optionLabel: "Request",
    options: [{ id: "seasonal", label: "Seasonal produce", hint: "Describe what you need in the notes" }],
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
