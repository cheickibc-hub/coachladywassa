import { useEffect, useState } from "react";
import { X, Brain, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;
const STORAGE_KEY = "lw_exit_popup_seen_v1";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show once per visitor (7 days)
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen && Date.now() - parseInt(seen, 10) < 7 * 24 * 60 * 60 * 1000) return;

    let triggered = false;

    // Desktop exit-intent: mouse leaves through top of viewport
    const handleMouseLeave = (e) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setOpen(true);
      }
    };

    // Mobile fallback: trigger after 45 seconds on page
    const mobileTimer = setTimeout(() => {
      if (triggered) return;
      if (window.innerWidth < 768) {
        triggered = true;
        setOpen(true);
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !firstName) return;
    setLoading(true);
    try {
      await axios.post(`${API}/api/leads`, {
        first_name: firstName,
        email,
        whatsapp: "",
        profile_type: "exit_intent",
      });
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (err) {
      console.error(err);
      // Still mark as seen to avoid spam
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      data-testid="exit-intent-popup"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "#FAF9F6" }}
      >
        <button
          data-testid="exit-popup-close"
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="Fermer"
        >
          <X className="w-4 h-4 text-[#0B3A5A]" />
        </button>

        {/* Gold accent band */}
        <div
          className="h-2"
          style={{
            background:
              "linear-gradient(90deg, #D4AF37 0%, #F4D160 50%, #D4AF37 100%)",
          }}
        />

        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                  Offre Exclusive
                </span>
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold text-[#0B3A5A] mb-3 leading-tight"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Attendez ! Découvrez <span className="text-[#D4AF37]">votre profil neuro-cognitif</span> en 2 minutes
              </h2>

              <p className="text-sm text-[#4A4A4A] mb-6 leading-relaxed">
                Recevez gratuitement votre <strong>quiz personnalisé</strong> + un
                guide PDF "7 techniques neurosciences pour dépasser vos blocages".
                100% gratuit, résultats immédiats.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  data-testid="exit-popup-name"
                  type="text"
                  placeholder="Votre prénom"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-[#0B3A5A] bg-white"
                />
                <input
                  data-testid="exit-popup-email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-[#0B3A5A] bg-white"
                />
                <Button
                  data-testid="exit-popup-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-[#0B3A5A] rounded-full text-sm font-bold py-6"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {loading ? "Envoi..." : "Recevoir mon quiz + guide gratuit"}
                </Button>
                <p className="text-[10px] text-[#4A4A4A]/60 text-center">
                  Vos données sont 100% sécurisées. Aucun spam, jamais.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-6" data-testid="exit-popup-success">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h2
                className="text-2xl font-bold text-[#0B3A5A] mb-3"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Merci {firstName} !
              </h2>
              <p className="text-sm text-[#4A4A4A] mb-6">
                Votre guide arrive par email. Faites défiler la page pour
                démarrer votre quiz personnalisé maintenant.
              </p>
              <Button
                onClick={() => {
                  close();
                  setTimeout(() => {
                    document
                      .getElementById("quiz")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full text-sm font-semibold"
              >
                Démarrer le quiz
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
