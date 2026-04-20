import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Brain, Zap, Target, Crown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";

const QUESTIONS = [
  {
    q: "Quand vous avez une deadline importante, vous :",
    options: [
      { text: "Vous procrastinez et avez peur", type: "A" },
      { text: "Vous agissez mais avec beaucoup de stress", type: "B" },
      { text: "Vous etes motivee et focalisee", type: "C" },
      { text: "Vous abandonnez avant de commencer", type: "D" },
    ],
  },
  {
    q: "Face a une nouvelle opportunite, vous :",
    options: [
      { text: "La peur de l'echec vous paralyse", type: "A" },
      { text: "Vous hesitez tres longtemps avant d'agir", type: "B" },
      { text: "Vous analysez puis passez a l'action", type: "C" },
      { text: "Vous foncez sans trop reflechir", type: "D" },
    ],
  },
  {
    q: "Quand quelqu'un critique votre travail :",
    options: [
      { text: "Vous etes blessee profondement", type: "A" },
      { text: "Vous ruminez pendant des jours", type: "B" },
      { text: "Vous prenez du recul objectivement", type: "C" },
      { text: "Vous ignorez completement", type: "D" },
    ],
  },
  {
    q: "Votre niveau d'energie au quotidien :",
    options: [
      { text: "Epuisee des le matin", type: "A" },
      { text: "Des hauts et des bas imprevisibles", type: "B" },
      { text: "Globalement stable et regulier", type: "C" },
      { text: "Energie uniquement le soir", type: "D" },
    ],
  },
  {
    q: "Face a un conflit, vous :",
    options: [
      { text: "Evitez a tout prix la confrontation", type: "A" },
      { text: "Explosez puis regrettez apres", type: "B" },
      { text: "Communiquez calmement vos besoins", type: "C" },
      { text: "Vous fermez completement", type: "D" },
    ],
  },
  {
    q: "Votre productivite ressemble a :",
    options: [
      { text: "Vous commencez mais ne finissez jamais", type: "D" },
      { text: "Perfectionniste au point de bloquer", type: "B" },
      { text: "Efficace et bien organisee", type: "C" },
      { text: "Travaillez uniquement sous pression", type: "A" },
    ],
  },
  {
    q: "Votre rapport au sommeil :",
    options: [
      { text: "Insomnie frequente liee a l'anxiete", type: "A" },
      { text: "Pensees qui tournent en boucle", type: "B" },
      { text: "Endormissement facile et sommeil reparateur", type: "C" },
      { text: "Reveil frequent avec difficulte a se rendormir", type: "D" },
    ],
  },
  {
    q: "Votre relation a vos objectifs :",
    options: [
      { text: "Vous n'avez pas d'objectifs clairs", type: "A" },
      { text: "Vous fixez des objectifs mais abandonnez", type: "D" },
      { text: "Vous atteignez regulierement vos buts", type: "C" },
      { text: "Trop d'objectifs en meme temps", type: "B" },
    ],
  },
];

