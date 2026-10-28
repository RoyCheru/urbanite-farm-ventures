import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Egg, Truck, ShieldCheck, Leaf, Search, MessageCircle, CheckCircle2, Store, Hotel, UtensilsCrossed, Users, ArrowRight, Clock } from "lucide-react";
import hero from "@/assets/hero.jpg";
import eggs from "@/assets/eggs.jpg";
import broilers from "@/assets/broilers.jpg";
import pigs from "@/assets/pigs.jpg";
import produce from "@/assets/produce.jpg";
import farmer from "@/assets/farmer.jpg";
import { NAV, PHONE_DISPLAY, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site";
import { LinkButton, Logo, SectionHeading, SocialLinks, WhatsAppButton, WhatsAppIcon } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Urbanite Farm Ventures | Quality Farm Products in Solai, Nakuru" },
      { name: "description", content: "Fresh farm eggs, broiler chickens, pigs and farm produce direct from Urbanite Farm Ventures in Solai, Nakuru, Kenya. Retail and bulk orders via WhatsApp." },
      { property: "og:title", content: "Urbanite Farm Ventures | Quality Farm Products" },
      { property: "og:description", content: "Eggs, broilers, pigs and farm produce direct from Solai, Nakuru. Enquire on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PRODUCTS = [
  { name: "Farm Eggs", img: eggs, desc: "Fresh, clean eggs from healthy layers — available by the tray or in bulk crates.", msg: "Hello Urbanite Farm Ventures, I'd like to enquire about Farm Eggs (price per tray and availability)." },
  { name: "Broiler Chickens", img: broilers, desc: "Well-fed, market-ready broilers raised to high standards. Live or dressed on request.", msg: "Hello Urbanite Farm Ventures, I'd like to enquire about Broiler Chickens (live/dressed, price and availability)." },
  { name: "Pigs & Live Pigs", img: pigs, desc: "Healthy weaners, growers and market-weight pigs from a well-managed piggery.", msg: "Hello Urbanite Farm Ventures, I'd like to enquire about Pigs / Live Pigs (sizes, price and availability)." },
  { name: "Other Farm Products", img: produce, desc: "Seasonal produce and more from the farm. Ask us what's fresh this week.", msg: "Hello Urbanite Farm Ventures, I'd like to know which other farm products are currently available." },
];

const POSTS = [
  { img: eggs, tag: "Poultry", date: "Oct 2026", title: "How to tell if your eggs are truly farm fresh", excerpt: "Simple checks for shell quality, yolk colour and freshness you can do at home." },
  { img: pigs, tag: "Piggery", date: "Sep 2026", title: "Choosing healthy weaners: a buyer's guide", excerpt: "What to look for when buying piglets to start or grow your own pig unit." },
  { img: broilers, tag: "Business", date: "Aug 2026", title: "Why hotels are sourcing chicken direct from farms", excerpt: "Consistent supply, better freshness and fair pricing for hospitality buyers." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <Bulk />
        <About />
        <HowToOrder />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-transform hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "bg-background/95 shadow-sm backdrop-blur" : "bg-transparent")}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between">
        <div className="min-w-0"><Logo light={!(scrolled || open)} /></div>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={cn("text-sm font-semibold transition-colors hover:text-accent", scrolled ? "text-foreground" : "text-deep-foreground")}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppButton className="hidden px-5 py-2.5 sm:inline-flex">WhatsApp Us</WhatsAppButton>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}
            className={cn("grid h-10 w-10 place-items-center rounded-full lg:hidden", scrolled || open ? "text-foreground" : "text-deep-foreground")}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-semibold text-foreground hover:text-primary">{n.label}</a>
          ))}
          <WhatsAppButton className="mt-5 w-full">Enquire on WhatsApp</WhatsAppButton>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img src={hero} alt="Urbanite Farm Ventures poultry barn and free-range chickens in Solai at sunset" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-deep-foreground/30 bg-deep/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-deep-foreground backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-accent" /> Solai, Nakuru · Kenya
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-deep-foreground sm:text-6xl md:text-7xl">
            Quality Farm Products. <span className="italic text-accent">Direct from Urbanite Farm Ventures.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-deep-foreground/85">
            Fresh eggs, broiler chickens, pigs and farm produce — raised with care in the Rift Valley and supplied to homes and businesses across Kenya.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#products" variant="accent" className="px-8 py-4">Explore Our Products <ArrowRight className="h-4 w-4" /></LinkButton>
            <WhatsAppButton className="px-8 py-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { Icon: Leaf, t: "Responsibly Raised", d: "Healthy animals, clean housing" },
    { Icon: ShieldCheck, t: "Consistent Quality", d: "Checked before every sale" },
    { Icon: Truck, t: "Bulk Supply", d: "Reliable for businesses" },
    { Icon: MessageCircle, t: "Quick Response", d: "Direct line on WhatsApp" },
  ];
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 lg:grid-cols-4">
        {items.map(({ Icon, t, d }) => (
          <div key={t} className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-foreground/10"><Icon className="h-5 w-5 text-accent" /></span>
            <div className="min-w-0"><p className="font-semibold">{t}</p><p className="text-xs text-primary-foreground/75">{d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Our Products" title="Fresh from our farm to you" text="Every product is raised and handled on our farm in Solai. Tap any product to enquire about current prices and availability." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="aspect-[5/4] overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={912} height={736} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <WhatsAppButton message={p.msg} variant="outline" className="mt-5 w-full">Enquire Now</WhatsAppButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bulk() {
  const buyers = [
    { Icon: Store, t: "Retailers & Shops" },
    { Icon: Users, t: "Resellers & Traders" },
    { Icon: Hotel, t: "Hotels & Lodges" },
    { Icon: UtensilsCrossed, t: "Restaurants & Caterers" },
  ];
  return (
    <section id="bulk" className="relative overflow-hidden bg-deep py-20 text-deep-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionHeading light center={false} eyebrow="Bulk Orders" title="A dependable farm partner for your business" text="We supply eggs, broilers and pigs in volume to businesses that need consistent quality and reliable delivery schedules. Talk to us about regular orders and wholesale pricing." />
          <ul className="mt-8 space-y-3">
            {["Competitive wholesale pricing", "Scheduled weekly or monthly supply", "Flexible order sizes for growing businesses"].map((x) => (
              <li key={x} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />{x}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message="Hello Urbanite Farm Ventures, I represent a business and would like to discuss a bulk order." variant="accent" className="px-8 py-4">Request Bulk Quote</WhatsAppButton>
            <LinkButton href={`tel:+${WHATSAPP_NUMBER}`} variant="ghostLight" className="px-8 py-4"><Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}</LinkButton>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {buyers.map(({ Icon, t }) => (
            <div key={t} className="rounded-2xl border border-deep-foreground/15 bg-deep-foreground/5 p-6 transition-colors hover:bg-deep-foreground/10">
              <Icon className="h-8 w-8 text-accent" />
              <p className="mt-4 font-display text-lg font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <div className="relative">
          <img src={farmer} alt="Farmer at Urbanite Farm Ventures holding a tray of fresh eggs" loading="lazy" width={912} height={1104} className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card" />
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-accent px-6 py-4 text-accent-foreground shadow-card sm:left-auto sm:-right-6">
            <p className="font-display text-3xl font-bold">Solai</p>
            <p className="text-xs font-semibold uppercase tracking-widest">Nakuru County</p>
          </div>
        </div>
        <div>
          <SectionHeading center={false} eyebrow="About Us" title="Rooted in Solai, growing with Kenya" />
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Urbanite Farm Ventures is a modern agribusiness based in Solai, Nakuru — in the fertile heart of Kenya's Rift Valley. We specialise in poultry and pig farming, producing fresh eggs, broiler chickens and quality pigs for households, traders and businesses.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our focus is simple: healthy animals, good farming practice and honest dealings. We combine hands-on care with modern methods so every customer receives produce they can trust.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {[["Poultry", "Layers & broilers"], ["Piggery", "Weaners to market"], ["Produce", "Seasonal crops"]].map(([a, b]) => (
              <div key={a}><p className="font-display text-xl font-semibold text-primary">{a}</p><p className="text-xs text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const steps = [
    { Icon: Search, t: "Browse Products", d: "Explore our eggs, broilers, pigs and other farm products." },
    { Icon: MessageCircle, t: "Enquire via WhatsApp", d: "Tap any enquiry button — your message is ready to send." },
    { Icon: CheckCircle2, t: "Confirm & Order", d: "We confirm availability, pricing and pickup or delivery directly." },
  ];
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="How to Order" title="Ordering is as easy as 1, 2, 3" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map(({ Icon, t, d }, i) => (
            <div key={t} className="relative rounded-2xl bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="absolute right-6 top-4 font-display text-6xl font-bold text-primary/10">0{i + 1}</span>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-6 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><WhatsAppButton className="px-8 py-4">Start Your Order</WhatsAppButton></div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="From the Farm" title="Farm news & tips" text="Insights on poultry, pig farming and sourcing quality produce." />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="aspect-[16/10] overflow-hidden"><img src={p.img} alt="" loading="lazy" width={912} height={736} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-secondary-foreground">{p.tag}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.date}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Contact Us</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Ready to order fresh farm products?</h2>
            <p className="mt-4 text-primary-foreground/80">Send us a message on WhatsApp and we'll respond with availability and pricing.</p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">Location</p><p className="text-primary-foreground/80">Solai, Nakuru, Kenya</p></div></li>
              <li className="flex items-start gap-4"><WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">WhatsApp / Call</p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent">{PHONE_DISPLAY}</a></div></li>
              <li className="flex items-start gap-4"><Egg className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">Orders</p><p className="text-primary-foreground/80">Retail & bulk enquiries welcome</p></div></li>
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton variant="accent" className="px-8 py-4">Send an Enquiry</WhatsAppButton>
              <SocialLinks />
            </div>
          </div>
          <iframe title="Map of Solai, Nakuru" src="https://www.google.com/maps?q=Solai,Nakuru,Kenya&output=embed" loading="lazy" className="min-h-[320px] w-full border-0" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-deep-foreground/70">Quality eggs, poultry, pigs and farm produce direct from Solai, Nakuru.</p>
          <SocialLinks className="mt-6" />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">{NAV.map((n) => <li key={n.href}><a href={n.href} className="text-deep-foreground/70 hover:text-accent">{n.label}</a></li>)}</ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Products</h4>
          <ul className="mt-4 space-y-2 text-sm">{PRODUCTS.map((p) => <li key={p.name}><a href="#products" className="text-deep-foreground/70 hover:text-accent">{p.name}</a></li>)}</ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-deep-foreground/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" />Solai, Nakuru, Kenya</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /><a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-accent">{PHONE_DISPLAY}</a></li>
            <li className="flex gap-2"><WhatsAppIcon className="h-4 w-4 shrink-0 text-accent" /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Chat on WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10 py-6 text-center text-xs text-deep-foreground/60">© {new Date().getFullYear()} Urbanite Farm Ventures. All rights reserved.</div>
    </footer>
  );
}
