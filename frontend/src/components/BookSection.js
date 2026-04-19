import { motion } from "framer-motion";
import { BookOpen, Headphones, ShoppingBag, Star } from "lucide-react";
import { Button } from "../components/ui/button";

const WHATSAPP_BASE = "https://wa.me/22657575701?text=";

const FORMATS = [
  {
    icon: BookOpen,
    name: "Ebook / PDF",
    detail: "Format digital, livraison instantanee",
    cta: "Commander",
  },
  {
    icon: ShoppingBag,
    name: "Livre papier",
    detail: "A5, 200 pages, livraison 3-7 jours",
    cta: "Commander",
  },
  {
    icon: Headphones,
    name: "Audiobook",
    detail: "MP3 streaming, duree 4h30",
    cta: "Commander",
  },
];

const BOOK_REVIEWS = [
  { quote: "Le livre le plus utile que j'ai lu sur la psychologie", author: "Sarah, Ingenieure" },
  { quote: "Les techniques fonctionnent VRAIMENT. J'ai applique le framework et j'ai enfin reussi ma presentation", author: "Ahmed, Manager" },
  { quote: "Lady Wassa explique les neurosciences de maniere simple et applicable", author: "Awa, Etudiante" },
];

export default function BookSection() {
  return (
    <section
      id="book"
      data-testid="book-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FAF9F6" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Book Display */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="book-3d">
              <div className="book-cover w-64 md:w-72 bg-[#0B3A5A] rounded-lg p-8 text-white relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
                <div className="h-96 flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-3">Coach Lady Wassa</p>
                    <h3
                      className="text-2xl font-bold leading-tight"
                      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                    >
                      L'art de faire face a ses peurs
                    </h3>
                    <p className="text-xs text-white/60 mt-3">La methode neurosciences pour transformer la peur en pouvoir</p>
                  </div>
                  <div>
                    <div className="w-12 h-0.5 bg-[#D4AF37] mb-3" />
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Neurosciences Appliquees</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Mon Livre
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              L'art de faire face a ses peurs
            </h2>
            <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">
              La peur n'est pas votre ennemie, c'est une information de votre cerveau. Dans ce livre,
              je vous montre comment comprendre scientifiquement d'ou vient votre peur, utiliser les techniques
              de neuroplasticite pour la reprogrammer, et creer un plan d'action personnalise.
            </p>
            <p className="text-sm text-[#D4AF37] font-semibold mb-6">
              3,500 exemplaires vendus &bull; 4.8/5 avis lecteurs
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-5 h-5 ${i <= 4 ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#D4AF37] fill-[#D4AF37]/50"}`} />
              ))}
              <span className="text-sm text-[#4A4A4A] ml-2">4.8/5 (234 avis)</span>
            </div>

            {/* Formats */}
            <div className="space-y-3 mb-8">
              {FORMATS.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center justify-between bg-white rounded-xl p-4 border border-black/5">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#0B3A5A]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{f.name}</p>
                        <p className="text-xs text-[#4A4A4A]">{f.detail}</p>
                      </div>
                    </div>
                    <a
                      href={`${WHATSAPP_BASE}Bonjour, je souhaite commander le livre format "${f.name}".`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        data-testid={`book-cta-${i}`}
                        size="sm"
                        className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full text-xs px-4"
                      >
                        {f.cta}
                      </Button>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Promo */}
            <div className="bg-[#D4AF37]/10 rounded-xl p-4 text-center">
              <p className="text-sm text-[#0B3A5A] font-semibold">
                Achetez le livre + Obtenez 20% de reduction sur les formations
              </p>
              <p className="text-xs text-[#D4AF37] font-bold mt-1">Code : LIVRE20</p>
            </div>
          </motion.div>
        </div>

        {/* Book Reviews */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {BOOK_REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 border border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-sm text-[#4A4A4A] italic mb-3">"{r.quote}"</p>
              <p className="text-xs font-semibold text-[#0B3A5A]">- {r.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
