import { useState, useEffect } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";

const PHONE = "22657575701";
const DEFAULT_MSG = "Bonjour Coach Lady Wassa, je souhaite en savoir plus.";

function getWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message || DEFAULT_MSG);
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  if (isMobile) {
    return `https://wa.me/${PHONE}?text=${encoded}`;
  }
  return `https://web.whatsapp.com/send?phone=${PHONE}&text=${encoded}`;
}

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

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(getWhatsAppUrl(DEFAULT_MSG), "_blank", "noopener,noreferrer");
  };

  return (
    <>
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

      <button
        onClick={handleWhatsAppClick}
        data-testid="whatsapp-floating-btn"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-xl whatsapp-pulse transition-colors cursor-pointer"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </button>
    </>
  );
}

export { getWhatsAppUrl, PHONE };
