import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const FAQ_DATA = [
  {
    theme: "Credibilite & Expertise",
    items: [
      {
        q: "Quelles sont vos qualifications en neurosciences ?",
        a: "Je suis diplomee en neurosciences appliquees. J'ai egalement suivi des certifications specialisees et travaille avec des experts du domaine. Cependant, l'important n'est pas mes diplomes, c'est les resultats de mes clients. Les 100+ clients que j'ai aides sont la preuve de mon expertise.",
      },
      {
        q: "C'est quoi \"neurosciences appliquees\" ? Ce n'est pas juste du coaching ?",
        a: "Bonne question. Le coaching traditionnel utilise la psychologie. Les neurosciences appliquees, c'est utiliser la science du cerveau pour creer un changement plus rapide et durable. Difference cle : au lieu de \"parler\" de vos peurs, nous les reprogrammons neuronalement en utilisant la neuroplasticite. Resultat : transformation en 4-8 semaines vs annees de therapie.",
      },
    ],
  },
  {
    theme: "Produits & Pricing",
    items: [
      {
        q: "Quelle formation me convient ?",
        a: "Cela depend de votre niveau et objectif. STARTER (97EUR) : Vous decouvrez les neurosciences pour la 1ere fois. STANDARD (297EUR) : Vous etes prete a transformer votre stress. PREMIUM (697EUR) : Vous voulez du personnalise + coaching. VIP (1,997EUR) : Vous etes serieuse, transformation complete 12 mois. Notre quiz gratuit vous donnera une recommandation personnalisee.",
      },
      {
        q: "Combien de temps pour voir des resultats ?",
        a: "Premiere semaine : Vous comprenez comment votre cerveau fonctionne. Semaine 2-4 : Vous remarquez des changements dans vos reactions. Semaine 4-8 : Transformation complete (clients rapportent 50-80% reduction stress). Important : les resultats dependent de votre engagement. La neuroscience necessite 30 jours de repetition minimum (neuroplasticite).",
      },
      {
        q: "Est-ce que je peux payer en FCFA ?",
        a: "Oui ! Tous nos prix sont disponibles en euros et en FCFA. Nous acceptons Orange Money, Moov Money et les virements bancaires. Contactez-nous sur WhatsApp pour les modalites de paiement Mobile Money.",
      },
    ],
  },
  {
    theme: "Processus & Support",
    items: [
      {
        q: "Comment accede-t-on aux formations apres achat ?",
        a: "Apres paiement (< 5 minutes) : 1) Vous recevez email + WhatsApp avec lien d'acces 2) Creation compte automatique 3) Acces immediat a toutes les videos 4) Message de bienvenue et support live jour 1.",
      },
      {
        q: "Et si je n'aime pas ?",
        a: "Garantie 30 jours 100% remboursee, aucune question. Si la formation ne vous plait pas dans les 30 jours, envoyez un email avec 'Remboursement' + raison. 48h retour argent. Pas de jugement. Mais rappelez-vous : 95% de satisfaction clients.",
      },
      {
        q: "Quel support apres achat ?",
        a: "STARTER : Acces forum communaute + FAQ. STANDARD : Email support (48h reponse) + groupe coaching 1x/mois. PREMIUM : Support VIP WhatsApp + 2 seances 1-to-1. VIP : Support prioritaire 24h + coach mensuel.",
      },
    ],
  },
  {
    theme: "Technique & Acces",
    items: [
      {
        q: "Quels appareils puis-je utiliser ?",
        a: "Tous ! Ordinateur, tablette, telephone. Les videos se streament ou se telechargent (offline). Acces a vie (meme apres fin du programme).",
      },
      {
        q: "Les formations sont-elles en francais ?",
        a: "Oui, toutes nos formations sont 100% en francais. Les contenus sont adaptes au contexte africain et francophone. Lady Wassa enseigne en francais avec des exemples concrets du quotidien.",
      },
    ],
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Questions Frequentes
          </h2>
          <p className="text-base text-[#4A4A4A]">
            Tout ce que vous devez savoir avant de commencer votre transformation.
          </p>
        </motion.div>

        <div className="space-y-8">
          {FAQ_DATA.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: si * 0.1 }}
            >
              <h3 className="text-sm uppercase tracking-[0.15em] text-[#D4AF37] font-semibold mb-4">
                {section.theme}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {section.items.map((item, qi) => (
                  <AccordionItem
                    key={qi}
                    value={`${si}-${qi}`}
                    data-testid={`faq-item-${si}-${qi}`}
                    className="bg-[#FAF9F6] rounded-xl border-none px-6"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-[#0B3A5A] hover:no-underline py-5 text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#4A4A4A] leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
