import type { ReactNode, AnchorHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { whatsappLink, FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/site";

type BtnVariant = "primary" | "accent" | "whatsapp" | "outline" | "ghostLight";
const variants: Record<BtnVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  accent: "bg-accent text-accent-foreground hover:brightness-105",
  whatsapp: "bg-whatsapp text-whatsapp-foreground hover:brightness-110",
  outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  ghostLight: "border border-deep-foreground/40 text-deep-foreground hover:bg-deep-foreground/10",
};

export function LinkButton({
  variant = "primary",
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: BtnVariant }) {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

export function WhatsAppButton({ message, children = "Enquire on WhatsApp", className, variant = "whatsapp" }: { message?: string; children?: ReactNode; className?: string; variant?: BtnVariant }) {
  return (
    <LinkButton href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" variant={variant} className={className}>
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </LinkButton>
  );
}

export function SectionHeading({ eyebrow, title, text, light, center = true }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className={cn("text-xs font-bold uppercase tracking-[0.25em]", light ? "text-accent" : "text-primary")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl", light ? "text-deep-foreground" : "text-foreground")}>{title}</h2>
      <div className={cn("mt-5 h-1 w-14 rounded-full bg-accent", center && "mx-auto")} />
      {text && <p className={cn("mt-5 text-base leading-relaxed", light ? "text-deep-foreground/80" : "text-muted-foreground")}>{text}</p>}
    </div>
  );
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Urbanite Farm Ventures home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
      </span>
      <span className="min-w-0 leading-none">
        <span className={cn("block truncate font-display text-lg font-semibold", light ? "text-deep-foreground" : "text-foreground")}>Urbanite</span>
        <span className={cn("block truncate text-[10px] font-bold uppercase tracking-[0.2em]", light ? "text-accent" : "text-primary")}>Farm Ventures</span>
      </span>
    </Link>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.42-9.45 9.42m8.02-17.45A11.27 11.27 0 0 0 12.05.73C5.8.73.7 5.82.7 12.08c0 2 .52 3.95 1.52 5.67L.6 23.65l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03"/>
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/></svg>;
}
export function InstagramIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;
}

export function SocialLinks({ className }: { className?: string }) {
  const items = [
    { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
    { href: FACEBOOK_URL, label: "Facebook", Icon: FacebookIcon },
    { href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
  ];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-full border border-current/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:border-accent">
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