const PROFILES = {
  A: {
    name: "Profil Amygdale",
    subtitle: "Peur dominante",
    icon: Brain,
    color: "#E74C3C",
    explanation: "Votre amygdale est hyperactive. Elle detecte des menaces la ou il n'y en a pas, ce qui vous maintient dans un etat de vigilance permanent. Cette suractivation vous empeche de prendre des risques calcules et bloque votre progression.",
    blocage: "La peur de l'echec et du jugement paralyse vos actions",
    superPouvoir: "Votre sensibilite vous rend empathique et attentive aux details",
    technique: "Technique de respiration carree (Box Breathing) : 4 sec inspirer, 4 sec retenir, 4 sec expirer, 4 sec retenir. Repetez 4 cycles pour calmer l'amygdale.",
  },
  B: {
    name: "Profil Perfectionniste",
    subtitle: "Cortisol eleve",
    icon: Target,
    color: "#F39C12",
    explanation: "Votre cortisol (hormone du stress) est chroniquement eleve. Vous mettez une pression enorme sur chaque tache, ce qui cree un cycle de stress-performance-epuisement. Le perfectionnisme est votre mecanisme de defense cerebral.",
    blocage: "Le besoin de tout controler vous epuise et ralentit votre progression",
    superPouvoir: "Votre rigueur produit un travail d'excellente qualite",
    technique: "Technique du '80% est suffisant' : Avant chaque tache, definissez consciemment le niveau acceptable. Votre cerveau apprendra qu'imparfait ne signifie pas dangereux.",
  },
  C: {
    name: "Profil Entrepreneur",
    subtitle: "Equilibre",
    icon: Crown,
    color: "#27AE60",
    explanation: "Votre cerveau a un bon equilibre entre amygdale et cortex prefrontal. Vous gerez relativement bien le stress, mais il y a toujours de la marge pour optimiser vos performances cerebrales et atteindre le niveau superieur.",
    blocage: "La zone de confort peut devenir un piege subtil de stagnation",
    superPouvoir: "Votre equilibre emotionnel inspire confiance autour de vous",
    technique: "Technique de visualisation neurale : Chaque matin, visualisez pendant 5 min votre objectif atteint. Cela active les memes circuits neuraux que l'action reelle.",
  },
  D: {
    name: "Profil Procrastinateur",
    subtitle: "Dopamine basse",
    icon: Zap,
    color: "#8E44AD",
    explanation: "Votre systeme dopaminergique est sous-stimule. La dopamine est le neurotransmetteur de la motivation et de la recompense. Son deficit explique votre difficulte a demarrer les taches et votre tendance a chercher des gratifications immediates.",
    blocage: "L'ecart entre intention et action cree frustration et culpabilite",
    superPouvoir: "Votre capacite a voir le tableau global vous rend strategique",
    technique: "Technique des micro-victoires : Divisez chaque tache en etapes de 5 min. Chaque completion libere de la dopamine, creant un cercle vertueux de motivation.",
  },
};

