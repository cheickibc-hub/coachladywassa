import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Calendar, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";

const WHATSAPP_LINK = "https://wa.me/22600000000?text=Bonjour%20Coach%20Lady%20Wassa%2C%20j'ai%20une%20question.";
const BOOKING_LINK = "https://wa.me/22600000000?text=Bonjour%20Coach%2C%20je%20souhaite%20reserver%20une%20seance%20decouverte%20gratuite%20de%2030%20min.";

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Le plus rapide",
    detail: "+226 XX XX XX XX",
    response: "Reponse < 1h",
    color: "#25D366",
    link: WHATSAPP_LINK,
    cta: "Ouvrir WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "Pour les details",
    detail: "contact@ladywassa.com",
    response: "Reponse < 24h",
    color: "#0B3A5A",
    link: null,
    cta: "Formulaire ci-dessous",
  },
  {
    icon: Calendar,
    title: "Seance Decouverte",
    subtitle: "30 min gratuite",
    detail: "Lun-Jeu 15h-17h",
    response: "En direct avec Lady Wassa",
    color: "#D4AF37",
    link: BOOKING_LINK,
    cta: "Reserver",
  },
];

const SUBJECTS = [
  "Je veux en savoir plus sur les formations",
  "J'ai une question technique",
  "Je veux une recommandation personnalisee",
  "Autre",
];

export default function ContactSection({ apiUrl }) {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/contact`, form);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FAF9F6" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Contact
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Des questions ? On se parle directement
          </h2>
          <p className="text-base text-[#4A4A4A]">
            Je reponds rapidement et personnellement. Aucune automatisation ici.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTACT_METHODS.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${method.color}15` }}
                >
                  <Icon size={24} style={{ color: method.color }} />
                </div>
                <h4 className="text-base font-bold text-[#0B3A5A]">{method.title}</h4>
                <p className="text-xs text-[#4A4A4A] mb-2">{method.subtitle}</p>
                <p className="text-sm font-medium text-[#1A1A1A] mb-1">{method.detail}</p>
                <p className="text-xs text-[#4A4A4A]/60 mb-4">{method.response}</p>
                {method.link ? (
                  <a href={method.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      data-testid={`contact-method-${i}`}
                      className="rounded-full text-sm px-6"
                      style={{ backgroundColor: method.color, color: "#fff" }}
                    >
                      {method.cta}
                    </Button>
                  </a>
                ) : (
                  <a href="#contact-form">
                    <Button
                      data-testid={`contact-method-${i}`}
                      variant="outline"
                      className="rounded-full text-sm px-6 border-[#0B3A5A] text-[#0B3A5A]"
                    >
                      {method.cta}
                    </Button>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          id="contact-form"
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {!submitted ? (
            <form
              data-testid="contact-form-element"
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm"
            >
              <h3
                className="text-xl font-bold text-[#0B3A5A] mb-6"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Envoyez-nous un message
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="contact-name" className="text-sm text-[#4A4A4A]">Nom</Label>
                  <Input
                    id="contact-name"
                    data-testid="contact-input-name"
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 rounded-xl border-black/10"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-sm text-[#4A4A4A]">Email</Label>
                  <Input
                    id="contact-email"
                    data-testid="contact-input-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 rounded-xl border-black/10"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="contact-subject" className="text-sm text-[#4A4A4A]">Sujet</Label>
                <select
                  id="contact-subject"
                  data-testid="contact-select-subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm bg-white text-[#1A1A1A] focus:outline-none focus:border-[#0B3A5A]"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <Label htmlFor="contact-message" className="text-sm text-[#4A4A4A]">Message</Label>
                <textarea
                  id="contact-message"
                  data-testid="contact-textarea-message"
                  placeholder="Votre message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm bg-white text-[#1A1A1A] focus:outline-none focus:border-[#0B3A5A] resize-none"
                  required
                />
              </div>
              <Button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full py-6 font-semibold text-base disabled:opacity-40"
              >
                {loading ? "Envoi..." : "Envoyer le message"}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          ) : (
            <div
              data-testid="contact-success"
              className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B3A5A] mb-2" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Message envoye !
              </h3>
              <p className="text-sm text-[#4A4A4A]">
                Merci {form.name}. Je vous reponds dans les 24h. Pour une reponse plus rapide, contactez-moi sur WhatsApp.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
