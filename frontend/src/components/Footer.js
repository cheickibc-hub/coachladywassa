import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Facebook, Music2 } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WHATSAPP_LINK = "https://wa.me/22657575701?text=Bonjour%20Coach%20Lady%20Wassa";
const FACEBOOK_LINK = "https://www.facebook.com/share/1AqgE2PpQM/?mibextid=wwXIfr";
const TIKTOK_LINK = "https://www.tiktok.com/@coachladywassa";

const NAV_SECTIONS = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Formations", href: "#formations" },
  { label: "Quiz", href: "#quiz" },
  { label: "Webinaire", href: "#webinar" },
  { label: "Livre", href: "#book" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post(`${API}/newsletter`, { email });
      setSubscribed(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer
      data-testid="footer"
      className="bg-[#0B1D2E] text-white pt-16 pb-8 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="/logo-mindset-coaching.jpg"
              alt="Cabinet Mindset Coaching"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              MasterCoach ICI certifié. Life &amp; Corporate Coach. Aide dirigeants, femmes actives et étudiants à dépasser leurs peurs.
            </p>
            <p className="text-sm text-white/60 mb-4">
              Ouagadougou, Burkina Faso
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-facebook-link"
                aria-label="Facebook Coach Lady Wassa"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37]" />
              </a>
              <a
                href={TIKTOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-tiktok-link"
                aria-label="TikTok Coach Lady Wassa"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 flex items-center justify-center transition-all"
              >
                {/* TikTok SVG icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                </svg>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-icon"
                aria-label="WhatsApp Coach Lady Wassa"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 flex items-center justify-center transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_SECTIONS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-4">
              Ressources
            </h4>
            <ul className="space-y-2">
              {NAV_SECTIONS.slice(5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-white/60 mb-4">
              Recevez des techniques neurosciences chaque semaine.
            </p>
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  data-testid="footer-newsletter-input"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full text-sm flex-1"
                  required
                />
                <Button
                  data-testid="footer-newsletter-btn"
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#c4a030] text-[#0B3A5A] rounded-full px-5 text-sm font-semibold"
                >
                  OK
                </Button>
              </form>
            ) : (
              <p data-testid="footer-newsletter-success" className="text-sm text-[#D4AF37]">Merci ! Vous etes inscrit(e).</p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; 2025 Coach Lady Wassa. Tous droits reserves.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-link"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <span className="text-white/20">|</span>
            <span className="text-xs text-white/40">Politique de confidentialite</span>
            <span className="text-white/20">|</span>
            <span className="text-xs text-white/40">Mentions legales</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
