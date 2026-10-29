import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { PageHeader } from "@/components/site/layout";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Farm Products | Urbanite Farm Ventures, Solai" },
      { name: "description", content: "Browse farm eggs, broiler chickens, pigs and seasonal produce from Urbanite Farm Ventures in Solai, Nakuru. Add items to your basket and request a quote." },
      { property: "og:title", content: "Farm Products | Urbanite Farm Ventures" },
      { property: "og:description", content: "Eggs, broilers, pigs and seasonal produce from Solai, Nakuru — request a quote online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const CATS: ("All" | Product["category"])[] = ["All", "Poultry", "Piggery", "Produce"];

function ProductsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Our farm products" crumbs={[{ label: "Products" }]}
        text="Prices depend on quantity, season and availability, so every product is quoted on request. Add what you need to your basket and send one enquiry." />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {CATS.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={cn("rounded-full border px-5 py-2 text-sm font-semibold transition", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary hover:text-primary")}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl bg-secondary p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-semibold">Buying for a business?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Use the bulk enquiry form for larger or regular orders.</p>
            </div>
            <Link to="/bulk-orders" className="rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90">Bulk enquiry form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
