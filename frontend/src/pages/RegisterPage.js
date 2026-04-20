import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, UserPlus } from "lucide-react";

function formatError(detail) {
  if (!detail) return "Une erreur est survenue.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map(e => e?.msg || JSON.stringify(e)).join(" ");
  if (detail?.msg) return detail.msg;
  return String(detail);
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/membre");
    } catch (err) {
      setError(formatError(err.response?.data?.detail) || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#FAF9F6" }}>
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 text-sm text-[#0B3A5A] mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Retour au site
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm">
          <div className="text-center mb-8">
            <img src="/logo-mindset-coaching.jpg" alt="Logo" className="h-12 mx-auto mb-4" />
            <h1
              className="text-2xl font-bold text-[#0B3A5A]"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Creer un compte
            </h1>
            <p className="text-sm text-[#4A4A4A] mt-1">Rejoignez l'espace membre Lady Wassa</p>
          </div>

          {error && (
            <div data-testid="register-error" className="bg-red-50 text-red-700 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="register-name" className="text-sm text-[#4A4A4A]">Prenom</Label>
              <Input
                id="register-name"
                data-testid="register-input-name"
                placeholder="Votre prenom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 rounded-xl border-black/10"
                required
              />
            </div>
            <div>
              <Label htmlFor="register-email" className="text-sm text-[#4A4A4A]">Email</Label>
              <Input
                id="register-email"
                data-testid="register-input-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 rounded-xl border-black/10"
                required
              />
            </div>
            <div>
              <Label htmlFor="register-password" className="text-sm text-[#4A4A4A]">Mot de passe</Label>
              <Input
                id="register-password"
                data-testid="register-input-password"
                type="password"
                placeholder="Min. 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 rounded-xl border-black/10"
                required
              />
            </div>
            <Button
              data-testid="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full py-6 font-semibold disabled:opacity-40"
            >
              <UserPlus className="mr-2 w-4 h-4" />
              {loading ? "Creation..." : "Creer mon compte"}
            </Button>
          </form>

          <p className="text-sm text-[#4A4A4A] text-center mt-6">
            Deja un compte ?{" "}
            <Link to="/connexion" data-testid="register-login-link" className="text-[#0B3A5A] font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
