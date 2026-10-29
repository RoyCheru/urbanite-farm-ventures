import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { getProduct, priceLabel } from "@/lib/catalog";
import { useBasket } from "@/lib/basket";
import { PageHeader } from "@/components/site/layout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/basket")({
  head: () => ({
    meta: [
      { title: "Enquiry Basket | Urbanite Farm Ventures" },
      { name: "description", content: "Review the farm products you've selected and send one quotation request to Urbanite Farm Ventures." },
      { property: "og:title", content: "Enquiry Basket | Urbanite Farm Ventures" },
      { property: "og:description", content: "Review your selected farm products and request a quote." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BasketPage,
});

function BasketPage() {
  const { items, ready, update, remove, clear } = useBasket();
  const [submitted, setSubmitted] = useState(false);
  const snapshot = items;

  return (
    <>
      <PageHeader eyebrow="Quotation request" title="Your enquiry basket" crumbs={[{ label: "Basket" }]}
        text="Review your selections, then send them to the farm as one quotation request. This is not a confirmed order." />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          {!ready ? (
            <div className="space-y-4">{[0, 1].map((i) => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}</div>
          ) : submitted ? (
            <EnquiryForm basketItems={[]} />
          ) : items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card p-10 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary"><ShoppingBasket className="h-7 w-7" /></span>
              <h2 className="mt-5 text-2xl font-semibold">Your basket is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">Browse our products and add what you need to request a quote.</p>
              <Link to="/products" className="mt-6 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Browse products</Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{items.length} item{items.length === 1 ? "" : "s"}</h2>
                  <button onClick={clear} className="text-sm font-semibold text-muted-foreground hover:text-destructive">Clear basket</button>
                </div>
                <ul className="mt-5 space-y-4">
                  {items.map((it) => {
                    const p = getProduct(it.slug);
                    if (!p) return null;
                    const o = p.options.find((x) => x.id === it.optionId);
                    return (
                      <li key={it.slug + it.optionId} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                        <img src={p.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link to="/products/$slug" params={{ slug: p.slug }} className="font-semibold hover:text-primary">{p.name}</Link>
                              <p className="text-xs text-muted-foreground">{p.optionLabel}: {o?.label}</p>
                            </div>
                            <button onClick={() => remove(it.slug, it.optionId)} aria-label={`Remove ${p.name}`} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                            <div className="inline-flex items-center rounded-lg border border-border">
                              <button aria-label="Decrease" onClick={() => update(it.slug, it.optionId, { quantity: Math.max(1, it.quantity - 1) })} className="grid h-8 w-8 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                              <span className="w-10 text-center text-sm font-semibold">{it.quantity}</span>
                              <button aria-label="Increase" onClick={() => update(it.slug, it.optionId, { quantity: it.quantity + 1 })} className="grid h-8 w-8 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                            </div>
                            <span className="text-xs text-muted-foreground">{p.unit} · <span className="font-semibold text-primary">{priceLabel(p)}</span></span>
                          </div>
                          {it.notes && <p className="mt-2 text-xs italic text-muted-foreground">"{it.notes}"</p>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Link to="/products" className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline">+ Add more products</Link>
              </div>
              <EnquiryForm basketItems={snapshot} onSubmitted={() => { setSubmitted(true); }} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
