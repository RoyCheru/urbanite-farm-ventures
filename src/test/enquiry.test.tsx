import { describe, expect, it } from "vitest";
import { enquirySchema } from "@/lib/enquiry";
import { mergeItem } from "@/lib/basket";
import { PRODUCTS } from "@/lib/catalog";

const base = { name: "Jane Doe", phone: "0712 345 678", email: "", buyerType: "individual", location: "Nakuru", frequency: "once", items: [{ slug: "farm-eggs", optionId: "trays", quantity: 2 }] };

describe("enquiry rules", () => {
  it("no product shows an invented price", () => {
    expect(PRODUCTS.every((p) => p.priceKes === null)).toBe(true);
  });
  it("requires business name for business buyers", () => {
    expect(enquirySchema.safeParse({ ...base, buyerType: "hotel" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...base, buyerType: "hotel", businessName: "Lake Hotel" }).success).toBe(true);
  });
  it("rejects invalid Kenyan phone numbers", () => {
    expect(enquirySchema.safeParse({ ...base, phone: "12345" }).success).toBe(false);
  });
  it("requires at least one product", () => {
    expect(enquirySchema.safeParse({ ...base, items: [] }).success).toBe(false);
  });
  it("merges the same product option in the basket", () => {
    const r = mergeItem([{ slug: "pigs", optionId: "weaners", quantity: 2 }], { slug: "pigs", optionId: "weaners", quantity: 3 });
    expect(r).toEqual([{ slug: "pigs", optionId: "weaners", quantity: 5, notes: undefined }]);
  });
});
