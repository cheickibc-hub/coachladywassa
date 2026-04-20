import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VIDEOS = [
  {
    title: "Voyage de Reconstruction Consciente : Explorer Nos Automatismes",
    description: "Première partie du programme \"Voix des Reines\". Explorez le concept des automatismes inconscients et comment les reprogrammer.",
    embedUrl: "https://www.loom.com/embed/55be99c409224cb6937ab8689ed0e66f",
    thumbnail: "https://cdn.loom.com/sessions/thumbnails/55be99c409224cb6937ab8689ed0e66f-18e4bc18de7748ed.jpg",
    duration: "34 min",
    program: "Voix de Reine",
  },
  {
    title: "Oser être soi-même : les quatre étapes essentielles",
    description: "Les 4 étapes pour oser être soi-même : la clarté, la confrontation, le courage et la cohérence.",
    embedUrl: "https://www.loom.com/embed/14bdae734ec54978a9f674e68f8a4d5c",
    thumbnail: "https://cdn.loom.com/sessions/thumbnails/14bdae734ec54978a9f674e68f8a4d5c-41798314cf609f39.jpg",
    duration: "16 min",
    program: "Voix de Reine",
  },
];

export default function VideoSection() {
  return (
    <section
      id="videos"
      data-testid="video-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#0B1D2E" }}
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
            Extraits du Programme
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Programme Voix de Reine
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto">
            Découvrez des extraits de notre programme phare de reprogrammation mentale
            et développement personnel avec Coach Lady Wassa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={i}
              data-testid={`video-card-${i}`}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="relative aspect-video">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                    {video.program}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Play className="w-3 h-3" /> {video.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {video.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
