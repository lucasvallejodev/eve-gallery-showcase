import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Mail } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now: simulate submission
    setSubmitted(true);
  };

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
            Reach out
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground">Contact</h1>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="inline-block w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <Send size={20} className="text-primary" />
                </div>
                <h2 className="font-display text-3xl text-foreground mb-3">
                  Message received
                </h2>
                <p className="font-body text-sm text-muted-foreground">
                  Thank you for reaching out — I'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label
                    htmlFor="name"
                    className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                    placeholder="I'm interested in one of your pieces…"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase px-8 py-3.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
                >
                  Send message <Send size={13} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Get in touch
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xs">
                For inquiries about available works, commissions, or exhibitions,
                I'm happy to connect directly.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:studio@elenavoss.com"
                className="flex items-center gap-3 font-body text-sm text-foreground hover:text-primary transition-colors duration-200 group"
              >
                <Mail size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                studio@elenavoss.com
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-foreground hover:text-primary transition-colors duration-200 group"
              >
                <Instagram size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                @elena.voss.studio
              </a>
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Studio hours
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Monday – Friday, 10 am – 6 pm CET
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
