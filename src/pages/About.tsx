import { motion } from "framer-motion";
import portraitImg from "@/assets/artist-portrait.jpg";
import { useSobreMi } from "@/hooks/useContentful";
import { assetUrl } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function About() {
  const { data, loading, error } = useSobreMi();

  const photoUrl = data?.fields?.foto?.fields?.file?.url
    ? assetUrl(data.fields.foto.fields.file.url)
    : portraitImg;

  const altText = data?.fields?.descripcionDeFoto ?? "Evelin Heredia";

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
            La artista
          </p>
          {loading ? (
            <div className="h-16 bg-muted animate-pulse rounded w-48" />
          ) : (
            <h1 className="font-display text-5xl md:text-7xl text-foreground">
              {data?.fields?.titulo ?? "Sobre mí"}
            </h1>
          )}
        </motion.div>
      </div>

      {/* ── Two-column bio ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        {error && (
          <p className="font-body text-sm text-muted-foreground mb-8">
            No se pudo cargar el contenido. Por favor, intenta de nuevo más tarde.
          </p>
        )}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sticky top-24"
          >
            {loading ? (
              <div className="aspect-[3/4] bg-muted animate-pulse rounded-sm" />
            ) : (
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                <img
                  src={photoUrl}
                  alt={altText}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!loading && (
              <p className="font-body text-xs text-muted-foreground mt-3 text-center italic">
                {altText}
              </p>
            )}
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-muted rounded w-2/3" />
                <div className="h-px w-12 bg-muted" />
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-4 bg-muted rounded ${i === 5 ? "w-1/2" : "w-full"}`} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display text-4xl md:text-5xl text-foreground">
                  {data?.fields?.titulo ?? "Titulo"}
                </h2>
                <div className="h-px w-12 bg-primary" />
                <div className="font-body text-base text-muted-foreground leading-relaxed prose prose-sm max-w-none">
                  {data?.fields?.contenido
                    ? documentToReactComponents(data.fields.contenido as Parameters<typeof documentToReactComponents>[0])
                    : <p>Contenido</p>}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
