import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const WHATSAPP_BASE = "https://wa.me/22657575701?text=";

const FORMATIONS = [
  {
    tier: "STARTER",
    name: "Peur 101 Starter",
    duration: "2 semaines",
    format: "5 vidéos + Workbook PDF",
    audience: "Découverte, tous niveaux",
    badge: null,
    features: [
      "Comprendre l'amygdale et son rôle",
      "3 techniques neurosciences validées",
      "Exercices quotidiens 10 min",
      "Accès à vie aux vidéos",
    ],
    isPremium: false,
    isPopular: false,
  },
  {
    tier: "STANDARD",
    name: "Transformation Cérébrale",
    duration: "4 semaines",
    format: "15 vidéos + Groupe coaching",
    audience: "Femmes actives, premiers acheteurs",
    badge: "PLUS POPULAIRE",
    features: [
      "Framework complet 7 étapes",
      "Groupe coaching en live (2h/mois)",
      "Certification de participation",
      "Communauté Facebook exclusive",
      "Email support 1-to-1 (30j)",
    ],
    isPremium: false,
    isPopular: true,
  },
  {
    tier: "PREMIUM",
    name: "Maître De Ton Cerveau",
    duration: "8 semaines",
    format: "20 vidéos + 2 séances 1-to-1",
    audience: "Dirigeants, engagement sérieux",
    badge: "POUR LES SÉRIEUX",
    features: [
      "Tout du Standard + personnalisation",
      "2 séances 1-to-1 audit cérébral",
      "Plan d'action personnalisé",
      "Support VIP email/WhatsApp",
      "Accès à l'année",
    ],
    isPremium: false,
    isPopular: false,
  },
  {
    tier: "VIP",
    name: "Transformation Annuelle",
    duration: "12 mois",
    format: "Tous vidéos + Coaching illimité",
    audience: "Leaders, vision long-terme",
    badge: "ÉLITE",
    features: [
      "Accès formation complète 12 mois",
      "Coaching 1-to-1 mensuel (60 min)",
      "Accès à tous nouveaux contenus",
      "Mastermind mensuel (network VIP)",
      "Priorité support direct WhatsApp",
      "Réseau d'entrepreneurs transformés",
    ],
    isPremium: true,
    isPopular: false,
  },
];

export default function FormationsSection() {
  return (
    <section
      id="formations"
      data-testid="formations-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FAF9F6" }}
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
            Nos Formations
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Choisissez votre transformation
          </h2>
          <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
            4 programmes adaptés à votre niveau et vos objectifs. Garantie 30 jours 100% remboursée.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FORMATIONS.map((f, i) => (
            <motion.div
              key={i}
              data-testid={`formation-card-${f.tier.toLowerCase()}`}
              className={`formation-card rounded-2xl p-6 flex flex-col relative overflow-hidden ${
                f.isPremium
                  ? "bg-[#0B3A5A] text-white border border-[#D4AF37]/30 shadow-2xl"
                  : f.isPopular
                  ? "bg-white border-2 border-[#0B3A5A] shadow-lg"
                  : "bg-white border border-black/5 shadow-sm"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {f.badge && (
                <span
                  className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    f.isPremium
                      ? "bg-[#D4AF37] text-[#0B3A5A]"
                      : f.isPopular
                      ? "bg-[#0B3A5A] text-white"
                      : "bg-[#D4AF37]/10 text-[#D4AF37]"
                  }`}
                >
                  {f.badge}
                </span>
              )}

              <span className="text-xs uppercase tracking-[0.15em] font-semibold mb-2 text-[#D4AF37]">
                {f.tier}
              </span>

              <h3
                className={`text-xl font-bold mb-4 ${f.isPremium ? "text-white" : "text-[#0B3A5A]"}`}
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                {f.name}
              </h3>

              <p className={`text-sm mb-1 ${f.isPremium ? "text-white/80" : "text-[#4A4A4A]"}`}>
                {f.duration} &bull; {f.format}
              </p>
              <p className={`text-xs mb-6 ${f.isPremium ? "text-white/50" : "text-[#4A4A4A]/60"}`}>
                {f.audience}
              </p>

              <div className="flex-1 space-y-3 mb-6">
                {f.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${f.isPremium ? "text-[#D4AF37]" : "text-[#D4AF37]"}`} />
                    <span className={`text-sm ${f.isPremium ? "text-white/90" : "text-[#4A4A4A]"}`}>{feat}</span>
                  </div>
                ))}
              </div>

              <a
                href={`${WHATSAPP_BASE}Bonjour Coach, je suis intéressé(e) par la formation ${f.name}. Pouvez-vous me donner plus d'informations ?`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  data-testid={`formation-cta-${f.tier.toLowerCase()}`}
                  className={`w-full rounded-full py-5 font-semibold group ${
                    f.isPremium
                      ? "bg-[#D4AF37] hover:bg-[#c4a030] text-[#0B3A5A]"
                      : f.isPopular
                      ? "bg-[#0B3A5A] hover:bg-[#145A8A] text-white"
                      : "bg-[#0B3A5A]/10 hover:bg-[#0B3A5A] text-[#0B3A5A] hover:text-white"
                  }`}
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Nous contacter
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-[#4A4A4A] mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Garantie 30 jours 100% remboursée. Aucune question posée.
        </motion.p>
      </div>
    </section>
  );
}
