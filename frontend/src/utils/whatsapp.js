const PHONE = "22657575701";

export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message || "Bonjour Coach Lady Wassa, je souhaite en savoir plus.");
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${PHONE}?text=${encoded}`
    : `https://web.whatsapp.com/send?phone=${PHONE}&text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function getWhatsAppHref(message) {
  const encoded = encodeURIComponent(message || "Bonjour Coach Lady Wassa, je souhaite en savoir plus.");
  return `https://wa.me/${PHONE}?text=${encoded}`;
}
