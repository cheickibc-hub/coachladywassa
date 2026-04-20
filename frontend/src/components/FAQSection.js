import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const FAQ_DATA = [
  {
    theme: "Crédibilité & Expertise",
    items: [
      {
        q: "Quelles sont vos qualifications en neurosciences ?",
        a: "Je suis MasterCoach ICI certifié, Life & Corporate Coach. J'ai également suivi des certifications spécialisées et travaillé avec des experts du domaine. Cependant, l'important n'est pas mes diplômes, c'est les résultats de mes clients. Les 100+ clients que j'ai aidés sont la preuve de mon expertise.",
      },
      {
        q: "C'est quoi \"neurosciences appliquées\" ? Ce n'est pas juste du coaching ?",
        a: "Bonne question. Le coaching traditionnel utilise la psychologie. Les neurosciences appliquées, c'est utiliser la science du cerveau pour créer un changement plus rapide et durable. Différence clé : au lieu de \"parler\" de vos peurs, nous les reprogrammons neuronalement en utilisant la neuroplasticité. Résultat : transformation en 4 à 8 semaines vs années de thérapie.",
      },
    ],
  },
  {
    theme: "Produits & Pricing",
    items: [
      {
        q: "Quelle formation me convient ?",
        a: "Cela dépend de votre niveau et objectif. STARTER : Vous découvrez les neurosciences pour la 1ère fois. STANDARD : Vous êtes prête à transformer votre stress. PREMIUM : Vous voulez du personnalisé + coaching. VIP : Vous êtes sérieuse, transformation complète 12 mois. Notre quiz gratuit vous donnera une recommandation personnalisée.",
      },
      {
        q: "Combien de temps pour voir des résultats ?",
        a: "Première semaine : Vous comprenez comment votre cerveau fonctionne. Semaine 2-4 : Vous remarquez des changements dans vos réactions. Semaine 4-8 : Transformation complète (clients rapportent 50-80% réduction stress). Important : les résultats dépendent de votre engagement. La neuroscience nécessite 30 jours de répétition minimum (neuroplasticité).",
      },
    ],
  },
  {
    theme: "Processus & Support",
    items: [
      {
        q: "Comment accède-t-on aux formations après achat ?",
        a: "Après paiement (< 5 minutes) : 1) Vous recevez email + WhatsApp avec lien d'accès 2) Création compte automatique 3) Accès immédiat à toutes les vidéos 4) Message de bienvenue et support live jour 1.",
      },
      {
        q: "Et si je n'aime pas ?",
        a: "Garantie 30 jours 100% remboursée, aucune question. Si la formation ne vous plaît pas dans les 30 jours, envoyez un email avec 'Remboursement' + raison. 48h retour argent. Pas de jugement. Mais rappelez-vous : 95% de satisfaction clients.",
      },
      {
        q: "Quel support après achat ?",
        a: "STARTER : Accès forum communauté + FAQ. STANDARD : Email support (48h réponse) + groupe coaching 1x/mois. PREMIUM : Support VIP WhatsApp + 2 séances 1-to-1. VIP : Support prioritaire 24h + coach mensuel.",
      },
    ],
  },
  {
    theme: "Technique & Accès",
    items: [
      {
        q: "Quels appareils puis-je utiliser ?",
        a: "Tous ! Ordinateur, tablette, téléphone. Les vidéos se streament ou se téléchargent (offline). Accès à vie (même après fin du programme).",
      },
      {
        q: "Les formations sont-elles en français ?",
        a: "Oui, toutes nos formations sont 100% en français. Les contenus sont adaptés au contexte africain et francophone. Lady Wassa enseigne en français avec des exemples concrets du quotidien.",
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
            Questions Fréquentes
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
