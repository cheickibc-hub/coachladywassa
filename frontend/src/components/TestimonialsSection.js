import { motion } from "framer-motion";
import { Star, Quote, Volume2 } from "lucide-react";

const AUDIO_TESTIMONIALS = [
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/gxan6rt5_WhatsApp%20Audio%202026-04-16%20at%2009.51.26.ogg",
    name: "Témoignage audio 1",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/kd8s9k7x_WhatsApp%20Audio%202026-04-16%20at%2009.57.30.ogg",
    name: "Témoignage audio 2",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/25to3naw_WhatsApp%20Audio%202026-04-22%20at%2012.06.43%20%281%29.ogg",
    name: "Témoignage audio 3",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/q5fet5w0_WhatsApp%20Audio%202026-04-22%20at%2012.19.25.ogg",
    name: "Témoignage audio 4",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/bbixfdwe_WhatsApp%20Audio%202026-04-22%20at%2012.18.50.ogg",
    name: "Témoignage audio 5",
  },
];

const WRITTEN_TESTIMONIALS = [
  {
    name: "Ouedraogo Safiatou",
    title: "Participante Voix de Reine",
    result: "Prise de conscience transformatrice",
    quote: "Vous rencontrer est une bénédiction dans ma vie. Je sais que je vais réussir, j'ai une grande mission, je suis une grande personnalité et je vais y arriver grâce à vous.",
    rating: 5,
  },
  {
    name: "Madina Nikiema",
    title: "Communicante, Maîtresse de cérémonie - Ouagadougou",
    result: "Dépassement de ses limites",
    quote: "Ce programme s'il n'existait pas fallait le créer. Il vous permettra de dépasser vos limites, de devenir la meilleure version de vous ! D'ici 2026, mes amis et parents ne me reconnaîtront pas.",
    rating: 5,
  },
  {
    name: "Ouedraogo Djamila",
    title: "Participante Voix de Reine",
    result: "Renaissance complète",
    quote: "Ce programme n'est pas un simple coaching mais une transformation de vie, c'est tout simplement de la renaissance. Il t'amène à changer complètement ta vie sur tous les plans.",
    rating: 5,
  },
  {
    name: "Sawadogo Adjaratou",
    title: "Participante Voix de Reine",
    result: "Force et confiance retrouvées",
    quote: "Coach Lady Wassa, la spécialiste du cerveau, mon soutien, mon professeur, mon mentor, ma force, ma sœur. Tu es ma force invisible, ma force tranquille qui guide chacun de mes pas.",
    rating: 5,
  },
  {
    name: "Carine Ohg",
    title: "Participante Voix de Reine",
    result: "Libérée du besoin de validation",
    quote: "J'attendais cette voix extérieure pour réaliser que je vivais constamment dans l'aliénation, dans le souci de plaire aux autres. Maintenant, je n'ai plus besoin de me justifier pour qu'on me valide.",
    rating: 5,
  },
  {
    name: "Mlle Yogo Huguette",
    title: "Participante Voix de Reine",
    result: "Programme Voix de Reine : une pépite",
    quote: "Je suis tellement contente d'être dans ce programme. J'imagine qu'à la fin des 1 mois je serai une meilleure version de moi. C'est ton meilleur investissement.",
    rating: 5,
  },
];

const WHATSAPP_SCREENSHOTS = [
  { src: "/temoignage-1.png", alt: "Témoignage Ouedraogo Safiatou" },
  { src: "/temoignage-3.png", alt: "Témoignage Madina Nikiema" },
  { src: "/temoignage-4.png", alt: "Témoignage Ouedraogo Djamila" },
  { src: "/temoignage-6.png", alt: "Témoignage Sawadogo Adjaratou" },
  { src: "/temoignage-7.png", alt: "Témoignage Carine Ohg" },
  { src: "/temoignage-5.png", alt: "Témoignage Mlle Yogo Huguette" },
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
            Résultats Clients
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Ils ont transformé leur vie
          </h2>
          <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
            Découvrez les témoignages réels de personnes qui ont utilisé les neurosciences
            pour dépasser leurs peurs et atteindre leurs objectifs.
          </p>
        </motion.div>

        {/* WhatsApp Screenshots */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHATSAPP_SCREENSHOTS.map((img, i) => (
            <motion.div
              key={i}
              className="testimonial-screenshot glass-card rounded-2xl p-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <img
                data-testid={`testimonial-screenshot-${i + 1}`}
                src={img.src}
                alt={img.alt}
                className="w-full rounded-xl"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Audio Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-xl font-bold text-[#0B3A5A] mb-6 text-center"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            <Volume2 className="inline-block w-5 h-5 mr-2 text-[#D4AF37]" />
            Témoignages Audio
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {AUDIO_TESTIMONIALS.map((audio, i) => (
              <div
                key={i}
                data-testid={`audio-testimonial-${i}`}
                className="bg-[#FAF9F6] rounded-xl p-4 border border-black/5"
              >
                <p className="text-xs text-[#D4AF37] font-semibold mb-2">{audio.name}</p>
                <audio controls className="w-full h-10" preload="none">
                  <source src={audio.url} type="audio/ogg" />
                  Votre navigateur ne supporte pas l'audio.
                </audio>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Written Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Event Photos */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/i2zoxyj6_image.png"
              alt="Participantes du programme Voix de Reine"
              className="w-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="bg-white p-4">
              <p className="text-sm font-bold text-[#0B3A5A]">Programme Voix de Reine</p>
              <p className="text-xs text-[#4A4A4A]">Coaching collectif avec les participantes</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/ci1jbbzz_image.png"
              alt="Coach Lady Wassa - Cérémonie"
              className="w-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="bg-white p-4">
              <p className="text-sm font-bold text-[#0B3A5A]">Cérémonie officielle</p>
              <p className="text-xs text-[#4A4A4A]">Reconnaissance du travail de Coach Lady Wassa</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/temoignage-13.png"
              alt="Journée Nationale Positivité"
              className="w-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="bg-white p-4">
              <p className="text-sm font-bold text-[#0B3A5A]">Journée Nationale Positivité</p>
              <p className="text-xs text-[#4A4A4A]">Événement communautaire avec Coach Lady Wassa</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { number: "100+", label: "Clients transformés" },
            { number: "95%", label: "Taux de satisfaction" },
            { number: "4-8", label: "Semaines de transformation" },
            { number: "12K+", label: "Abonnés" },
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
