import { type ContentfulPainting, assetUrl } from "@/lib/contentful";
import { motion } from "framer-motion";

interface PaintingCardProps {
  painting: ContentfulPainting;
  onClick: (p: ContentfulPainting) => void;
  index?: number;
}

export default function PaintingCard({ painting, onClick, index = 0 }: PaintingCardProps) {
  const cover = painting.fields.imagenes?.[0];
  const imageUrl = cover ? assetUrl(cover.fields.file.url) : "";
  const title = painting.fields.titulo;
  const category = painting.fields.categoria?.fields?.nombre;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="painting-card cursor-pointer group rounded-sm overflow-hidden bg-card shadow-card"
      onClick={() => onClick(painting)}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden bg-muted relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="font-display text-muted-foreground text-lg italic">Sin Imagen</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="px-4 py-3 border-t border-border">
        <h3 className="font-display text-lg text-foreground leading-tight">{title}</h3>
        {category && (
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-1">
            {category}
          </p>
        )}
      </div>
    </motion.article>
  );
}
