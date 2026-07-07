import { motion } from "framer-motion";
import { Brain, UserX, Sparkles, Eye, Compass, RefreshCw, Zap } from "lucide-react";

const WASA_STEPS = [
  {
    letter: "W",
    icon: Eye,
    title: "Wake Up",
    text: "Réveillez-vous de vos automatismes et comprenez ce qui vous bloque réellement. Prenez conscience de vos schémas limitants (peurs, doutes, croyances, automatismes de survie).",
  },
  {
    letter: "A",
    icon: Compass,
    title: "Align",
    text: "Alignez vos pensées, vos émotions et vos objectifs. Ce que vous voulez doit devenir clair dans votre esprit.",
  },
  {
    letter: "S",
    icon: RefreshCw,
    title: "Switch",
    text: "Changez vos anciens programmes mentaux. Remplacez la peur par la confiance, le doute par la décision.",
  },
  {
    letter: "A",
    icon: Zap,
    title: "Act",
    text: "Passez à l'action. Parce qu'un cerveau reprogrammé sans action reste une illusion.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Main title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B3A5A] tracking-tight leading-tight"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            « Vous n'avez pas besoin de plus de talent, de compétences.
            <span className="block mt-2 text-[#D4AF37]">
              Vous avez besoin de moins de blocages. »
            </span>
          </h2>
        </motion.div>

        {/* Problème intérieur */}
        <motion.div
          className="mb-16 bg-[#FAF9F6] rounded-3xl p-8 md:p-12 border-l-4 border-[#0B3A5A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0B3A5A]/10 flex items-center justify-center">
              <Brain size={24} className="text-[#0B3A5A]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B3A5A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Le problème intérieur
            </h3>
          </div>
          <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-base md:text-lg">
            <p>Et si votre plus grand obstacle n'était pas le monde extérieur mais ce qui se passe à l'intérieur de vous ?</p>
            <p>Vous avez du potentiel. Vous avez des compétences. Vous avez des talents. Vous avez même parfois les diplômes, l'expérience et les opportunités.</p>
            <p>Pourtant vous doutez. Vous procrastinez. Vous avez peur. Vous abandonnez certains projets. Vous répétez les mêmes erreurs. Vous savez ce qu'il faudrait faire, mais vous n'arrivez pas toujours à passer à l'action.</p>
            <p>Alors vous finissez par croire que vous manquez de discipline, de volonté ou de capacités — mais la vérité est souvent tout autre.</p>
            <p>Le véritable problème n'est généralement pas un manque d'intelligence, de talent ou de compétence. Le véritable problème, ce sont les <strong>programmes invisibles</strong> qui dirigent votre vie en arrière-plan : les peurs, les croyances limitantes, les blessures du passé, les conditionnements, les automatismes inconscients. Toutes ces barrières mentales qui vous empêchent d'exprimer pleinement votre potentiel.</p>
            <p className="italic border-l-2 border-[#D4AF37] pl-4 text-[#0B3A5A]">
              Imaginez un instant une Ferrari avec un frein à main serré. Le moteur est puissant, le potentiel est là. Mais le véhicule n'avance pas à sa pleine capacité.
            </p>
            <p>C'est exactement ce qui arrive à de nombreuses personnes. Elles ne manquent pas de potentiel. Elles sont simplement freinées par des schémas mentaux qu'elles n'ont jamais appris à identifier ni à transformer.</p>
          </div>
        </motion.div>

        {/* Problème extérieur */}
        <motion.div
          className="mb-16 bg-[#FAF9F6] rounded-3xl p-8 md:p-12 border-l-4 border-[#4A4A4A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#4A4A4A]/10 flex items-center justify-center">
              <UserX size={24} className="text-[#4A4A4A]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B3A5A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Le problème extérieur
            </h3>
          </div>
          <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-base md:text-lg">
            <p>Vous stagnez professionnellement malgré vos efforts. Vous voyez passer des opportunités mais vous n'osez pas les saisir. Vous procrastinez sur des décisions importantes et vous vous auto-sabotez au moment où les choses commencent à évoluer. Vous avez des idées, mais vous ne passez pas à l'action de manière constante. Vous restez dans des cycles de répétition, avec des résultats similaires année après année. Vous vous comparez aux autres et vous avez parfois l'impression d'être en retard sur votre propre vie.</p>
            <p>Derrière cela, vous laissez la peur, le doute, le manque de confiance et une faible estime de vous-même guider vos choix, souvent sans même vous en rendre compte.</p>
          </div>
        </motion.div>

        {/* La promesse */}
        <motion.div
          className="mb-24 bg-gradient-to-br from-[#0B1D2E] to-[#0B3A5A] rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center">
              <Sparkles size={24} className="text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              La promesse
            </h3>
          </div>
          <div className="space-y-4 text-white/90 leading-relaxed text-base md:text-lg">
            <p>La bonne nouvelle ? Grâce aux <strong className="text-[#D4AF37]">neurosciences</strong>, à la <strong className="text-[#D4AF37]">PNL</strong> et à notre méthode <strong className="text-[#D4AF37]">WASA-WASA™</strong>, nous vous aidons à libérer votre potentiel, reprogrammer votre mental et transformer durablement vos résultats.</p>
            <p>Votre cerveau possède une capacité extraordinaire appelée <strong>neuroplasticité</strong>. Cela signifie que ce qui a été appris peut être modifié. Ce qui a été programmé peut être reprogrammé. Ce qui vous bloque aujourd'hui ne doit pas définir votre avenir.</p>
            <p className="text-lg md:text-xl italic text-white font-medium pt-2">
              Parce que vous n'avez pas besoin de devenir quelqu'un d'autre. Vous avez simplement besoin de retirer ce qui empêche déjà votre grandeur de s'exprimer.
            </p>
          </div>
        </motion.div>

        {/* Méthode WASA-WASA */}
        <motion.div
          id="methode"
          data-testid="wasa-wasa-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Ma méthode
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0B3A5A] tracking-tight mt-3 mb-4"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              La méthode <span className="text-[#D4AF37]">WASA-WASA</span>
            </h2>
            <p className="text-base md:text-lg text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed">
              Tout commence dans votre esprit. C'est là que se joue votre réussite ou votre stagnation.
              Avec la méthode WASA-WASA, vous apprenez à reprogrammer votre cerveau pour passer du potentiel aux résultats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {WASA_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  data-testid={`wasa-step-${i}`}
                  className="relative bg-white rounded-3xl p-7 border-2 border-[#D4AF37]/20 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div
                    className="absolute -top-6 -right-2 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg"
                    style={{ background: "#D4AF37", color: "#0B1D2E", fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    {step.letter}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B3A5A]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#0B3A5A]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B3A5A] mb-2" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4 text-[#4A4A4A] leading-relaxed text-base md:text-lg">
            <p>Le problème de beaucoup de personnes, ce n'est pas le manque de capacité. C'est un cerveau qui n'a jamais été entraîné à penser autrement.</p>
            <p>Avec WASA-WASA, vous ne subissez plus votre vie. Vous la programmez. Vous la dirigez. Vous la construisez. Et chaque jour devient un entraînement mental vers la meilleure version de vous-même.</p>
            <p className="text-2xl md:text-3xl font-bold text-[#D4AF37] pt-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Wake Up. Align. Switch. Act.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
