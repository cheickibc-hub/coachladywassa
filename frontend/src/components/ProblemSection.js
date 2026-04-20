import { motion } from "framer-motion";
import { Brain, UserX, Sparkles } from "lucide-react";

const PROBLEMS = [
  {
    icon: Brain,
    title: "Le problème interne",
    text: "Votre amygdale (centre de la peur) contrôle vos décisions, votre confiance et vos actions. Elle vous maintient dans un état de stress permanent.",
    color: "#0B3A5A",
  },
  {
    icon: UserX,
    title: "Le problème externe",
    text: "Vous stagnez professionnellement. Vous évitez les opportunités. Vous vous auto-sabotez et laissez la peur guider votre vie.",
    color: "#4A4A4A",
  },
  {
    icon: Sparkles,
    title: "La promesse",
    text: "Il existe une science : les neurosciences. Elles peuvent transformer vos blocages en pouvoir personnel en 4 à 8 semaines.",
    color: "#D4AF37",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      data-testid="problem-section"
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
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Vous êtes prisonnier(ère) du stress, de la peur, des blocages ?
          </h2>
          <p className="text-base md:text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Votre cerveau peut devenir votre meilleur allié...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROBLEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${item.color}10` }}
                >
                  <Icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
