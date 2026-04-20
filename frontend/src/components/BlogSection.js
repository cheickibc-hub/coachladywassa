import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CATEGORIES = ["Tous", "Gestion Stress", "Performance", "Neurosciences", "Neuroplasticite", "Productivite"];

export default function BlogSection() {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API}/blog/articles`);
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  const filtered = activeCategory === "Tous" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <section
      id="blog"
      data-testid="blog-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FAF9F6" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Blog
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Articles Neurosciences
            </h2>
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-testid={`blog-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#0B3A5A] text-white"
                  : "bg-black/5 text-[#4A4A4A] hover:bg-black/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((article, i) => (
            <Link to={`/blog/${article.slug}`} key={article.id}>
              <motion.article
                data-testid={`blog-article-${article.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#4A4A4A]/60">
                    <Clock className="w-3 h-3" /> {article.reading_time}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B3A5A] leading-snug mb-2 group-hover:text-[#145A8A] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#4A4A4A] py-12">Aucun article dans cette catégorie pour le moment.</p>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="#quiz">
            <Button
              data-testid="blog-cta"
              variant="outline"
              className="border-[#0B3A5A] text-[#0B3A5A] hover:bg-[#0B3A5A] hover:text-white rounded-full px-8 py-5 font-semibold"
            >
              Découvrir votre profil émotionnel
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
