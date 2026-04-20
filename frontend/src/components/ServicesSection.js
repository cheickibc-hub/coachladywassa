import { motion } from "framer-motion";
import { Brain, Heart, Briefcase, BookOpen, Users, Lightbulb, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const WHATSAPP_LINK = "https://wa.me/22657575701?text=Bonjour%20Coach%20Lady%20Wassa%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.";

const SERVICES = [
  {
    icon: Brain,
    title: "Connaissance de soi, confiance et estime de soi",
    desc: "Revelez le meilleur de votre personnalite en comprenant les mecanismes cerebraux qui influencent votre confiance.",
  },
  {
    icon: Heart,
    title: "Gestion du stress et des emotions",
    desc: "Apprenez a reguler vos emotions et maitriser votre stress grace aux techniques de neurosciences appliquees.",
  },
  {
    icon: Lightbulb,
    title: "Reprogrammation mentale",
    desc: "Transformez vos schemas de pensee limitants en nouvelles connexions cerebrales positives et durables.",
  },
  {
    icon: Briefcase,
    title: "Transition de vie et reconversion professionnelle",
    desc: "Accompagnement personnalise pour naviguer les changements de vie et les transitions de carriere.",
  },
  {
    icon: Users,
    title: "Team Building et performances organisationnelles",
    desc: "Gestion du changement organisationnel, coaching d'equipe et performances collectives pour les entreprises.",
  },
  {
    icon: BookOpen,
    title: "Coaching scolaire, parents et enseignants",
    desc: "Neurosciences de l'education et motivation pour accompagner etudiants, parents et enseignants.",
  },
];

const MORE_SERVICES = [
  "Coaching et accompagnement de projets",
  "Accompagnement des entrepreneurs",
  "Coaching collectif et individuel",
  "Programme \"Voix de Reine\"",
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
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
            Nos Services
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Cabinet Mindset Coaching
          </h2>
          <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
            Life &amp; Corporate Coach &bull; MasterCoach ICI certifie
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="bg-[#0B3A5A] rounded-3xl px-8 py-10 md:px-14 md:py-12 text-white max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
            Notre Mission
          </p>
          <p className="text-base md:text-lg leading-relaxed opacity-90">
            Vous accompagner a reveler le meilleur de votre personnalite afin de batir
            une vie epanouie, de qualite et surtout alignee, en exploitant pleinement
            les incroyables potentiels caches dans votre cerveau.
          </p>
          <p className="text-sm text-[#D4AF37] mt-4 italic font-medium">
            "Votre cerveau, votre meilleur allie : transformez votre mindset, transformez votre vie."
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                data-testid={`service-card-${i}`}
                className="bg-white rounded-2xl p-7 border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B3A5A]/[0.06] flex items-center justify-center mb-5">
                  <Icon size={24} className="text-[#0B3A5A]" />
                </div>
                <h3 className="text-base font-bold text-[#0B3A5A] mb-2 leading-snug" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* More Services */}
        <motion.div
          className="bg-[#FAF9F6] rounded-2xl p-8 max-w-2xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-semibold text-[#0B3A5A] mb-4">Egalement disponible :</p>
          <div className="flex flex-wrap justify-center gap-3">
            {MORE_SERVICES.map((s, i) => (
              <span key={i} className="bg-white text-sm text-[#4A4A4A] px-4 py-2 rounded-full border border-black/5">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Services Flyer */}
          <div className="max-w-md mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg border border-black/5">
            <img
              src="/doc-img-9.jpg"
              alt="Nos Services - Cabinet Mindset Coaching"
              className="w-full"
              loading="lazy"
            />
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button
              data-testid="services-cta"
              className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full px-10 py-6 text-base font-semibold group"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Discuter de vos besoins
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
