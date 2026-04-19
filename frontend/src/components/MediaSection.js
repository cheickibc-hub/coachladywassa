import { motion } from "framer-motion";
import { ExternalLink, Play, Mic } from "lucide-react";

const PRESS_ARTICLES = [
  {
    title: "Coach Lady Wassa : Comment les neurosciences transforment la vie des Africains",
    source: "RTB - Radiodiffusion Television du Burkina",
    date: "2025",
    snippet: "Passage au Journal de 13h de la RTB. Coach Lady Wassa presente les neurosciences appliquees au developpement personnel...",
  },
  {
    title: "Coaching en neurosciences : une nouvelle approche au Burkina Faso",
    source: "Sidwaya",
    date: "2024",
    snippet: "Lady Wassa, pionniere du coaching en neurosciences au Burkina Faso, aide dirigeants et femmes actives a depasser leurs blocages...",
  },
  {
    title: "12,000 abonnes : Le succes de Coach Lady Wassa sur les reseaux",
    source: "L'Observateur Paalga",
    date: "2025",
    snippet: "Avec plus de 12,000 followers sur Facebook, Coach Lady Wassa est devenue une reference du coaching au Burkina Faso...",
  },
];

const TV_APPEARANCES = [
  {
    show: "Journal 13h - RTB",
    topic: "Les neurosciences au service du developpement personnel au Burkina Faso",
    date: "2025",
    type: "tv",
  },
  {
    show: "Facebook Live - Coach Lady WASSA",
    topic: "Sessions live de coaching et neurosciences appliquees",
    date: "Hebdomadaire",
    type: "podcast",
  },
];

export default function MediaSection() {
  return (
    <section
      id="media"
      data-testid="media-section"
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
            Medias &amp; Presse
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Ils parlent de Coach Lady Wassa
          </h2>
        </motion.div>

        {/* Media logos marquee */}
        <div className="mb-16 overflow-hidden py-6 border-y border-black/5">
          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
            {["RTB Television", "Sidwaya", "L'Observateur Paalga", "Facebook 12K+", "Burkina 24", "RTB Television", "Sidwaya", "L'Observateur Paalga", "Facebook 12K+", "Burkina 24"].map((name, i) => (
              <span key={i} className="text-2xl font-bold text-[#0B3A5A]/15 tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* TV Appearances */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {TV_APPEARANCES.map((app, i) => (
            <motion.div
              key={i}
              className="bg-[#0B3A5A]/[0.03] rounded-2xl p-6 flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3A5A]/10 flex items-center justify-center flex-shrink-0">
                {app.type === "tv" ? <Play className="w-5 h-5 text-[#0B3A5A]" /> : <Mic className="w-5 h-5 text-[#0B3A5A]" />}
              </div>
              <div>
                <p className="text-xs text-[#D4AF37] font-semibold uppercase">{app.type === "tv" ? "Television" : "Podcast"}</p>
                <h4 className="text-base font-bold text-[#0B3A5A] mt-1">{app.show}</h4>
                <p className="text-sm text-[#4A4A4A] mt-1">{app.topic}</p>
                <p className="text-xs text-[#4A4A4A]/60 mt-2">{app.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Articles */}
        <div className="grid md:grid-cols-3 gap-6">
          {PRESS_ARTICLES.map((article, i) => (
            <motion.div
              key={i}
              data-testid={`press-article-${i}`}
              className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="text-xs text-[#D4AF37] font-semibold mb-2">{article.source} &bull; {article.date}</p>
              <h4 className="text-base font-bold text-[#0B3A5A] mb-2 leading-snug">{article.title}</h4>
              <p className="text-sm text-[#4A4A4A] mb-4">{article.snippet}</p>
              <span className="text-xs font-semibold text-[#0B3A5A] flex items-center gap-1 cursor-pointer hover:text-[#145A8A]">
                Lire l'article <ExternalLink className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
