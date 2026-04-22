import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, LogIn } from "lucide-react";

function formatError(detail) {
  if (!detail) return "Une erreur est survenue.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map(e => e?.msg || JSON.stringify(e)).join(" ");
  if (detail?.msg) return detail.msg;
  return String(detail);
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userData = await login(email, password);
      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/membre");
      }
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
              Espace Membre
            </h1>
            <p className="text-sm text-[#4A4A4A] mt-1">Connectez-vous pour acceder a vos formations</p>
          </div>

          {error && (
            <div data-testid="login-error" className="bg-red-50 text-red-700 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="login-email" className="text-sm text-[#4A4A4A]">Email</Label>
              <Input
                id="login-email"
                data-testid="login-input-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 rounded-xl border-black/10"
                required
              />
            </div>
            <div>
              <Label htmlFor="login-password" className="text-sm text-[#4A4A4A]">Mot de passe</Label>
              <Input
                id="login-password"
                data-testid="login-input-password"
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 rounded-xl border-black/10"
                required
              />
            </div>
            <Button
              data-testid="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full py-6 font-semibold disabled:opacity-40"
            >
              <LogIn className="mr-2 w-4 h-4" />
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="text-sm text-[#4A4A4A] text-center mt-6">
            Pas encore de compte ?{" "}
            <Link to="/inscription" data-testid="login-register-link" className="text-[#0B3A5A] font-semibold hover:underline">
              Creer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
