import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WHATSAPP_LINK = "https://wa.me/22600000000?text=Bonjour%20Coach%20Lady%20Wassa";

const NAV_SECTIONS = [
  { label: "Accueil", href: "#hero" },
  { label: "A propos", href: "#about" },
  { label: "Temoignages", href: "#testimonials" },
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
            <h3
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Lady Wassa
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Coach en neurosciences appliquees. Aide dirigeants, femmes actives et etudiants a depasser leurs peurs.
            </p>
            <p className="text-sm text-white/60">
              Ouagadougou, Burkina Faso
            </p>
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
