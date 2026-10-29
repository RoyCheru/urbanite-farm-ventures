import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Egg, Truck, ShieldCheck, Leaf, Search, MessageCircle, CheckCircle2, Store, Hotel, UtensilsCrossed, Users, ArrowRight, ShoppingBasket } from "lucide-react";
import hero from "@/assets/hero.jpg";
import farmer from "@/assets/farmer.jpg";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { LinkButton, SectionHeading, SocialLinks, WhatsAppButton, WhatsAppIcon } from "@/components/site/ui";

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

function Index() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Products />
      <Bulk />
      <About />
      <HowToOrder />
      <Contact />
    </>
  );
}

const btn = "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5";

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
            <Link to="/products" className={`${btn} bg-accent px-8 py-4 text-accent-foreground hover:brightness-105`}>Explore Our Products <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/bulk-orders" className={`${btn} border border-deep-foreground/40 px-8 py-4 text-deep-foreground hover:bg-deep-foreground/10`}>Request a Bulk Quote</Link>
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
        <SectionHeading eyebrow="Our Products" title="Fresh from our farm to you" text="Every product is raised and handled on our farm in Solai. Choose a product to see options, add it to your enquiry basket and request a quote." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} />)}
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
            {["Quotes tailored to your volumes", "One-off, weekly or monthly supply requests", "One form for all the products you need"].map((x) => (
              <li key={x} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />{x}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/bulk-orders" className={`${btn} bg-accent px-8 py-4 text-accent-foreground hover:brightness-105`}>Request Bulk Quote <ArrowRight className="h-4 w-4" /></Link>
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
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">More about the farm & photo gallery <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const steps = [
    { Icon: Search, t: "Browse & choose", d: "Pick products, options and quantities from our catalogue." },
    { Icon: ShoppingBasket, t: "Send one request", d: "Review your basket and submit a single quotation request." },
    { Icon: CheckCircle2, t: "We confirm", d: "The farm confirms price, availability and pickup or delivery before your order is final." },
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
        <div className="mt-12 text-center"><Link to="/products" className={`${btn} bg-primary px-8 py-4 text-primary-foreground hover:bg-primary/90`}>Start browsing</Link></div>
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
            <p className="mt-4 text-primary-foreground/80">Send a quotation request or message us on WhatsApp — we'll respond with availability and pricing.</p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">Location</p><p className="text-primary-foreground/80">Solai, Nakuru, Kenya</p></div></li>
              <li className="flex items-start gap-4"><WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">WhatsApp / Call</p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent">{PHONE_DISPLAY}</a></div></li>
              <li className="flex items-start gap-4"><Egg className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">Orders</p><p className="text-primary-foreground/80">Retail & bulk enquiries welcome</p></div></li>
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/contact" className={`${btn} bg-accent px-8 py-4 text-accent-foreground hover:brightness-105`}>Contact & FAQs</Link>
              <SocialLinks />
            </div>
          </div>
          <iframe title="Map of Solai, Nakuru" src="https://www.google.com/maps?q=Solai,Nakuru,Kenya&output=embed" loading="lazy" className="min-h-[320px] w-full border-0" />
        </div>
      </div>
    </section>
  );
}
