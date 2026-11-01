import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Minus, Plus, ShoppingBasket, Info, BadgeCheck } from "lucide-react";
import { PRODUCTS, getProduct, priceLabel, optionPriceLabel } from "@/lib/catalog";
import { useBasket } from "@/lib/basket";
import { PageHeader } from "@/components/site/layout";
import { ProductCard } from "@/components/site/ProductCard";
import { WhatsAppButton } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `${p.name} | Urbanite Farm Ventures` : "Product unavailable | Urbanite Farm Ventures";
    const desc = p ? `${p.short} Request a quote from Urbanite Farm Ventures in Solai, Nakuru.` : "This product could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-40 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <p className="mt-3 text-muted-foreground">It may have been removed or the link is incorrect.</p>
      <Link to="/products" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Browse all products</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-40 text-center">
      <h1 className="text-3xl font-semibold">This product didn't load</h1>
      <Link to="/products" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to products</Link>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add } = useBasket();
  const [optionId, setOptionId] = useState(p.options[0]?.id ?? "");
  const [qty, setQty] = useState(p.minQty);
  const [notes, setNotes] = useState("");
  const [imgIdx, setImgIdx] = useState(0);
  const option = p.options.find((o) => o.id === optionId) ?? p.options[0]!;
  const optionPrice = optionPriceLabel(option);

  function addToBasket() {
    if (!Number.isInteger(qty) || qty < p.minQty) return;
    add({ slug: p.slug, optionId, quantity: qty, notes: notes.trim() || undefined });
    toast.success(`${qty} ${p.unit} of ${p.name} added`, {
      description: option.label,
      action: { label: "View basket", onClick: () => (window.location.href = "/basket") },
    });
    setNotes("");
  }

  const qtyInvalid = !Number.isInteger(qty) || qty < p.minQty;

  return (
    <>
      <PageHeader eyebrow={p.category} title={p.name} crumbs={[{ label: "Products", to: "/products" }, { label: p.name }]} />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <img src={p.images[imgIdx]!.src} alt={p.images[imgIdx]!.alt} width={1024} height={1024} className="aspect-[5/4] w-full rounded-3xl object-cover shadow-card" />
            {p.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {p.images.map((img, i) => (
                  <button key={img.alt} type="button" onClick={() => setImgIdx(i)} aria-label={`View photo: ${img.alt}`} aria-pressed={imgIdx === i}
                    className={cn("aspect-square overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", imgIdx === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                    <img src={img.src} alt="" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="inline-flex rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground">{priceLabel(p)}</p>
              <p className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-muted-foreground"><BadgeCheck className="h-4 w-4 text-primary" />{p.availability}</p>
            </div>
            {p.description.map((d) => <p key={d} className="mt-4 leading-relaxed text-muted-foreground">{d}</p>)}
            <ul className="mt-6 space-y-2">
              {p.highlights.map((h) => <li key={h} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{h}</li>)}
            </ul>

            <div className="mt-8 space-y-6 rounded-3xl border border-border bg-card p-6">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">{p.optionLabel}</legend>
                <div className="flex flex-wrap gap-2">
                  {p.options.map((o) => (
                    <button key={o.id} type="button" aria-pressed={optionId === o.id} onClick={() => setOptionId(o.id)}
                      className={cn("rounded-xl border px-4 py-2.5 text-sm font-semibold transition", optionId === o.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>
                      {o.label}
                    </button>
                  ))}
                </div>
                {option.hint && <p className="mt-2 text-xs text-muted-foreground">{option.hint}</p>}
              </fieldset>

              <div>
                <label htmlFor="qty" className="mb-3 block text-sm font-semibold">Quantity ({p.unit})</label>
                <div className="inline-flex items-center rounded-xl border border-border">
                  <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(p.minQty, q - 1))} className="grid h-12 w-12 place-items-center hover:text-primary"><Minus className="h-4 w-4" /></button>
                  <input id="qty" type="number" min={p.minQty} inputMode="numeric" value={Number.isNaN(qty) ? "" : qty} onChange={(e) => setQty(parseInt(e.target.value, 10))}
                    aria-invalid={qtyInvalid} className="h-12 w-20 border-x border-border bg-transparent text-center font-semibold outline-none" />
                  <button type="button" aria-label="Increase" onClick={() => setQty((q) => (Number.isNaN(q) ? p.minQty : q + 1))} className="grid h-12 w-12 place-items-center hover:text-primary"><Plus className="h-4 w-4" /></button>
                </div>
                {qtyInvalid && <p className="mt-1.5 text-xs font-medium text-destructive">Enter a whole number of at least {p.minQty}.</p>}
              </div>

              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">Notes <span className="font-normal text-muted-foreground">(optional)</span></label>
                <input id="notes" value={notes} maxLength={300} onChange={(e) => setNotes(e.target.value)} placeholder="Size, weight, timing…" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={addToBasket} disabled={qtyInvalid}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-50">
                  <ShoppingBasket className="h-4 w-4" /> Add to enquiry basket
                </button>
                <WhatsAppButton variant="outline" className="py-4" message={`Hello Urbanite Farm Ventures, I'd like a quote for ${qty || ""} ${p.unit} of ${p.name} (${option.label}).`}>Ask on WhatsApp</WhatsAppButton>
              </div>
              <p className="flex items-start gap-2 text-xs text-muted-foreground"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />Adding to your basket doesn't place an order. You'll send a quotation request, and the farm confirms price and availability.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-semibold">Other products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((x) => x.slug !== p.slug).map((x) => <ProductCard key={x.slug} p={x} />)}
          </div>
        </div>
      </section>
    </>
  );
}
