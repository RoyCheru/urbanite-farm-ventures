import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import { PRODUCTS, getProduct } from "@/lib/catalog";
import { BUYER_TYPES, enquirySchema, enquiryToText, fieldErrors, submitEnquiry, type Enquiry } from "@/lib/enquiry";
import type { BasketItem } from "@/lib/basket";
import { whatsappLink } from "@/lib/site";
import { WhatsAppButton } from "./ui";
import { cn } from "@/lib/utils";

const inputCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

function Field({ label, name, error, optional, children }: { label: string; name: string; error?: string | undefined; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">{label}{optional && <span className="font-normal text-muted-foreground"> (optional)</span>}</label>
      {children}
      {error && <p id={`${name}-err`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive"><AlertCircle className="h-3.5 w-3.5" />{error}</p>}
    </div>
  );
}

type Row = { slug: string; optionId: string; quantity: string; notes: string };
const emptyRow = (): Row => ({ slug: "", optionId: "", quantity: "1", notes: "" });

/**
 * Consolidated quotation request. `basketItems` = items come from the basket
 * (read-only here); otherwise the buyer adds product rows in the form.
 */
export function EnquiryForm({ basketItems, onSubmitted, defaultBuyer = "individual" }: { basketItems?: BasketItem[]; onSubmitted?: () => void; defaultBuyer?: string }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", buyerType: defaultBuyer, businessName: "", location: "", frequency: "once", message: "" });
  const [rows, setRows] = useState<Row[]>([emptyRow()]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const err = (k: string): string | undefined => errors[k];
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [done, setDone] = useState<{ ref: string; data: Enquiry } | null>(null);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }));
  const setRow = (i: number, patch: Partial<Row>) => setRows((r) => r.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const items = basketItems ?? rows.map((r) => ({ ...r, notes: r.notes || undefined }));
    const parsed = enquirySchema.safeParse({ ...f, items });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const { reference } = await submitEnquiry(parsed.data);
      setDone({ ref: reference, data: parsed.data });
      onSubmitted?.();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-12" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground"><CheckCircle2 className="h-8 w-8" /></span>
        <h2 className="mt-6 text-3xl font-semibold">Quotation request received</h2>
        <p className="mt-2 text-sm text-muted-foreground">Reference <span className="font-bold text-foreground">{done.ref}</span></p>
        <div className="mx-auto mt-6 max-w-lg rounded-2xl bg-secondary p-5 text-left text-sm text-secondary-foreground">
          <p className="font-semibold">This is a quote request, not a confirmed order.</p>
          <p className="mt-1">Prices, availability and delivery are confirmed by the farm before anything is final. Nothing is charged at this stage.</p>
        </div>
        <ul className="mx-auto mt-6 max-w-lg divide-y divide-border text-left text-sm">
          {done.data.items.map((it) => {
            const p = getProduct(it.slug);
            return <li key={it.slug + it.optionId} className="flex justify-between gap-3 py-2"><span>{p?.name} · {p?.options.find((o) => o.id === it.optionId)?.label}</span><span className="font-semibold">{it.quantity} {p?.unit}</span></li>;
          })}
        </ul>
        <p className="mx-auto mt-6 max-w-lg text-sm text-muted-foreground">For the fastest reply, send these details to the farm on WhatsApp too.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton message={enquiryToText(done.data, done.ref)} className="px-8 py-4">Send to farm on WhatsApp</WhatsAppButton>
          <Link to="/products" className="inline-flex items-center justify-center rounded-full border border-primary px-8 py-4 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">Back to products</Link>
        </div>
      </div>
    );
  }

  const isBusiness = f.buyerType !== "individual";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> Please fix the highlighted fields and try again.
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" /> We couldn't send your request. Please try again, or
          <a className="font-semibold underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.
        </div>
      )}

      <fieldset className="space-y-5">
        <legend className="font-display text-xl font-semibold">1. About you</legend>
        <Field label="I am buying as" name="buyerType" error={err("buyerType")}>
          <select id="buyerType" value={f.buyerType} onChange={set("buyerType")} className={inputCls} aria-invalid={!!err("buyerType")}>
            {BUYER_TYPES.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="name" error={err("name")}>
            <input id="name" autoComplete="name" value={f.name} onChange={set("name")} maxLength={100} className={inputCls} aria-invalid={!!err("name")} />
          </Field>
          {isBusiness && (
            <Field label="Business name" name="businessName" error={err("businessName")}>
              <input id="businessName" autoComplete="organization" value={f.businessName} onChange={set("businessName")} maxLength={120} className={inputCls} aria-invalid={!!err("businessName")} />
            </Field>
          )}
          <Field label="Phone / WhatsApp" name="phone" error={err("phone")}>
            <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0712 345 678" value={f.phone} onChange={set("phone")} maxLength={16} className={inputCls} aria-invalid={!!err("phone")} />
          </Field>
          <Field label="Email" name="email" optional error={err("email")}>
            <input id="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} maxLength={255} className={inputCls} aria-invalid={!!err("email")} />
          </Field>
          <Field label="Town / delivery area" name="location" error={err("location")}>
            <input id="location" placeholder="e.g. Nakuru Town" value={f.location} onChange={set("location")} maxLength={120} className={inputCls} aria-invalid={!!err("location")} />
          </Field>
          <Field label="How often do you need supply?" name="frequency">
            <select id="frequency" value={f.frequency} onChange={set("frequency")} className={inputCls}>
              <option value="once">One-off order</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold">2. Products & quantities</legend>
        {basketItems ? (
          <p className="text-sm text-muted-foreground">Your {basketItems.length} basket item{basketItems.length === 1 ? "" : "s"} will be included in this request.</p>
        ) : (
          <>
            {err("items") && <p className="text-xs font-medium text-destructive">{err("items")}</p>}
            {rows.map((r, i) => {
              const p = getProduct(r.slug);
              return (
                <div key={i} className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[1.4fr_1fr_0.7fr_auto] sm:items-end">
                  <Field label="Product" name={`items.${i}.slug`} error={err(`items.${i}.slug`)}>
                    <select id={`items.${i}.slug`} value={r.slug} onChange={(e) => { const np = getProduct(e.target.value); setRow(i, { slug: e.target.value, optionId: np?.options[0]?.id ?? "" }); }} className={inputCls} aria-invalid={!!err(`items.${i}.slug`)}>
                      <option value="">Select…</option>
                      {PRODUCTS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
                    </select>
                  </Field>
                  <Field label={p?.optionLabel ?? "Option"} name={`items.${i}.optionId`} error={err(`items.${i}.optionId`)}>
                    <select id={`items.${i}.optionId`} value={r.optionId} disabled={!p} onChange={(e) => setRow(i, { optionId: e.target.value })} className={cn(inputCls, "disabled:opacity-50")} aria-invalid={!!err(`items.${i}.optionId`)}>
                      {!p && <option value="">—</option>}
                      {p?.options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                    </select>
                  </Field>
                  <Field label={`Qty${p ? ` (${p.unit})` : ""}`} name={`items.${i}.quantity`} error={err(`items.${i}.quantity`)}>
                    <input id={`items.${i}.quantity`} type="number" min={1} inputMode="numeric" value={r.quantity} onChange={(e) => setRow(i, { quantity: e.target.value })} className={inputCls} aria-invalid={!!err(`items.${i}.quantity`)} />
                  </Field>
                  <button type="button" onClick={() => setRows((s) => s.filter((_, j) => j !== i))} disabled={rows.length === 1} aria-label="Remove product"
                    className="grid h-12 w-12 place-items-center rounded-xl border border-border text-muted-foreground transition hover:border-destructive hover:text-destructive disabled:opacity-40">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={() => setRows((s) => [...s, emptyRow()])} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <Plus className="h-4 w-4" /> Add another product
            </button>
          </>
        )}
        <Field label="Additional details" name="message" optional error={err("message")}>
          <textarea id="message" rows={4} value={f.message} onChange={set("message")} maxLength={1000} placeholder="Preferred delivery dates, pickup or delivery, sizes, etc." className={inputCls} aria-invalid={!!err("message")} />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">This sends a quotation request. The farm confirms prices and availability before any order is final.</p>
        <button type="submit" disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:translate-y-0 disabled:opacity-70">
          {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Submit quotation request"}
        </button>
      </div>
    </form>
  );
}
