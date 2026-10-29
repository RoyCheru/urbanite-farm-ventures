import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/layout";
import { SectionHeading, SocialLinks, WhatsAppButton, WhatsAppIcon } from "@/components/site/ui";
import { LOCATION, PHONE_DISPLAY, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQs | Urbanite Farm Ventures, Solai" },
      { name: "description", content: "Contact Urbanite Farm Ventures in Solai, Nakuru by phone or WhatsApp on 0727 459 772. Find directions and answers to common questions." },
      { property: "og:title", content: "Contact Urbanite Farm Ventures" },
      { property: "og:description", content: "Phone, WhatsApp, location in Solai, Nakuru and frequently asked questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  { q: "How do I place an order?", a: "Add products to your enquiry basket (or use the bulk enquiry form) and submit a quotation request. We reply with availability and pricing. Your order is only confirmed once you accept the quote." },
  { q: "Why are there no prices on the website?", a: "Prices depend on quantity, season and current stock, so we quote each request individually to give you an accurate figure." },
  { q: "Do you deliver?", a: "Pickup and delivery options depend on your location and order size. Tell us your town in the enquiry and we'll confirm what's possible." },
  { q: "Can I buy small quantities?", a: "Yes. Households and individual buyers are welcome — you don't need to be a business to request a quote." },
  { q: "Can I get a regular weekly or monthly supply?", a: "Yes, you can request regular supply in the enquiry form. We'll discuss quantities and schedules with you." },
  { q: "Can I visit the farm?", a: "Visits and pickups are by arrangement. Please contact us first so we can agree on a time." },
];

function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch with the farm" crumbs={[{ label: "Contact & FAQs" }]}
        text="Call or WhatsApp us, or send a quotation request online." />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {[
              { Icon: Phone, t: "Phone", body: <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-primary">{PHONE_DISPLAY}</a> },
              { Icon: WhatsAppIcon, t: "WhatsApp", body: <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Chat on {PHONE_DISPLAY}</a> },
              { Icon: MapPin, t: "Location", body: <span>{LOCATION}<br /><span className="text-xs">Visits and pickups by arrangement</span></span> },
              { Icon: Clock, t: "Response", body: <span>We reply to enquiries by phone or WhatsApp</span> },
            ].map(({ Icon, t, body }) => (
              <div key={t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></span>
                <div><p className="font-semibold">{t}</p><div className="text-sm text-muted-foreground">{body}</div></div>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <WhatsAppButton className="px-6">WhatsApp us</WhatsAppButton>
              <Link to="/bulk-orders" className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">Request a quote</Link>
              <SocialLinks className="text-primary" />
            </div>
          </div>
          <iframe title="Map of Solai, Nakuru" src="https://www.google.com/maps?q=Solai,Nakuru,Kenya&output=embed" loading="lazy" className="min-h-[380px] w-full rounded-3xl border-0 shadow-card" />
        </div>
      </section>
      <section className="bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-card px-6">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
