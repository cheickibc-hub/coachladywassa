import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";

const WHATSAPP_LINK = "https://wa.me/22657575701?text=Bonjour%20Coach%20Lady%20Wassa%2C%20je%20souhaite%20reserver%20une%20seance%20decouverte.";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center hero-grain overflow-hidden"
      style={{ background: "#FAF9F6" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-16 w-full">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="md:col-span-7 relative z-10"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-4">
              Coach en Neurosciences Appliquees
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B3A5A] leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Utilisez votre cerveau comme levier de{" "}
              <span className="relative inline-block">
                transformation
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D4AF37]/20 -z-10 rounded" />
              </span>
            </h1>

            <p className="text-base md:text-lg text-[#4A4A4A] max-w-xl mb-8 leading-relaxed">
              J'aide les dirigeants, etudiants et femmes actives a utiliser leur cerveau
              comme un veritable levier de transformation pour atteindre leurs objectifs
              personnels et professionnels, sans stress ni blocages.
              <span className="block mt-2 text-sm text-[#4A4A4A]/70">
                100+ clients transformes &bull; 12,000+ abonnes &bull; Ouagadougou, Burkina Faso
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#quiz">
                <Button
                  data-testid="hero-cta-quiz"
                  className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full px-8 py-6 text-base font-semibold group"
                >
                  Faire le Quiz Gratuit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  data-testid="hero-cta-booking"
                  variant="outline"
                  className="border-[#0B3A5A] text-[#0B3A5A] hover:bg-[#0B3A5A] hover:text-white rounded-full px-8 py-6 text-base font-semibold"
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Seance Decouverte
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#0B3A5A]/10 border-2 border-white flex items-center justify-center text-xs font-bold text-[#0B3A5A]">
                      {["A", "F", "S", "M"][i - 1]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[#4A4A4A]">100+ clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-[#4A4A4A] ml-1">4.9/5 satisfaction</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="md:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#D4AF37]/10 rounded-3xl" />
              <img
                src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/axrf2auk_image.png"
                alt="Coach Lady Wassa - Coach Neurosciences Ouagadougou"
                className="relative w-full rounded-3xl object-cover object-top aspect-[4/5] shadow-xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 animate-float">
                <p className="text-sm font-bold text-[#0B3A5A]">Diplomee Neurosciences</p>
                <p className="text-xs text-[#4A4A4A]">Auteure &amp; Coach certifiee</p>
              </div>
              {/* RTB badge */}
              <div className="absolute -top-2 -right-2 bg-[#0B3A5A] text-white rounded-full px-4 py-2 text-xs font-bold shadow-lg">
                Vu sur RTB TV
              </div>
              {/* Facebook badge */}
              <div className="absolute top-16 -right-2 bg-[#1877F2] text-white rounded-full px-4 py-2 text-xs font-bold shadow-lg">
                12K+ abonnes
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0B3A5A]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
