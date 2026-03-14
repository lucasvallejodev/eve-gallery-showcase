import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { type ContentfulPainting, assetUrl } from "@/lib/contentful";

interface PaintingModalProps {
  painting: ContentfulPainting | null;
  onClose: () => void;
}

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <p className="mb-3 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_: unknown, children: ReactNode) => (
      <h2 className="font-display text-2xl mb-2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: unknown, children: ReactNode) => (
      <h3 className="font-display text-xl mb-2">{children}</h3>
    ),
  },
};

export default function PaintingModal({ painting, onClose }: PaintingModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Reset active image when painting changes
  useEffect(() => {
    setActiveIdx(0);
  }, [painting]);

  // ESC key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (painting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [painting]);

  const images = painting?.fields.imagenes ?? [];
  const activeImage = images[activeIdx];
  const activeUrl = activeImage ? assetUrl(activeImage.fields.file.url) : "";

  return (
    <AnimatePresence>
      {painting && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-gallery-charcoal/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative bg-background rounded-sm shadow-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-foreground hover:text-primary transition-colors duration-200 bg-background/80 rounded-full backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="relative">
                {/* Hero image */}
                <div className="aspect-[16/9] md:aspect-[4/3] bg-muted overflow-hidden">
                  {activeUrl && (
                    <img
                      src={activeUrl}
                      alt={painting.fields.titulo}
                      className="w-full h-full object-contain bg-muted"
                    />
                  )}

                  {/* Prev / Next if multiple images */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                        disabled={activeIdx === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors disabled:opacity-30"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setActiveIdx((i) => Math.min(images.length - 1, i + 1))}
                        disabled={activeIdx === images.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors disabled:opacity-30"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <div className="flex gap-2 px-6 pt-3 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={img.sys.id}
                        onClick={() => setActiveIdx(i)}
                        className={`flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-150 ${
                          i === activeIdx
                            ? "border-primary"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={assetUrl(img.fields.file.url)}
                          alt={`View ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 py-6 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl text-foreground">
                      {painting.fields.titulo}
                    </h2>
                    {painting.fields.categoria?.fields?.nombre && (
                      <span className="inline-block mt-2 text-xs font-body tracking-widest uppercase bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                        {painting.fields.categoria.fields.nombre}
                      </span>
                    )}
                  </div>

                  {painting.fields.linkDeContacto && (
                    <a
                      href={painting.fields.linkDeContacto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-body text-sm tracking-wide px-5 py-2.5 bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                    >
                      Inquire about this piece
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {painting.fields.descripcion && (
                  <div className="font-body text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {documentToReactComponents(
                      painting.fields.descripcion as Parameters<typeof documentToReactComponents>[0],
                      richTextOptions
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
