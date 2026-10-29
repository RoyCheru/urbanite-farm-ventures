import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { priceLabel, type Product } from "@/lib/catalog";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="relative block aspect-[5/4] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={912} height={736} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">{p.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold"><Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.name}</Link></h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
        <p className="mt-4 text-sm font-bold text-primary">{priceLabel(p)}</p>
        <Link to="/products/$slug" params={{ slug: p.slug }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
          View options <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
