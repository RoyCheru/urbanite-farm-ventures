import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Hotel, Store, Users, UtensilsCrossed } from "lucide-react";
import { PageHeader } from "@/components/site/layout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/site";

export const Route = createFileRoute("/bulk-orders")({
  head: () => ({
    meta: [
      { title: "Bulk Orders & Quotations | Urbanite Farm Ventures" },
      { name: "description", content: "Request a quotation for bulk eggs, broilers, pigs and farm produce from Urbanite Farm Ventures, Solai, Nakuru. For households, retailers, hotels and resellers." },
      { property: "og:title", content: "Bulk Orders & Quotations | Urbanite Farm Ventures" },
      { property: "og:description", content: "One form to request quotes for eggs, broilers, pigs and produce — individuals and businesses welcome." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BulkPage,
});

function BulkPage() {
  return (
    <>
      <PageHeader eyebrow="Bulk Orders" title="Request a quotation" crumbs={[{ label: "Bulk Orders" }]}
        text="For households, shops, hotels, restaurants, institutions and resellers. List the products and quantities you need and we'll reply with availability and pricing." />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.6fr_1fr]">
          <EnquiryForm />
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-deep p-8 text-deep-foreground">
              <h2 className="text-2xl font-semibold">What happens next</h2>
              <ol className="mt-5 space-y-4 text-sm">
                {["We review your request and check availability.", "We contact you with a quotation by your phone or WhatsApp.", "Once you accept, we agree on pickup or delivery and the order is confirmed."].map((s, i) => (
                  <li key={s} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{i + 1}</span><span className="text-deep-foreground/85">{s}</span></li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold">Who we supply</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {[[Store, "Shops"], [Hotel, "Hotels & lodges"], [UtensilsCrossed, "Restaurants"], [Users, "Resellers"]].map(([I, t]) => {
                  const Icon = I as typeof Store;
                  return <li key={t as string} className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" />{t as string}</li>;
                })}
              </ul>
              <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />Quotes are free and without obligation</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />One-off or regular supply</li>
              </ul>
              <p className="mt-6 text-sm">Prefer to talk? Call <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-semibold text-primary hover:underline">{PHONE_DISPLAY}</a></p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
