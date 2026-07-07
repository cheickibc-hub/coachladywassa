import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Lock,
  BookOpen,
  MessageCircle,
  Home,
} from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

export default function BookReaderPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const containerRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/connexion");
    }
  }, [user, loading, navigate]);

  // Disable print, keyboard shortcuts, drag&drop, context menu, selection
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    const blockShortcuts = (e) => {
      const k = e.key?.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      if (
        (ctrl && ["s", "p", "c", "u", "a", "j"].includes(k)) ||
        e.key === "F12" ||
        e.key === "PrintScreen"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    const blockPrint = () => {
      document.body.style.display = "none";
      setTimeout(() => {
        document.body.style.display = "";
      }, 0);
    };
    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("dragstart", preventDefault);
    document.addEventListener("keydown", blockShortcuts, { capture: true });
    window.addEventListener("beforeprint", blockPrint);
    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("keydown", blockShortcuts, { capture: true });
      window.removeEventListener("beforeprint", blockPrint);
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchInfo = async () => {
      try {
        const { data } = await axios.get(`${API}/api/member/book/info`, {
          withCredentials: true,
        });
        setInfo(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Erreur d'accès au livre. Contactez Coach Lady Wassa."
        );
      }
    };
    fetchInfo();
  }, [user]);

  const loadPage = useCallback(
    async (num) => {
      if (!info) return;
      if (num < 1 || num > info.total_pages) return;
      setPageLoading(true);
      try {
        const res = await axios.get(`${API}/api/member/book/page/${num}.jpg`, {
          withCredentials: true,
          responseType: "blob",
        });
        // Revoke previous URL
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(res.data);
        objectUrlRef.current = url;
        setImgUrl(url);
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    },
    [info]
  );

  useEffect(() => {
    if (info) loadPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, info]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setCurrentPage((p) => (info && p < info.total_pages ? p + 1 : p));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentPage((p) => (p > 1 ? p - 1 : p));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [info]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0B1D2E" }}>
        <div className="text-white">Chargement…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#0B1D2E" }}
      >
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-lg text-center">
          <Lock className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
          <h1
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Accès au livre restreint
          </h1>
          <p className="text-white/70 mb-6 text-sm leading-relaxed">{error}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/membre">
              <Button variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white hover:text-[#0B1D2E] rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" /> Espace membre
              </Button>
            </Link>
            <a
              href="https://wa.me/22657575701?text=Bonjour%20Coach%2C%20je%20souhaite%20acc%C3%A9der%20au%20livre%20en%20ligne"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full">
                <MessageCircle className="w-4 h-4 mr-2" /> Demander l'accès
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col select-none book-reader-root"
      style={{ background: "#0B1D2E", userSelect: "none", WebkitUserSelect: "none" }}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      data-testid="book-reader"
    >
      {/* Anti-print CSS */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          body::before {
            content: "Ce livre est protégé — impression désactivée.";
            visibility: visible;
            display: block;
            font-size: 24px;
            padding: 40px;
          }
        }
        .book-reader-root img {
          -webkit-user-drag: none;
          user-drag: none;
          -webkit-touch-callout: none;
        }
      `}</style>

      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-3 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/membre" className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-sm">
              <ArrowLeft className="w-4 h-4" /> Espace membre
            </Link>
            <span className="text-white/20">|</span>
            <div className="min-w-0">
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                Lecture en ligne
              </p>
              <h1
                className="text-sm md:text-base font-bold text-white truncate"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                {info?.title || "L'art de faire face à ses peurs"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span data-testid="book-page-counter">
              Page {currentPage} / {info?.total_pages || "…"}
            </span>
          </div>
        </div>
      </header>

      {/* Reader */}
      <main
        ref={containerRef}
        className="flex-1 flex items-center justify-center py-8 px-4 relative overflow-auto"
      >
        {/* Prev button */}
        <button
          data-testid="book-prev-btn"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0B1D2E] backdrop-blur-md border border-white/20 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Page précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Page frame — book format 12x20 cm ratio 3/5 */}
        <div
          className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: "min(90vw, 480px)",
            aspectRatio: "12 / 20",
          }}
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={`Page ${currentPage}`}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-contain pointer-events-none"
              style={{
                WebkitUserSelect: "none",
                userSelect: "none",
                WebkitUserDrag: "none",
                WebkitTouchCallout: "none",
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#4A4A4A]">
              Chargement…
            </div>
          )}

          {/* Client-side watermark overlay */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ opacity: 0.15 }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center text-[#0B3A5A] font-bold text-xs"
              style={{
                transform: "rotate(-30deg) scale(1.5)",
                whiteSpace: "nowrap",
                lineHeight: 3,
              }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="absolute" style={{ top: `${i * 8}%`, left: 0, right: 0, textAlign: "center" }}>
                  {info?.user_email} • {info?.user_email} • {info?.user_email}
                </div>
              ))}
            </div>
          </div>

          {pageLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Next button */}
        <button
          data-testid="book-next-btn"
          onClick={() =>
            setCurrentPage((p) =>
              info && p < info.total_pages ? p + 1 : p
            )
          }
          disabled={info && currentPage >= info.total_pages}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0B1D2E] backdrop-blur-md border border-white/20 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Page suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* Bottom bar with pagination */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
          <input
            type="range"
            data-testid="book-page-slider"
            min="1"
            max={info?.total_pages || 1}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
            className="flex-1 max-w-md accent-[#D4AF37]"
          />
          <input
            type="number"
            data-testid="book-page-input"
            min="1"
            max={info?.total_pages || 1}
            value={currentPage}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && info && v >= 1 && v <= info.total_pages) setCurrentPage(v);
            }}
            className="w-16 px-2 py-1 rounded bg-white/10 text-white text-sm text-center border border-white/20 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <p className="text-center text-[10px] text-white/40 mt-3">
          <Lock className="inline w-3 h-3 mr-1" />
          Livre protégé — Lecture uniquement, téléchargement/impression/copie désactivés. Filigrane : {info?.user_email}
        </p>
      </footer>
    </div>
  );
}
