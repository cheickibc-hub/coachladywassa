import { motion } from "framer-motion";
import { Check, Brain, Heart, Zap } from "lucide-react";

const CREDENTIALS = [
  "MasterCoach ICI certifiée",
  "Life & Corporate Coach",
  "Auteure du livre \"L'art de faire face à ses peurs\"",
  "100+ clients transformés",
  "Créatrice du programme \"Voix de Reine\"",
  "Passages TV sur RTB (Journal 13h)",
];

const PILLARS = [
  {
    icon: Brain,
    title: "Neuroplasticité",
    desc: "Votre cerveau peut se reprogrammer à tout âge. Nous utilisons cette capacité pour créer de nouveaux chemins neuraux.",
  },
  {
    icon: Heart,
    title: "Régulation Émotionnelle",
    desc: "Comprendre et maîtriser vos neurotransmetteurs : dopamine, sérotonine, cortisol pour une vie équilibrée.",
  },
  {
    icon: Zap,
    title: "Ancrage Neural",
    desc: "Créer de nouvelles connexions cérébrales durables. Les comportements deviennent des habitudes positives.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FAF9F6" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-24">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-24"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <video
                data-testid="about-video"
                src="https://customer-assets.emergentagent.com/job_be26550a-7109-49a1-b5f6-ce556eeedf7e/artifacts/14euo2e9_IMG_7243.MP4"
                controls
                poster="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/orkoyz8r_image.png"
                className="w-full aspect-video object-cover"
                preload="metadata"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-[#0B3A5A]">
                Passage RTB TV
              </div>
            </div>

            {/* Credentials */}
            <div className="mt-8 space-y-3 bg-white rounded-2xl p-6 shadow-sm border border-black/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
                Certifications
              </p>
              {CREDENTIALS.map((cred, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#1A1A1A] font-medium">{cred}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Mon Parcours
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-8 leading-tight"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Mon parcours avec la <span className="text-[#D4AF37]">peur</span>
            </h2>
            <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-base">
              <p>
                Pendant de nombreuses années, la peur a dirigé ma vie sans que je m'en rende compte.
              </p>
              <p>
                Depuis mon enfance, j'ai grandi avec des peurs invisibles : la peur du jugement, la peur de l'échec, la peur de ne pas être à la hauteur, la peur de décevoir et parfois même la peur de réussir. Comme beaucoup de personnes, j'ai laissé ces peurs influencer mes décisions, limiter mes choix et freiner mon potentiel.
              </p>
              <p>
                À l'école, à l'université et même dans ma vie professionnelle, la peur me poussait souvent à douter de moi-même. Malgré mes diplômes, mes compétences et mes nombreuses certifications, je me sentais parfois insuffisante. Je passais mon temps à chercher encore plus de formations alors que ce dont j'avais réellement besoin était de croire davantage en moi.
              </p>
              <p>
                La peur du regard des autres m'a également enfermée dans certaines situations qui ne correspondaient pas à mes valeurs. Elle m'a empêchée de prendre certaines opportunités, de montrer pleinement qui j'étais et d'exprimer tout mon potentiel.
              </p>
              <p className="font-semibold text-[#0B3A5A] text-lg italic border-l-4 border-[#D4AF37] pl-4">
                Puis un jour, j'ai décidé de ne plus subir la peur, mais de l'étudier.
              </p>
              <p>
                J'ai commencé à comprendre comment le cerveau crée les peurs, comment nos expériences, notre éducation, nos croyances et nos blessures émotionnelles programment nos comportements. J'ai découvert que beaucoup de nos limites ne sont pas réelles : elles sont simplement le résultat de programmes mentaux installés depuis des années.
              </p>
              <p>Cette prise de conscience a changé ma vie.</p>
              <p>
                J'ai alors entrepris un profond travail de reprogrammation mentale à travers les neurosciences, la PNL, le coaching et le développement personnel. Progressivement, j'ai remplacé le doute par la confiance, l'hésitation par l'action et la peur par la foi en mes capacités.
              </p>
              <p>
                Aujourd'hui, ma mission est d'aider les femmes, les hommes, les étudiants, les leaders et les entrepreneurs à faire le même chemin.
              </p>
              <p>
                Parce que je sais ce que la peur peut coûter : des opportunités perdues, des rêves abandonnés, des talents cachés et des années de potentiel inexploité.
              </p>
              <p>
                Mais je sais aussi qu'une fois comprise et maîtrisée, la peur peut devenir un moteur extraordinaire de transformation.
              </p>
              <p>
                C'est pourquoi j'accompagne aujourd'hui celles et ceux qui souhaitent reprendre le contrôle de leur cerveau, reprogrammer leurs schémas limitants, renforcer leur confiance en eux et devenir la meilleure version d'eux-mêmes.
              </p>
              <p className="font-semibold text-[#0B3A5A] text-lg mt-6 border-l-4 border-[#D4AF37] pl-4">
                Mon histoire n'est pas celle d'une femme qui n'a jamais eu peur. C'est l'histoire d'une femme qui a appris à avancer malgré la peur et qui aide désormais les autres à faire de même.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mission */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#0B3A5A] rounded-3xl px-8 py-12 md:px-16 md:py-16 text-white max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-4">
              Ma Mission
            </p>
            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90">
              Vous accompagner à révéler le meilleur de votre personnalité afin de bâtir
              une vie épanouie, de qualité et surtout alignée, en exploitant pleinement
              les incroyables potentiels cachés dans votre cerveau.
            </p>
            <p className="text-sm text-[#D4AF37] mt-4 italic">
              "Votre cerveau, votre meilleur allié : transformez votre mindset, transformez votre vie."
            </p>
          </div>
        </motion.div>

        {/* 3 Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                className="text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
                  <Icon size={28} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B3A5A] mb-3" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  {pillar.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
