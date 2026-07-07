import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { openWhatsApp } from "../utils/whatsapp";

const WHATSAPP_MSG = "Bonjour Coach Lady Wassa, je souhaite réserver une séance découverte.";

// Palette : fond bleu foncé + or (identique au footer)
const BG = "#0B1D2E";
const GOLD = "#D4AF37";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center hero-grain overflow-hidden"
      style={{ background: BG }}
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-16 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left : Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#D4AF37]/15 rounded-3xl" />
              <img
                src="https://customer-assets.emergentagent.com/job_brain-mastery/artifacts/orkoyz8r_image.png"
                alt="Coach Lady Wassa Traoré tenant son livre — Cabinet Mindset Coaching"
                className="relative w-full rounded-3xl object-cover object-top aspect-[4/5] shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 backdrop-blur-md bg-white/95 rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-sm font-bold text-[#0B3A5A]">MasterCoach ICI certifiée</p>
                <p className="text-xs text-[#4A4A4A]">Auteure &amp; Life Coach</p>
              </div>
              {/* Facebook badge */}
              <div className="absolute top-4 -right-2 bg-[#1877F2] text-white rounded-full px-4 py-2 text-xs font-bold shadow-lg">
                12K+ abonnés
              </div>
            </div>
          </motion.div>

          {/* Right : Presentation */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <span
              className="inline-block text-xs uppercase tracking-[0.25em] font-semibold mb-6"
              style={{ color: GOLD }}
            >
              Cabinet Mindset Coaching
            </span>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", color: GOLD }}
            >
              Cabinet Mindset Coaching
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-3 text-white/90">
                Life &amp; Corporate Coach
              </span>
            </h1>

            {/* Presentation list */}
            <ul className="space-y-3 mb-10 text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                <span className="text-base md:text-lg">Auteure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                <span className="text-base md:text-lg">Consultante</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                <span className="text-base md:text-lg">
                  MasterCoach ICI certifiée — Life &amp; Corporate Coach
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                <span className="text-base md:text-lg">
                  Spécialisée en Neurosciences et en PNL
                </span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#quiz">
                <Button
                  data-testid="hero-cta-quiz"
                  className="bg-[#D4AF37] hover:bg-[#C49F27] text-[#0B1D2E] rounded-full px-8 py-6 text-base font-bold group"
                >
                  Faire le Quiz Gratuit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button
                onClick={() => openWhatsApp(WHATSAPP_MSG)}
                data-testid="hero-cta-booking"
                variant="outline"
                className="border-white/40 text-white hover:bg-white hover:text-[#0B1D2E] rounded-full px-6 py-6 text-sm font-semibold bg-transparent"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Séance Découverte
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#0B1D2E] flex items-center justify-center text-xs font-bold"
                      style={{ background: "#D4AF37", color: "#0B1D2E" }}
                    >
                      {["A", "F", "S", "M"][i - 1]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/70">100+ clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    style={{ color: GOLD }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-white/70 ml-1">4.9/5 satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
