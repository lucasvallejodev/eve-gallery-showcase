import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-painting.jpg";
import { usePaintings } from "@/hooks/useContentful";
import PaintingCard from "@/components/PaintingCard";
import PaintingModal from "@/components/PaintingModal";
import SkeletonCard from "@/components/SkeletonCard";
import { useState } from "react";
import { type ContentfulPainting } from "@/lib/contentful";

export default function Index() {
  const { paintings, loading } = usePaintings();
  const featured = paintings.slice(0, 3);
  const [selectedPainting, setSelectedPainting] = useState<ContentfulPainting | null>(null);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Artist studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gallery-charcoal/40" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-2xl mx-auto"
        >
          <h1 className="font-display text-6xl md:text-8xl text-gallery-parchment leading-none mb-5">
            Art born from emotion
          </h1>
          <p className="font-body text-base md:text-lg text-gallery-parchment/80 tracking-wide mb-10 max-w-md mx-auto">
            Original oil paintings that capture light, memory, and the quiet beauty of the everyday.
          </p>
          <Link
            to="/paintings"
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase px-8 py-3.5 border border-gallery-parchment/70 text-gallery-parchment hover:bg-gallery-parchment hover:text-gallery-charcoal transition-all duration-250"
          >
            View Paintings <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gallery-parchment/50">
          <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gallery-parchment/30 animate-pulse" />
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
              About the artist
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Elena Voss
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              Elena's work explores the intersection of memory and landscape — painting with layers of oil that build depth the way time builds meaning. Based in Barcelona, her studio practice is slow, intentional, and deeply personal.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Influenced by the light of the Mediterranean and the tradition of Northern European painting, she searches for beauty in familiar places left quiet.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-primary hover:gap-3 transition-all duration-200"
            >
              Read full biography <ArrowRight size={14} />
            </Link>
          </div>
          <div className="h-px md:h-auto md:w-px bg-border md:self-stretch hidden md:block" />
          <div className="hidden md:flex flex-col gap-4 text-sm font-body text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs tracking-widest uppercase text-foreground/50">Medium</span>
              <span>Oil on canvas &amp; linen</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs tracking-widest uppercase text-foreground/50">Style</span>
              <span>Impressionist, Lyrical Abstraction</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs tracking-widest uppercase text-foreground/50">Based</span>
              <span>Barcelona, Spain</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs tracking-widest uppercase text-foreground/50">Shows</span>
              <span>Group &amp; solo since 2014</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-border" />
      </div>

      {/* ── Featured Works ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Selected works
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Recent Paintings</h2>
          </div>
          <Link
            to="/paintings"
            className="hidden md:inline-flex items-center gap-2 font-body text-sm tracking-wide text-primary hover:gap-3 transition-all duration-200"
          >
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <PaintingCard key={p.sys.id} painting={p} onClick={setSelectedPainting} index={i} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/paintings"
            className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-primary"
          >
            View all paintings <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-secondary/40 border-t border-b border-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-6 py-24 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Begin the conversation
          </h2>
          <p className="font-body text-base text-muted-foreground mb-10 max-w-md mx-auto">
            Interested in a specific work, a commission, or simply want to connect? I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/paintings"
              className="font-body text-sm tracking-widest uppercase px-8 py-3.5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-250"
            >
              Explore Paintings
            </Link>
            <Link
              to="/contact"
              className="font-body text-sm tracking-widest uppercase px-8 py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      <PaintingModal painting={selectedPainting} onClose={() => setSelectedPainting(null)} />
    </main>
  );
}
