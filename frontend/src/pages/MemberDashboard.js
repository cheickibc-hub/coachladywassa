import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LogOut, Lock, Play, MessageCircle, ArrowLeft, Check } from "lucide-react";
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
