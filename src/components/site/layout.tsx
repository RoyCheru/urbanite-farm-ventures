import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, MapPin, Phone, ShoppingBasket, ChevronRight } from "lucide-react";
import { NAV, PHONE_DISPLAY, WHATSAPP_NUMBER, LOCATION, whatsappLink } from "@/lib/site";
import { PRODUCTS } from "@/lib/catalog";
import { useBasket } from "@/lib/basket";
import { Logo, SocialLinks, WhatsAppIcon } from "./ui";
import { cn } from "@/lib/utils";

function BasketLink({ dark }: { dark: boolean }) {
  const { count, ready } = useBasket();
  return (
    <Link to="/basket" aria-label={`Enquiry basket, ${count} items`}
      className={cn("relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground", dark ? "text-deep-foreground" : "text-foreground")}>
      <ShoppingBasket className="h-5 w-5" />
      {ready && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{count > 99 ? "99+" : count}</span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  const transparent = pathname === "/" && !scrolled && !open;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", transparent ? "bg-transparent" : "bg-background/95 shadow-sm backdrop-blur")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <div className="min-w-0"><Logo light={transparent} /></div>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className={cn("text-sm font-semibold transition-colors hover:text-accent data-[status=active]:text-accent", transparent ? "text-deep-foreground" : "text-foreground")}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <Link to="/bulk-orders" className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex">Request a Quote</Link>
          <BasketLink dark={transparent} />
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}
            className={cn("grid h-10 w-10 place-items-center rounded-full lg:hidden", transparent ? "text-deep-foreground" : "text-foreground")}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {[...NAV, { to: "/basket" as const, label: "Enquiry Basket" }].map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="block border-b border-border py-3 font-semibold text-foreground hover:text-primary data-[status=active]:text-primary">{n.label}</Link>
          ))}
          <Link to="/bulk-orders" className="mt-5 flex w-full justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">Request a Quote</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-deep-foreground/70">Eggs, poultry, pigs and farm produce direct from Solai, Nakuru.</p>
          <SocialLinks className="mt-6" />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-deep-foreground/70 hover:text-accent">{n.label}</Link></li>)}
            <li><Link to="/basket" className="text-deep-foreground/70 hover:text-accent">Enquiry Basket</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Products</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {PRODUCTS.map((p) => <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className="text-deep-foreground/70 hover:text-accent">{p.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-deep-foreground/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" />{LOCATION}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /><a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-accent">{PHONE_DISPLAY}</a></li>
            <li className="flex gap-2"><WhatsAppIcon className="h-4 w-4 shrink-0 text-accent" /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Chat on WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10 py-6 text-center text-xs text-deep-foreground/60">© {new Date().getFullYear()} Urbanite Farm Ventures. All rights reserved.</div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-transform hover:scale-110">
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function PageHeader({ eyebrow, title, text, crumbs }: { eyebrow: string; title: ReactNode; text?: string; crumbs?: { label: string; to?: string }[] }) {
  return (
    <section className="bg-deep pb-14 pt-28 text-deep-foreground md:pb-20 md:pt-36">
      <div className="mx-auto max-w-7xl px-5">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-deep-foreground/70">
            <Link to="/" className="hover:text-accent">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1"><ChevronRight className="h-3 w-3" />
                {c.to ? <a href={c.to} className="hover:text-accent">{c.label}</a> : <span className="text-deep-foreground">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-5 h-1 w-14 rounded-full bg-accent" />
        {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-foreground/80">{text}</p>}
      </div>
    </section>
  );
}
