import { motion } from "framer-motion";
import { Star, Quote, Volume2 } from "lucide-react";

const AUDIO_TESTIMONIALS = [
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/gxan6rt5_WhatsApp%20Audio%202026-04-16%20at%2009.51.26.ogg",
    name: "Temoignage audio 1",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/kd8s9k7x_WhatsApp%20Audio%202026-04-16%20at%2009.57.30.ogg",
    name: "Temoignage audio 2",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/8uszmbij_WhatsApp%20Audio%202026-04-16%20at%2010.03.44.ogg",
    name: "Temoignage audio 3",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/fqz9dtpm_WhatsApp%20Audio%202026-04-16%20at%2009.58.10.ogg",
    name: "Temoignage audio 4",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/sz8nfkv1_WhatsApp%20Ptt%202026-04-16%20at%2009.48.31.ogg",
    name: "Temoignage audio 5",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/j5g8ovkp_WhatsApp%20Audio%202026-04-16%20at%2009.50.12.ogg",
    name: "Temoignage audio 6",
  },
  {
    url: "https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/y7jpv6r0_WhatsApp%20Audio%202026-04-16%20at%2009.50.14%20%281%29.ogg",
    name: "Temoignage audio 7",
  },
];

const WRITTEN_TESTIMONIALS = [
  {
    name: "Mlle Yogo Huguette",
    title: "Participante Voix de Reine",
    result: "Programme Voix de Reine : une pepite",
    quote: "Je voulais vous remercier pour le programme Voix de Reine, vraiment c'est une pepite. Ce mois m'a permis de mieux me comprendre.",
    rating: 5,
  },
  {
    name: "Aminata Barry",
    title: "Femme active",
    result: "Formation tres riche",
    quote: "J'ai compris beaucoup de choses sur moi que je n'imaginais meme pas avant. Je sais quoi faire maintenant pour changer.",
    rating: 5,
  },
  {
    name: "Ouedraogo L.",
    title: "Leader d'association",
    result: "Confiance en soi retrouvee",
    quote: "Le programme voix de reine m'a permis d'avoir plus confiance en moi et de me fixer des objectifs et adapter mon cerveau a accepter ces nouveaux changements a 70%.",
    rating: 5,
  },
  {
    name: "Faridatou T.",
    title: "Participante au coaching",
    result: "Transformation complete",
    quote: "Chaque jour il faut que je vous remercie. Je sens que je deviens plus organisee dans ma facon de penser. J'ai l'impression de tout comprendre autour de moi.",
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
            Temoignages Audio
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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

        {/* Event Photos */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/ci1jbbzz_image.png"
              alt="Coach Lady Wassa - Ceremonie remise de cheque"
              className="w-full object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="bg-white p-4">
              <p className="text-sm font-bold text-[#0B3A5A]">Ceremonie officielle</p>
              <p className="text-xs text-[#4A4A4A]">Reconnaissance du travail de Coach Lady Wassa</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/w90xv2a4_image.png"
              alt="Coach Lady Wassa avec leaders communautaires"
              className="w-full object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="bg-white p-4">
              <p className="text-sm font-bold text-[#0B3A5A]">Impact communautaire</p>
              <p className="text-xs text-[#4A4A4A]">Lady Wassa presentant son livre aux leaders de la communaute</p>
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
            { number: "100+", label: "Clients transformes" },
            { number: "95%", label: "Taux de satisfaction" },
            { number: "4-8", label: "Semaines de transformation" },
            { number: "12K+", label: "Abonnes" },
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
