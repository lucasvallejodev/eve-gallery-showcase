import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaintings, useCategories } from "@/hooks/useContentful";
import PaintingCard from "@/components/PaintingCard";
import PaintingModal from "@/components/PaintingModal";
import SkeletonCard from "@/components/SkeletonCard";
import { type ContentfulPainting } from "@/lib/contentful";

export default function Paintings() {
  const { paintings, loading, error } = usePaintings();
  const { categories } = useCategories();
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [selectedPainting, setSelectedPainting] = useState<ContentfulPainting | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCatId) return paintings;
    return paintings.filter(
      (p) => p.fields.categoria?.sys?.id === selectedCatId
    );
  }, [paintings, selectedCatId]);

  return (
    <main className="pt-16">
      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Collection
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground">Paintings</h1>
          <p className="font-body text-base text-muted-foreground mt-3 max-w-md">
            Original works available for acquisition. Each piece is hand-crafted in the Barcelona studio.
          </p>
        </motion.div>
      </div>

      {/* ── Filter bar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 border-b border-border">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSelectedCatId(null)}
            className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
              !selectedCatId
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.sys.id}
              onClick={() => setSelectedCatId(cat.sys.id)}
              className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCatId === cat.sys.id
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
              title={cat.fields.descripcion}
            >
              {cat.fields.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Error state */}
        {error && (
          <div className="text-center py-24">
            <p className="font-body text-sm text-muted-foreground">
              Unable to load paintings. Please try again later.
            </p>
            <p className="font-body text-xs text-muted-foreground/60 mt-2">{error}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Paintings grid */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="font-display text-2xl text-muted-foreground italic">
                  No paintings in this category yet.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCatId ?? "all"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filtered.map((p, i) => (
                    <PaintingCard
                      key={p.sys.id}
                      painting={p}
                      onClick={setSelectedPainting}
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}
      </section>

      <PaintingModal painting={selectedPainting} onClose={() => setSelectedPainting(null)} />
    </main>
  );
}
