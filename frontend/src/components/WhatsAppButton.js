import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/22657575701?text=Bonjour%20Coach%20Lady%20Wassa%2C%20je%20souhaite%20en%20savoir%20plus.";

export default function WhatsAppButton() {
  return (
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
  );
}
