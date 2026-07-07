import { motion } from "framer-motion";
import { BookOpen, Headphones, ShoppingBag, Star, Award, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { openWhatsApp } from "../utils/whatsapp";

const FORMATS = [
  {
    icon: BookOpen,
    name: "Ebook / PDF",
    detail: "Format digital, livraison instantanée",
  },
  {
    icon: ShoppingBag,
    name: "Livre papier",
    detail: "A5, 200 pages, livraison 3-7 jours",
    highlight: true,
  },
  {
    icon: Headphones,
    name: "Audiobook",
    detail: "MP3 streaming, durée 4h30",
  },
];

const BOOK_REVIEWS = [
  { quote: "Le livre le plus utile que j'ai lu sur la psychologie", author: "Sarah, Ingénieure" },
  { quote: "Les techniques fonctionnent VRAIMENT. J'ai appliqué le framework et j'ai enfin réussi ma présentation", author: "Ahmed, Manager" },
  { quote: "Lady Wassa explique les neurosciences de manière simple et applicable", author: "Awa, Étudiante" },
];

export default function BookSection() {
  return (
    <section
      id="book"
      data-testid="book-section"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0B1D2E 0%, #0B3A5A 60%, #0B1D2E 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Bannière d'accroche */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] rounded-full px-5 py-2 mb-6 shadow-xl">
            <Award className="w-4 h-4 text-[#0B1D2E]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#0B1D2E] font-black">
              Produit Phare · Best-Seller
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            <span className="text-[#D4AF37]">Mon livre</span> qui a déjà transformé
            <br />
            <span className="text-white">plus de 3 500 vies</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            « L'art de faire face à ses peurs » — un manuel pratique fondé sur les neurosciences,
            écrit par Coach Lady Wassa Traoré.
          </p>
        </motion.div>

        {/* Bannière principale */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl mb-16">
          {/* Book Display */}
          <motion.div
            className="flex justify-center relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#D4AF37]/40 blur-3xl scale-110 rounded-full" />
              <img
                src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/l10szq30_image.png"
                alt="L'art de faire face à ses peurs - Coach Lady Wassa Traoré - Couverture du livre"
                className="relative w-72 md:w-96 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              {/* Best-seller badge */}
              <div className="absolute -top-4 -right-4 bg-[#D4AF37] text-[#0B1D2E] rounded-full w-24 h-24 flex flex-col items-center justify-center font-black shadow-2xl transform rotate-12">
                <Sparkles className="w-4 h-4 mb-1" />
                <span className="text-xs leading-tight text-center">Best-<br />Seller</span>
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
            <h3
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              L'art de faire face à ses <span className="text-[#D4AF37]">peurs</span>
            </h3>

            <p className="text-base text-white/80 leading-relaxed mb-5">
              La peur n'est pas votre ennemie, c'est une information de votre cerveau.
              Dans ce livre, je vous montre comment comprendre scientifiquement d'où vient
              votre peur, utiliser les techniques de neuroplasticité pour la reprogrammer,
              et créer un plan d'action personnalisé pour <strong className="text-[#D4AF37]">reprendre le contrôle de votre vie</strong>.
            </p>

            {/* Ratings + Stats */}
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-5 h-5 ${i <= 4 ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#D4AF37] fill-[#D4AF37]/50"}`} />
                ))}
                <span className="text-sm text-white/80 ml-2 font-medium">4.8/5 (234 avis)</span>
              </div>
              <div className="text-xs text-white/60 font-medium">
                3 500+ exemplaires vendus
              </div>
            </div>

            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                data-testid="book-main-cta"
                onClick={() => openWhatsApp("Bonjour, je souhaite commander le livre « L'art de faire face à ses peurs ».")}
                className="flex-1 bg-[#D4AF37] hover:bg-[#C49F27] text-[#0B1D2E] rounded-full px-8 py-6 text-base font-bold group shadow-xl"
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Commander maintenant
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Promo card */}
            <div className="bg-[#D4AF37]/15 rounded-xl p-4 border border-[#D4AF37]/40">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-semibold">
                    Offre exclusive : Livre + 20% de réduction sur les formations
                  </p>
                  <p className="text-xs text-[#D4AF37] font-bold mt-1">
                    Code promo : <span className="bg-[#D4AF37] text-[#0B1D2E] px-2 py-0.5 rounded">LIVRE20</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Formats CTA */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-white/80 text-sm uppercase tracking-[0.2em] font-semibold mb-6">
            Choisissez votre format
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {FORMATS.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className={`relative rounded-2xl p-6 border-2 transition-all hover:-translate-y-1 hover:shadow-2xl ${
                    f.highlight
                      ? "bg-[#D4AF37] border-[#D4AF37] text-[#0B1D2E]"
                      : "bg-white/5 border-white/10 hover:border-[#D4AF37]/50 text-white"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {f.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0B1D2E] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      Le plus populaire
                    </span>
                  )}
                  <Icon className={`w-8 h-8 mb-4 ${f.highlight ? "text-[#0B1D2E]" : "text-[#D4AF37]"}`} />
                  <p className="text-base font-bold mb-1">{f.name}</p>
                  <p className={`text-sm mb-4 ${f.highlight ? "text-[#0B1D2E]/70" : "text-white/60"}`}>
                    {f.detail}
                  </p>
                  <Button
                    onClick={() => openWhatsApp(`Bonjour, je souhaite commander le livre format "${f.name}".`)}
                    data-testid={`book-cta-${i}`}
                    className={`w-full rounded-full text-sm font-bold ${
                      f.highlight
                        ? "bg-[#0B1D2E] hover:bg-[#0B3A5A] text-[#D4AF37]"
                        : "bg-[#D4AF37] hover:bg-[#C49F27] text-[#0B1D2E]"
                    }`}
                  >
                    <MessageCircle className="mr-2 w-3.5 h-3.5" />
                    Commander via WhatsApp
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Book Reviews + Real Photo */}
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/w90xv2a4_image.png"
              alt="Coach Lady Wassa présentant son livre"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
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
