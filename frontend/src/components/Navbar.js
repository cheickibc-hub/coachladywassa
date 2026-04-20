import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { openWhatsApp } from "../utils/whatsapp";

const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "A propos", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Services", href: "#services" },
  { label: "Formations", href: "#formations" },
  { label: "Quiz", href: "#quiz" },
  { label: "Webinaire", href: "#webinar" },
  { label: "Livre", href: "#book" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_MSG = "Bonjour Coach Lady Wassa, je souhaite en savoir plus sur vos formations.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" data-testid="nav-logo" className="flex items-center gap-2">
            <img
              src="/logo-mindset-coaching.jpg"
              alt="Cabinet Mindset Coaching"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.href.slice(1)}`}
                className="text-sm text-[#4A4A4A] hover:text-[#0B3A5A] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a href="/connexion">
              <Button
                data-testid="nav-cta-member"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B3A5A] rounded-full px-5 text-sm"
              >
                Espace Membre
              </Button>
            </a>
            <button onClick={() => openWhatsApp(WHATSAPP_MSG)}>
              <Button
                data-testid="nav-cta-whatsapp"
                className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full px-6 text-sm"
              >
                Contactez-moi
              </Button>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            data-testid="nav-mobile-toggle"
            className="lg:hidden p-2 text-[#0B3A5A]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div data-testid="nav-mobile-menu" className="lg:hidden navbar-glass border-t border-black/5">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#4A4A4A] hover:text-[#0B3A5A] py-2 font-medium"
              >
                {link.label}
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); openWhatsApp(WHATSAPP_MSG); }} className="mt-2">
              <Button className="w-full bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full text-sm">
                Contactez-moi
              </Button>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
