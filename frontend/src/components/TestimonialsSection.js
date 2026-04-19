import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const WRITTEN_TESTIMONIALS = [
  {
    name: "Aminata Traore",
    title: "Directrice d'ecole",
    result: "Stress reduit de 60% en 4 semaines",
    quote: "Avant j'etais rongee par l'anxiete. Maintenant j'arrive a prendre des decisions claires et rapides. Lady Wassa a change ma vie.",
    rating: 5,
  },
  {
    name: "Samuel Kane",
    title: "Entrepreneur tech",
    result: "Productivite doublee",
    quote: "Les techniques de neurosciences de Lady Wassa m'ont permis de sortir de la procrastination complete. Je recommande a 100%.",
    rating: 5,
  },
  {
    name: "Fatoumata Ba",
    title: "Ingenieure logiciel",
    result: "Promotion obtenue + salaire +25%",
    quote: "Lady Wassa m'a montre que ma peur n'etait pas reelle, c'etait une habitude cerebrale. Une fois que j'ai compris ca, j'ai pu la reprogrammer.",
    rating: 5,
  },
  {
    name: "Ibrahim Ouedraogo",
    title: "Manager bancaire",
    result: "Confiance en soi retrouvee",
    quote: "Le programme m'a permis de comprendre pourquoi je bloquais face aux decisions importantes. 8 semaines de transformation totale.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Resultats Clients
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Ils ont transforme leur vie
          </h2>
          <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
            Decouvrez les temoignages reels de personnes qui ont utilise les neurosciences
            pour depasser leurs peurs et atteindre leurs objectifs.
          </p>
        </motion.div>

        {/* WhatsApp Screenshots */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="testimonial-screenshot glass-card rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              data-testid="testimonial-screenshot-1"
              src="https://customer-assets.emergentagent.com/job_be26550a-7109-49a1-b5f6-ce556eeedf7e/artifacts/m9454gdm_WhatsApp%20Image%202026-04-16%20at%2010.08.12.jpeg"
              alt="Temoignage WhatsApp Ouedraogo"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="testimonial-screenshot glass-card rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <img
              data-testid="testimonial-screenshot-2"
              src="https://customer-assets.emergentagent.com/job_be26550a-7109-49a1-b5f6-ce556eeedf7e/artifacts/87nwjs1w_WhatsApp%20Image%202026-04-16%20at%2010.06.37.jpeg"
              alt="Temoignage WhatsApp Aminata Barry"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Written Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WRITTEN_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/30 mb-3" />
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <div className="border-t border-black/5 pt-3">
                <p className="text-sm font-bold text-[#0B3A5A]">{t.name}</p>
                <p className="text-xs text-[#4A4A4A]">{t.title}</p>
                <p className="text-xs text-[#D4AF37] font-semibold mt-1">{t.result}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { number: "100+", label: "Clients transformes" },
            { number: "95%", label: "Taux de satisfaction" },
            { number: "4-8", label: "Semaines de transformation" },
            { number: "12K+", label: "Prospects qualifies" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-[#0B3A5A]/[0.03]">
              <p className="text-3xl md:text-4xl font-bold text-[#0B3A5A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                {stat.number}
              </p>
              <p className="text-sm text-[#4A4A4A] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