export default function QuizSection({ apiUrl }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [profileType, setProfileType] = useState(null);
  const [formData, setFormData] = useState({ first_name: "", email: "", whatsapp: "", prefer_whatsapp: true });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSteps = QUESTIONS.length + 2;
  const progress = ((step) / totalSteps) * 100;

  const handleAnswer = (type) => {
    setSelectedOption(type);
  };

  const nextStep = () => {
    if (step > 0 && step <= QUESTIONS.length && selectedOption) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);

      if (step === QUESTIONS.length) {
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        newAnswers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
        const maxType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        setProfileType(maxType);
      }
    }
    setSelectedOption(null);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 0) {
      if (step <= QUESTIONS.length) {
        setAnswers(answers.slice(0, -1));
      }
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.email) return;
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/leads`, {
        ...formData,
        profile_type: PROFILES[profileType]?.name || "",
        source: "quiz",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const profile = profileType ? PROFILES[profileType] : null;

  return (
    <section
      id="quiz"
      data-testid="quiz-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Quiz Gratuit
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Quel est votre profil émotionnel ?
          </h2>
          <p className="text-base text-[#4A4A4A]">
            8 questions &bull; 2 minutes &bull; Résultat personnalisé gratuit
          </p>
        </motion.div>

        {/* Progress bar */}
        {step > 0 && !submitted && (
          <div className="mb-8 bg-black/5 rounded-full h-2 overflow-hidden">
            <div className="quiz-progress h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 0: Intro */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#0B3A5A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-[#0B3A5A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B3A5A] mb-3" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Découvrez comment votre cerveau gère le stress, la peur et les objectifs
              </h3>
              <p className="text-sm text-[#4A4A4A] mb-8 max-w-md mx-auto">
                Répondez à 8 questions simples et recevez votre profil émotionnel personnalisé
                avec des techniques neurosciences adaptées à vous.
              </p>
              <Button
                data-testid="quiz-start-btn"
                onClick={nextStep}
                className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full px-10 py-6 text-base font-semibold"
              >
                Commencer le quiz
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Steps 1-8: Questions */}
          {step >= 1 && step <= QUESTIONS.length && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-10"
            >
              <p className="text-xs text-[#4A4A4A] mb-4">Question {step}/{QUESTIONS.length}</p>
              <h3 className="text-lg font-bold text-[#0B3A5A] mb-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                {QUESTIONS[step - 1].q}
              </h3>
              <div className="space-y-3">
                {QUESTIONS[step - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    data-testid={`quiz-option-${step}-${i}`}
                    onClick={() => handleAnswer(opt.type)}
                    className={`quiz-option w-full text-left p-4 rounded-xl border ${
                      selectedOption === opt.type
                        ? "selected border-[#D4AF37] bg-[#D4AF37]/[0.06]"
                        : "border-black/10"
                    }`}
                  >
                    <span className="text-sm text-[#1A1A1A]">{opt.text}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  data-testid="quiz-prev-btn"
                  variant="outline"
                  onClick={prevStep}
                  className="rounded-full border-[#0B3A5A]/20 text-[#0B3A5A]"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Precedent
                </Button>
                <Button
                  data-testid="quiz-next-btn"
                  onClick={nextStep}
                  disabled={!selectedOption}
                  className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full disabled:opacity-40"
                >
                  {step === QUESTIONS.length ? "Voir mon resultat" : "Suivant"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 9: Results */}
          {step === QUESTIONS.length + 1 && profile && !submitted && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-10"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${profile.color}15` }}>
                  <profile.icon size={32} style={{ color: profile.color }} />
                </div>
                <h3 className="text-2xl font-bold text-[#0B3A5A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  Vous etes : {profile.name}
                </h3>
                <p className="text-sm text-[#4A4A4A] mt-1">{profile.subtitle}</p>
              </div>

              <div className="space-y-5 text-sm">
                <div className="bg-[#FAF9F6] rounded-xl p-5">
                  <p className="font-semibold text-[#0B3A5A] mb-2">Explication scientifique</p>
                  <p className="text-[#4A4A4A] leading-relaxed">{profile.explanation}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-xl p-5">
                    <p className="font-semibold text-red-800 mb-1">Votre plus grand blocage</p>
                    <p className="text-red-700/80">{profile.blocage}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-5">
                    <p className="font-semibold text-green-800 mb-1">Votre super pouvoir</p>
                    <p className="text-green-700/80">{profile.superPouvoir}</p>
                  </div>
                </div>
                <div className="bg-[#0B3A5A]/[0.04] rounded-xl p-5">
                  <p className="font-semibold text-[#0B3A5A] mb-2">Technique neurosciences pour vous</p>
                  <p className="text-[#4A4A4A] leading-relaxed">{profile.technique}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-black/5 pt-8">
                <h4 className="text-base font-bold text-[#0B3A5A] mb-4 text-center">
                  Recevez votre rapport detaille + plan d'action personnalise
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quiz-name" className="text-sm text-[#4A4A4A]">Prenom</Label>
                    <Input
                      id="quiz-name"
                      data-testid="quiz-input-name"
                      placeholder="Votre prenom"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="mt-1 rounded-xl border-black/10 focus:border-[#0B3A5A] focus:ring-[#0B3A5A]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiz-email" className="text-sm text-[#4A4A4A]">Email</Label>
                    <Input
                      id="quiz-email"
                      data-testid="quiz-input-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 rounded-xl border-black/10 focus:border-[#0B3A5A] focus:ring-[#0B3A5A]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiz-whatsapp" className="text-sm text-[#4A4A4A]">WhatsApp (avec indicatif +)</Label>
                    <Input
                      id="quiz-whatsapp"
                      data-testid="quiz-input-whatsapp"
                      placeholder="+226 XX XX XX XX"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="mt-1 rounded-xl border-black/10 focus:border-[#0B3A5A] focus:ring-[#0B3A5A]"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      data-testid="quiz-checkbox-whatsapp"
                      checked={formData.prefer_whatsapp}
                      onChange={(e) => setFormData({ ...formData, prefer_whatsapp: e.target.checked })}
                      className="w-4 h-4 rounded border-black/20 text-[#0B3A5A] focus:ring-[#0B3A5A]"
                    />
                    <span className="text-sm text-[#4A4A4A]">Je prefere recevoir mes updates par WhatsApp</span>
                  </label>
                  <Button
                    data-testid="quiz-submit-btn"
                    onClick={handleSubmit}
                    disabled={loading || !formData.first_name || !formData.email}
                    className="w-full bg-[#D4AF37] hover:bg-[#c4a030] text-[#0B3A5A] rounded-full py-6 font-bold text-base disabled:opacity-40"
                  >
                    {loading ? "Envoi en cours..." : "Recevoir mon rapport gratuit"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Submitted */}
          {submitted && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 md:p-12 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0B3A5A] mb-3" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Bravo {formData.first_name} !
              </h3>
              <p className="text-[#4A4A4A] mb-6">
                Votre rapport detaille est en route. Verifiez votre {formData.prefer_whatsapp ? "WhatsApp" : "email"} dans quelques minutes.
              </p>
              <a href="#webinar">
                <Button
                  data-testid="quiz-webinar-cta"
                  className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full px-8 py-5 font-semibold"
                >
                  Decouvrir le webinaire gratuit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
