import { motion } from "framer-motion";
import portraitImg from "@/assets/artist-portrait.jpg";

const BIO_PARAGRAPHS = [
  "Elena Voss (b. 1984, Vienna) is a painter based in Barcelona whose practice centres on oil as a medium for excavating memory. Trained at the Universität für angewandte Kunst Wien and later at the Escola de Belles Arts in Barcelona, she spent several years dividing her time between the two cities before settling permanently in the Catalan capital.",
  "Her paintings are built up in layers — thin washes of colour followed by denser passages of impasto — creating surfaces that record the process of their own making. Light is her primary subject: the way it falls across an unmade bed, catches in the glass of a half-filled carafe, or dissolves the hard edge of a landscape at dusk.",
  "Elena has exhibited widely in Spain, Germany, and the UK, with solo presentations at Galeria Senda (Barcelona), Galerie Eigen + Art (Leipzig), and a recent residency at the Cité Internationale des Arts in Paris. Her work is held in private collections across Europe and North America.",
];

const FACTS = [
  { label: "Medium", value: "Oil on canvas & linen" },
  { label: "Style", value: "Impressionist, Lyrical Abstraction" },
  { label: "Born", value: "1984, Vienna, Austria" },
  { label: "Based", value: "Barcelona, Spain" },
  { label: "Training", value: "Universität für angewandte Kunst Wien" },
  { label: "Exhibitions", value: "Group & solo shows since 2012" },
  { label: "Residencies", value: "Cité Internationale des Arts, Paris (2023)" },
  { label: "Collections", value: "Private collections, Europe & N. America" },
];

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
            The artist
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground">About</h1>
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
                alt="Elena Voss in her studio"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-body text-xs text-muted-foreground mt-3 text-center italic">
              Elena Voss in her Barcelona studio, 2024
            </p>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Elena Voss</h2>
            <div className="h-px w-12 bg-primary" />
            {BIO_PARAGRAPHS.map((p, i) => (
              <p key={i} className="font-body text-base text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-border" />
      </div>

      {/* ── Facts & milestones ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-8">
            Facts &amp; milestones
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-border">
            {FACTS.map(({ label, value }) => (
              <div key={label} className="border-r border-b border-border p-6">
                <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {label}
                </p>
                <p className="font-display text-lg text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
