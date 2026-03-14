import { motion } from "framer-motion";
import portraitImg from "@/assets/artist-portrait.jpg";

export default function About() {
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
          <h1 className="font-display text-5xl md:text-7xl text-foreground">Sobre mí</h1>
        </motion.div>
      </div>

      {/* ── Two-column bio ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sticky top-24"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <img
                src={portraitImg}
                alt="Evelyn Heredia"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-body text-xs text-muted-foreground mt-3 text-center italic">
              Descripcion de Foto
            </p>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Titulo</h2>
            <div className="h-px w-12 bg-primary" />
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Contenido
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
