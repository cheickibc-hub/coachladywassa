import { useState, useEffect } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/22657575701?text=Bonjour%20Coach%20Lady%20Wassa%2C%20je%20souhaite%20en%20savoir%20plus.";

export default function WhatsAppButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          data-testid="scroll-to-top-btn"
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-[#0B3A5A] hover:bg-[#145A8A] rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="Remonter en haut"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-floating-btn"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-xl whatsapp-pulse transition-colors"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </a>
    </>
  );
}
