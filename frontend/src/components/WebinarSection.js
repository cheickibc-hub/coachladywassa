import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";

const BENEFITS = [
  "Comprendre exactement comment votre cerveau crée la peur",
  "Framework 3 étapes que vous utiliserez immédiatement",
  "Technique neuro-reprogrammation scientifique validée",
  "Réponses à vos questions en direct",
  "Surprise bonus : offre spéciale webinaire (live reveal)",
];

export default function WebinarSection({ apiUrl }) {
  const [form, setForm] = useState({ first_name: "", email: "", biggest_challenge: "", reminder_preference: "whatsapp" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.email) return;
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/webinar-registrations`, form);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <section
      id="webinar"
      data-testid="webinar-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#0B1D2E" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Value prop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Webinaire Gratuit
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-4"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Maîtrisez votre cerveau en 45 minutes
            </h2>
            <p className="text-base text-white/70 mb-2">
              La technique neurosciences que j'utilise pour transformer la peur en pouvoir.
            </p>
            <p className="text-sm text-[#D4AF37] font-semibold mb-8">
              Jeudi 19h UTC+0 (heure Ouagadougou) &bull; Avec Coach Lady Wassa &bull; Limite a 100 places
            </p>

            <div className="space-y-4 mb-8">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/90">{b}</span>
                </div>
              ))}
            </div>

            {/* Testimonial quote */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-sm text-white/80 italic mb-3">
                "Ce webinaire m'a change la vie. Les 45 minutes m'ont fait comprendre plus que 5 annees de therapie."
              </p>
              <p className="text-xs text-[#D4AF37] font-semibold">- Fatoumata Ba, Ingenieure</p>
            </div>
          </motion.div>

          {/* Right - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {!submitted ? (
              <form
                data-testid="webinar-form"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h3
                  className="text-xl font-bold text-[#0B3A5A] mb-6"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  Réservez votre place gratuite
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webinar-name" className="text-sm text-[#4A4A4A]">Prenom</Label>
                    <Input
                      id="webinar-name"
                      data-testid="webinar-input-name"
                      placeholder="Votre prenom"
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      className="mt-1 rounded-xl border-black/10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="webinar-email" className="text-sm text-[#4A4A4A]">Email</Label>
                    <Input
                      id="webinar-email"
                      data-testid="webinar-input-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 rounded-xl border-black/10"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="webinar-challenge" className="text-sm text-[#4A4A4A]">Quel est votre plus gros blocage ?</Label>
                    <Input
                      id="webinar-challenge"
                      data-testid="webinar-input-challenge"
                      placeholder="Ex: peur de parler en public..."
                      value={form.biggest_challenge}
                      onChange={(e) => setForm({ ...form, biggest_challenge: e.target.value })}
                      className="mt-1 rounded-xl border-black/10"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-[#4A4A4A] mb-2 block">Rappel par :</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="reminder"
                          data-testid="webinar-radio-whatsapp"
                          checked={form.reminder_preference === "whatsapp"}
                          onChange={() => setForm({ ...form, reminder_preference: "whatsapp" })}
                          className="text-[#0B3A5A] focus:ring-[#0B3A5A]"
                        />
                        <span className="text-sm text-[#4A4A4A]">WhatsApp</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="reminder"
                          data-testid="webinar-radio-email"
                          checked={form.reminder_preference === "email"}
                          onChange={() => setForm({ ...form, reminder_preference: "email" })}
                          className="text-[#0B3A5A] focus:ring-[#0B3A5A]"
                        />
                        <span className="text-sm text-[#4A4A4A]">Email</span>
                      </label>
                    </div>
                  </div>
                  <Button
                    data-testid="webinar-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full py-6 font-semibold text-base disabled:opacity-40"
                  >
                    {loading ? "Inscription..." : "Je m'inscris au webinaire gratuit"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-[#4A4A4A]/50 text-center mt-4">
                  Gratuit et sans engagement. Places limitees.
                </p>
              </form>
            ) : (
              <div
                data-testid="webinar-success"
                className="bg-white rounded-2xl p-8 shadow-xl text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0B3A5A] mb-2" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  Bravo {form.first_name} !
                </h3>
                <p className="text-sm text-[#4A4A4A] mb-4">
                  Vous etes inscrit(e). Jeudi 19h, vous recevrez le lien de connexion par {form.reminder_preference === "whatsapp" ? "WhatsApp" : "email"}.
                </p>
                <p className="text-xs text-[#D4AF37] font-semibold">A bientot !</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
