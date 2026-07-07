import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LogOut, Lock, Play, MessageCircle, ArrowLeft, Check, BookOpen, ArrowRight } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;
const WHATSAPP_BASE = "https://wa.me/22657575701?text=";

export default function MemberDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/connexion");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchFormations();
  }, [user]);

  const fetchFormations = async () => {
    try {
      const { data } = await axios.get(`${API}/api/member/formations`, { withCredentials: true });
      setFormations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF9F6" }}>
        <div className="text-[#4A4A4A]">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      {/* Header */}
      <header className="bg-white border-b border-black/5 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/logo-mindset-coaching.jpg" alt="Logo" className="h-10" />
            </Link>
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider hidden sm:block">
              Espace Membre
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#4A4A4A] hidden sm:block">Bonjour, {user.name}</span>
            <Button
              data-testid="member-logout-btn"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full border-[#0B3A5A]/20 text-[#0B3A5A] text-xs"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Deconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2 text-sm text-[#0B3A5A] mb-4 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Retour au site
          </Link>
          <h1
            className="text-3xl font-bold text-[#0B3A5A]"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            data-testid="member-welcome"
          >
            Bienvenue {user.name}
          </h1>
          <p className="text-[#4A4A4A] mt-2">
            Accedez a vos formations et continuez votre transformation.
          </p>
        </div>

        {/* Book Access Tile (visible only if book_access) */}
        {user.book_access && (
          <Link to="/membre/livre" data-testid="member-book-tile" className="block mb-10 group">
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all"
              style={{ background: "linear-gradient(135deg, #0B1D2E 0%, #0B3A5A 50%, #0B1D2E 100%)" }}
            >
              {/* Gold decoration */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-2">
                      Ma bibliothèque
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                      Mon livre : L'art de faire face à ses peurs
                    </h2>
                    <p className="text-sm text-white/70 max-w-xl">
                      Lecture en ligne exclusive · 148 pages · Coach Lady Wassa Traoré
                    </p>
                  </div>
                </div>
                <div className="bg-[#D4AF37] hover:bg-[#C49F27] text-[#0B1D2E] rounded-full px-6 py-3 font-bold flex items-center gap-2 whitespace-nowrap group-hover:translate-x-1 transition-transform">
                  Lire maintenant
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Formations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {formations.map((f) => (
            <div
              key={f.id}
              data-testid={`member-formation-${f.id}`}
              className={`rounded-2xl overflow-hidden border ${
                f.enrolled ? "border-[#D4AF37]/30 bg-white" : "border-black/5 bg-white"
              } shadow-sm`}
            >
              {/* Formation header */}
              <div className={`px-6 py-5 ${f.enrolled ? "bg-[#0B3A5A]" : "bg-[#FAF9F6]"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs uppercase tracking-wider font-semibold ${f.enrolled ? "text-[#D4AF37]" : "text-[#D4AF37]"}`}>
                      {f.tier}
                    </span>
                    <h3 className={`text-lg font-bold mt-1 ${f.enrolled ? "text-white" : "text-[#0B3A5A]"}`}
                      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                    >
                      {f.name}
                    </h3>
                    <p className={`text-xs mt-1 ${f.enrolled ? "text-white/60" : "text-[#4A4A4A]/60"}`}>
                      {f.duration} &bull; {f.modules.length} modules
                    </p>
                  </div>
                  {f.enrolled && (
                    <span className="bg-[#D4AF37] text-[#0B3A5A] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Inscrit
                    </span>
                  )}
                </div>
              </div>

              {/* Modules */}
              <div className="p-6 space-y-3">
                {f.modules.map((m, mi) => (
                  <div
                    key={mi}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      m.locked
                        ? "bg-black/[0.02] opacity-60"
                        : "bg-[#0B3A5A]/[0.03] hover:bg-[#0B3A5A]/[0.06] cursor-pointer"
                    } transition-colors`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      m.locked ? "bg-black/5" : "bg-[#0B3A5A]/10"
                    }`}>
                      {m.locked ? (
                        <Lock className="w-3.5 h-3.5 text-[#4A4A4A]" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-[#0B3A5A]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A] truncate">{m.title}</p>
                      <p className="text-xs text-[#4A4A4A]/60">{m.duration}</p>
                    </div>
                  </div>
                ))}

                {/* Video embed for enrolled formations */}
                {f.enrolled && f.modules.length > 0 && !f.modules[0].locked && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-black/5">
                    <iframe
                      src={f.modules[0].video_url}
                      title={f.modules[0].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full aspect-video"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* CTA */}
                {!f.enrolled && (
                  <a
                    href={`${WHATSAPP_BASE}Bonjour Coach, je suis membre et je souhaite m'inscrire a la formation "${f.name}".`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4"
                  >
                    <Button
                      data-testid={`member-enroll-${f.id}`}
                      className="w-full bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full py-5 font-semibold"
                    >
                      <MessageCircle className="mr-2 w-4 h-4" />
                      S'inscrire via WhatsApp
                    </Button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
