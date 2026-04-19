import { motion } from "framer-motion";
import { Check, Brain, Heart, Zap } from "lucide-react";

const CREDENTIALS = [
  "Diplomee en neurosciences appliquees",
  "Auteure du livre \"L'art de faire face a ses peurs\"",
  "100+ clients transformes depuis 2018",
  "Passages TV sur RTB (Journal 13h)",
  "Coach certifiee en developpement personnel",
];

const PILLARS = [
  {
    icon: Brain,
    title: "Neuroplasticite",
    desc: "Votre cerveau peut se reprogrammer a tout age. Nous utilisons cette capacite pour creer de nouveaux chemins neuraux.",
  },
  {
    icon: Heart,
    title: "Regulation Emotionnelle",
    desc: "Comprendre et maitriser vos neurotransmetteurs : dopamine, serotonine, cortisol pour une vie equilibree.",
  },
  {
    icon: Zap,
    title: "Ancrage Neural",
    desc: "Creer de nouvelles connexions cerebrales durables. Les comportements deviennent des habitudes positives.",
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
      <div className="max-w-7xl mx-auto">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          {/* Video / Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <video
                data-testid="about-video"
                src="https://customer-assets.emergentagent.com/job_be26550a-7109-49a1-b5f6-ce556eeedf7e/artifacts/14euo2e9_IMG_7243.MP4"
                controls
                poster="https://images.pexels.com/photos/9228390/pexels-photo-9228390.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="w-full aspect-video object-cover"
                preload="metadata"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-[#0B3A5A]">
                Passage RTB TV
              </div>
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
              className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-6"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              De la peur paralysante a coach en neurosciences
            </h2>
            <div className="space-y-4 text-[#4A4A4A] leading-relaxed">
              <p>
                Il y a 10 ans, j'avais une peur bleue de parler en public. A l'universite,
                presenter un projet devant la classe me paralysait completement.
              </p>
              <p>
                Puis j'ai decouvert les neurosciences et compris comment mon cerveau
                fonctionnait. J'ai appris que la peur n'etait pas une faiblesse, mais une
                information de mon amygdale.
              </p>
              <p>
                J'ai applique des techniques basees sur la neuroplasticite et ma vie a change.
                Aujourd'hui, j'aide plus de 100 clients a transformer leur relation au stress et a la peur.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-8 space-y-3">
              {CREDENTIALS.map((cred, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#1A1A1A] font-medium">{cred}</span>
                </div>
              ))}
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
              Aider chaque personne a utiliser son cerveau comme levier de transformation.
              Creer une Afrique ou les neurosciences sont accessibles a tous pour transformer
              les blocages en pouvoir personnel.
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
