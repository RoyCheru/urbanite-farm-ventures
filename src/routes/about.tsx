import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake, Leaf, MapPin, ShieldCheck, X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import eggs from "@/assets/eggs.jpg";
import broilers from "@/assets/broilers.jpg";
import pigs from "@/assets/pigs.jpg";
import produce from "@/assets/produce.jpg";
import farmer from "@/assets/farmer.jpg";
import { PageHeader } from "@/components/site/layout";
import { SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Farm Gallery | Urbanite Farm Ventures" },
      { name: "description", content: "Meet Urbanite Farm Ventures, a poultry and pig farm in Solai, Nakuru County. Learn how we farm and see photos from the farm." },
      { property: "og:title", content: "About Urbanite Farm Ventures" },
      { property: "og:description", content: "A poultry and pig farm in Solai, Nakuru — our story, values and farm gallery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const GALLERY = [
  { src: hero, alt: "Poultry housing on the farm at sunset" },
  { src: eggs, alt: "Fresh eggs collected on the farm" },
  { src: broilers, alt: "Broiler chickens in their house" },
  { src: pigs, alt: "Pigs in the piggery" },
  { src: produce, alt: "Seasonal farm produce" },
  { src: farmer, alt: "A farmer holding a tray of eggs" },
];

function AboutPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHeader eyebrow="About Us" title="Rooted in Solai, growing with Kenya" crumbs={[{ label: "About Us" }]} />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
          <img src={farmer} alt="Farmer at Urbanite Farm Ventures holding a tray of eggs" width={912} height={1104} className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card" />
          <div>
            <SectionHeading center={false} eyebrow="Our story" title="A working farm in the Rift Valley" />
            <p className="mt-6 leading-relaxed text-muted-foreground">Urbanite Farm Ventures is an agribusiness based in Solai, Nakuru County. We focus on poultry and pig farming, producing eggs, broiler chickens and pigs for households, traders and businesses, alongside seasonal produce.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">We deal directly with our customers, so you speak with the people who raise what you buy. Every request is answered with honest information on what is available, when, and at what price.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[[Leaf, "Good husbandry", "Care for animals and clean housing"], [ShieldCheck, "Honest dealing", "Clear quotes before any order"], [HeartHandshake, "Direct service", "Talk to the farm, not a middleman"]].map(([I, t, d]) => {
                const Icon = I as typeof Leaf;
                return (
                  <div key={t as string} className="rounded-2xl border border-border bg-card p-5">
                    <Icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 font-semibold">{t as string}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{d as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Gallery" title="Around the farm" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((g, i) => (
              <button key={g.alt} onClick={() => setOpen(i)} className="group relative aspect-square overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/80 to-transparent p-3 text-left text-xs font-semibold text-deep-foreground opacity-0 transition group-hover:opacity-100">{g.alt}</span>
              </button>
            ))}
          </div>
        </div>
        {open !== null && (
          <div role="dialog" aria-modal="true" aria-label={GALLERY[open].alt} onClick={() => setOpen(null)} className="fixed inset-0 z-[60] grid place-items-center bg-deep/90 p-5">
            <button aria-label="Close" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-deep-foreground/10 text-deep-foreground"><X /></button>
            <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl">
              <img src={GALLERY[open].src} alt={GALLERY[open].alt} className="max-h-[80vh] w-full rounded-2xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-deep-foreground/80">{GALLERY[open].alt}</figcaption>
            </figure>
          </div>
        )}
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">Find us in Solai, Nakuru County</h2>
              <p className="mt-1 text-sm text-muted-foreground">North of Nakuru Town in the Rift Valley. Visits and pickups by arrangement.</p>
            </div>
          </div>
          <Link to="/contact" className="rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90">Contact & directions</Link>
        </div>
      </section>
    </>
  );
}
