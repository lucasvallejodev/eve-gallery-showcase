import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-xl text-foreground mb-1">Evelin Heredia</p>
          <p className="font-body text-xs tracking-wide text-muted-foreground">
            Barcelona, España
          </p>
        </div>

        <nav className="flex gap-8">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "Sobre mí" },
            { to: "/paintings", label: "Pinturas" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* <div className="flex items-center gap-4">
          <a
            href="mailto:studio@elenavoss.com"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div> */}
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-6">
        <p className="font-body text-xs text-muted-foreground/50 text-center md:text-left">
          © {new Date().getFullYear()} Evelin Heredia. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
