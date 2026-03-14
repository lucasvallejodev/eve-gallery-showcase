import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-painting.jpg";
import { usePaintings, useInicio } from "@/hooks/useContentful";
import PaintingCard from "@/components/PaintingCard";
import PaintingModal from "@/components/PaintingModal";
import SkeletonCard from "@/components/SkeletonCard";
import { useState } from "react";
import { type ContentfulPainting, assetUrl } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Index() {
  const { paintings, loading: paintingsLoading } = usePaintings();
  const { data: inicio, loading: inicioLoading } = useInicio();
  const featured = paintings.slice(0, 3);
  const [selectedPainting, setSelectedPainting] = useState<ContentfulPainting | null>(null);

  const heroBackground =
    inicio?.fields?.foto?.fields?.file?.url
      ? assetUrl(inicio.fields.foto.fields.file.url)
      : heroImg;

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBackground}
          alt={inicio?.fields?.titulo ?? "Eve Heredia Imagen Principal"}
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
          {inicioLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-16 md:h-24 bg-gallery-parchment/20 rounded w-3/4 mx-auto" />
              <div className="h-5 bg-gallery-parchment/20 rounded w-1/2 mx-auto" />
            </div>
          ) : (
            <>
              <h1 className="font-display text-6xl md:text-8xl text-gallery-parchment leading-none mb-5">
                {inicio?.fields?.titulo ?? "Titulo"}
              </h1>
              <p className="font-body text-base md:text-lg text-gallery-parchment/80 tracking-wide mb-10 max-w-md mx-auto">
                {inicio?.fields?.subtitulo ?? "Subtitulo"}
              </p>
            </>
          )}
          <Link
            to="/paintings"
            className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase px-8 py-3.5 border border-gallery-parchment/70 text-gallery-parchment hover:bg-gallery-parchment hover:text-gallery-charcoal transition-all duration-250"
          >
            Ver pinturas <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gallery-parchment/50">
          <span className="font-body text-xs tracking-widest uppercase">Bajar</span>
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
              Sobre el artista
            </p>
            {inicioLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-10 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            ) : (
              <>
                <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                  {inicio?.fields?.nombre ?? "Nombre"}
                </h2>
                <div className="font-body text-base text-muted-foreground leading-relaxed mb-4 prose prose-sm max-w-none">
                  {inicio?.fields?.cortaDescripcion
                    ? documentToReactComponents(inicio.fields.cortaDescripcion as Parameters<typeof documentToReactComponents>[0])
                    : <p>CortaDescripcion</p>}
                </div>
              </>
            )}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-primary hover:gap-3 transition-all duration-200"
            >
              Leer biografia completa <ArrowRight size={14} />
            </Link>
          </div>
          <div className="h-px md:h-auto md:w-px bg-border md:self-stretch hidden md:block" />
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
              Trabajo seleccionado
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Pinturas recientes</h2>
          </div>
          <Link
            to="/paintings"
            className="hidden md:inline-flex items-center gap-2 font-body text-sm tracking-wide text-primary hover:gap-3 transition-all duration-200"
          >
            Ver todo <ArrowRight size={14} />
          </Link>
        </motion.div>

        {paintingsLoading ? (
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
            Ver todas las pinturas <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <PaintingModal painting={selectedPainting} onClose={() => setSelectedPainting(null)} />
    </main>
  );
}
