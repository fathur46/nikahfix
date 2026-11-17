"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaFrame from "./MediaFrame";
import { weddingConfig, type GalleryItem } from "@/lib/content";

export default function Memories() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = weddingConfig.gallery;

  const categories = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, GalleryItem[]>();
    for (const item of items) {
      if (!map.has(item.category)) {
        map.set(item.category, []);
        order.push(item.category);
      }
      map.get(item.category)!.push(item);
    }
    return order.map((category) => ({ category, items: map.get(category)! }));
  }, [items]);

  if (categories.length === 0) return null;

  return (
    <section id="memories" className="w-full bg-black py-12">
      <div className="px-5">
        <h2 className="mb-1 font-display text-3xl tracking-wide text-white">Memories</h2>
        <p className="mb-6 text-sm text-nk-mist">Watch Again</p>
      </div>

      <div className="flex flex-col gap-8">
        {categories.map(({ category, items: rowItems }) => (
          <div key={category}>
            <p className="mb-3 px-5 text-sm font-semibold text-white">{category}</p>
            <ScrollRow>
              {rowItems.map((item) => {
                const globalIndex = items.findIndex((i) => i.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(globalIndex)}
                    className="relative aspect-[2/3] w-32 flex-shrink-0 overflow-hidden rounded-md active:scale-[0.97] transition-transform"
                  >
                    <MediaFrame
                      src={item.image}
                      alt={item.category}
                      label={item.category}
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </ScrollRow>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            items={items}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onIndexChange={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/** Horizontal photo row with faint left/right buttons while it can still scroll that way. */
function ScrollRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);
  const [less, setLess] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    setLess(el.scrollLeft > 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <div className="relative">
      <div ref={ref} onScroll={update} className="edge-fade flex gap-3 overflow-x-auto px-5 hide-scrollbar">
        {children}
      </div>
      {less && <ScrollButton side="left" onClick={() => scroll(-1)} />}
      {more && <ScrollButton side="right" onClick={() => scroll(1)} />}
    </div>
  );
}

function ScrollButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Scroll left" : "Scroll right"}
      onClick={onClick}
      className={`absolute ${side === "left" ? "left-2" : "right-2"} top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl leading-none text-white/80 backdrop-blur-sm active:bg-black/60`}
    >
      {side === "left" ? <>&#8249;</> : <>&#8250;</>}
    </button>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const item = items[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 pb-4 pt-[calc(1rem+var(--inset-top))]">
        <span className="text-xs uppercase tracking-wider text-white/60">{item.category}</span>
        <button onClick={onClose} className="text-white/80 text-2xl leading-none px-2">
          &times;
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        <MediaFrame
          src={item.image}
          alt={item.category}
          label={item.category}
          className="max-h-full max-w-full rounded-md"
          imgClassName="max-h-[70vh] w-auto rounded-md object-contain"
        />

        {index > 0 && (
          <button
            onClick={() => onIndexChange(index - 1)}
            className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
            aria-label="Previous"
          >
            &#8249;
          </button>
        )}
        {index < items.length - 1 && (
          <button
            onClick={() => onIndexChange(index + 1)}
            className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
            aria-label="Next"
          >
            &#8250;
          </button>
        )}
      </div>

      <p className="pb-[calc(2rem+var(--inset-bottom))] text-center text-xs text-white/40">
        {index + 1} / {items.length}
      </p>
    </motion.div>
  );
}
