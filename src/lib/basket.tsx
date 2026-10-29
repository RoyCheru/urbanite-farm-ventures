import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type BasketItem = { slug: string; optionId: string; quantity: number; notes?: string };

type BasketCtx = {
  items: BasketItem[];
  ready: boolean;
  count: number;
  add: (item: BasketItem) => void;
  update: (slug: string, optionId: string, patch: Partial<BasketItem>) => void;
  remove: (slug: string, optionId: string) => void;
  clear: () => void;
};

const KEY = "ufv-basket-v1";
const Ctx = createContext<BasketCtx | null>(null);

export function mergeItem(items: BasketItem[], item: BasketItem): BasketItem[] {
  const i = items.findIndex((x) => x.slug === item.slug && x.optionId === item.optionId);
  if (i === -1) return [...items, item];
  const next = [...items];
  next[i] = { ...next[i], quantity: next[i].quantity + item.quantity, notes: item.notes || next[i].notes };
  return next;
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((item: BasketItem) => setItems((s) => mergeItem(s, item)), []);
  const update = useCallback(
    (slug: string, optionId: string, patch: Partial<BasketItem>) =>
      setItems((s) => s.map((x) => (x.slug === slug && x.optionId === optionId ? { ...x, ...patch } : x))),
    [],
  );
  const remove = useCallback((slug: string, optionId: string) => setItems((s) => s.filter((x) => !(x.slug === slug && x.optionId === optionId))), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, ready, count: items.reduce((n, x) => n + x.quantity, 0), add, update, remove, clear }),
    [items, ready, add, update, remove, clear],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBasket() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useBasket must be used inside BasketProvider");
  return c;
}
