import { z } from "zod";
import { getProduct } from "./catalog";

export const BUYER_TYPES = [
  { id: "individual", label: "Individual / household" },
  { id: "retailer", label: "Shop / retailer" },
  { id: "hotel", label: "Hotel / lodge" },
  { id: "restaurant", label: "Restaurant / caterer" },
  { id: "reseller", label: "Reseller / trader" },
  { id: "institution", label: "School / institution" },
  { id: "other", label: "Other business" },
] as const;

const phoneRe = /^(\+?254|0)[17]\d{8}$/;

export const enquiryItemSchema = z.object({
  slug: z.string().min(1, "Choose a product"),
  optionId: z.string().min(1, "Choose an option"),
  quantity: z.coerce.number().int("Whole numbers only").min(1, "At least 1").max(100000, "Too large"),
  notes: z.string().trim().max(300).optional(),
});

export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(100),
    phone: z
      .string()
      .transform((v) => v.replace(/[\s-]/g, ""))
      .refine((v) => phoneRe.test(v), "Enter a valid Kenyan number, e.g. 0712 345 678"),
    email: z.string().trim().max(255).email("Enter a valid email").optional().or(z.literal("")),
    buyerType: z.enum(BUYER_TYPES.map((b) => b.id) as [string, ...string[]], { errorMap: () => ({ message: "Select a buyer type" }) }),
    businessName: z.string().trim().max(120).optional(),
    location: z.string().trim().min(2, "Enter your town or delivery area").max(120),
    frequency: z.enum(["once", "weekly", "monthly"]),
    message: z.string().trim().max(1000, "Keep it under 1000 characters").optional(),
    items: z.array(enquiryItemSchema).min(1, "Add at least one product"),
  })
  .superRefine((v, ctx) => {
    if (v.buyerType !== "individual" && !v.businessName) {
      ctx.addIssue({ code: "custom", path: ["businessName"], message: "Enter your business name" });
    }
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const i of err.issues) {
    const k = i.path.join(".");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}

export function enquiryToText(e: Enquiry, ref: string) {
  const lines = e.items.map((it) => {
    const p = getProduct(it.slug);
    const o = p?.options.find((x) => x.id === it.optionId);
    return `• ${p?.name ?? it.slug} (${o?.label ?? it.optionId}) × ${it.quantity} ${p?.unit ?? ""}${it.notes ? ` — ${it.notes}` : ""}`;
  });
  const buyer = BUYER_TYPES.find((b) => b.id === e.buyerType)?.label;
  return [
    `Hello Urbanite Farm Ventures, this is a QUOTATION REQUEST (ref ${ref}).`,
    "",
    ...lines,
    "",
    `Name: ${e.name}${e.businessName ? ` (${e.businessName})` : ""}`,
    `Buyer type: ${buyer}`,
    `Phone: ${e.phone}${e.email ? ` · ${e.email}` : ""}`,
    `Location: ${e.location}`,
    `Frequency: ${e.frequency}`,
    e.message ? `Notes: ${e.message}` : "",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");
}

/**
 * Prototype submission. Replace the body with a server call (e.g. a server
 * function that stores the enquiry and notifies the farm) — callers only rely
 * on the returned reference.
 */
export async function submitEnquiry(e: Enquiry): Promise<{ reference: string }> {
  await new Promise((r) => setTimeout(r, 900));
  if (!e.items.length) throw new Error("No products in enquiry");
  const reference = `UFV-${Date.now().toString(36).slice(-5).toUpperCase()}`;
  return { reference };
}
