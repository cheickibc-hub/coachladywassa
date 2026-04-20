import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

export default function BlogArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`${API}/api/blog/articles/${slug}`);
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF9F6" }}><p>Chargement...</p></div>;
  if (!article) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF9F6" }}><p>Article non trouvé</p></div>;

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      {/* Header */}
      <header className="bg-white border-b border-black/5 px-6 md:px-12 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/">
            <img src="/logo-mindset-coaching.jpg" alt="Logo" className="h-10" />
          </Link>
          <Link to="/#blog">
            <Button variant="outline" size="sm" className="rounded-full border-[#0B3A5A]/20 text-[#0B3A5A] text-xs">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Retour au blog
            </Button>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img src={article.image_url} alt={article.title} className="w-full aspect-[21/9] object-cover" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#4A4A4A]">
            <Clock className="w-3 h-3" /> {article.reading_time}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#4A4A4A]">
            <Calendar className="w-3 h-3" /> {article.date}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mb-8 leading-tight"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          {article.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b border-black/10">
          <div className="w-10 h-10 rounded-full bg-[#0B3A5A] flex items-center justify-center text-white font-bold text-sm">LW</div>
          <div>
            <p className="text-sm font-bold text-[#0B3A5A]">Coach Lady Wassa</p>
            <p className="text-xs text-[#4A4A4A]">MasterCoach ICI certifié &bull; Cabinet Mindset Coaching</p>
          </div>
        </div>

        {/* Content */}
        <div
          data-testid="blog-article-content"
          className="prose prose-lg max-w-none"
          style={{
            color: "#4A4A4A",
            lineHeight: "1.8",
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mt-12 bg-[#0B3A5A] rounded-2xl p-8 text-center text-white">
          <h3
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Envie d'aller plus loin ?
          </h3>
          <p className="text-sm text-white/70 mb-6">
            Découvrez votre profil émotionnel gratuitement et recevez des recommandations personnalisées.
          </p>
          <Link to="/#quiz">
            <Button className="bg-[#D4AF37] hover:bg-[#c4a030] text-[#0B3A5A] rounded-full px-8 py-5 font-semibold">
              Faire le Quiz Gratuit
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
