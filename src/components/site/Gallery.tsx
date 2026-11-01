import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryImage = { src: string; alt: string };

/**
 * Responsive photo grid with a lightbox (click to open, arrows / keyboard to
 * navigate, Escape or backdrop click to close). Used on the homepage and the
 * About page.
 */
export function Gallery({ images, className }: { images: GalleryImage[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  const current = open !== null ? images[open] : null;

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-4", className)}>
        {images.map((g, i) => (
          <button
            key={g.alt}
            onClick={() => setOpen(i)}
            aria-label={`View photo: ${g.alt}`}
            className="group relative aspect-square overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img src={g.src} alt={g.alt} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/80 to-transparent p-3 text-left text-xs font-semibold text-deep-foreground opacity-0 transition group-hover:opacity-100">
              {g.alt}
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-deep/90 p-5"
        >
          <button aria-label="Close" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-deep-foreground/10 text-deep-foreground transition hover:bg-deep-foreground/20">
            <X />
          </button>
          <button
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length)); }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-deep-foreground/10 text-deep-foreground transition hover:bg-deep-foreground/20 sm:left-5"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i + 1) % images.length)); }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-deep-foreground/10 text-deep-foreground transition hover:bg-deep-foreground/20 sm:right-5"
          >
            <ChevronRight />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img src={current.src} alt={current.alt} className="max-h-[80vh] w-full rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-deep-foreground/80">
              {current.alt} · {open! + 1} of {images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
