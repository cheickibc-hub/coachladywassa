import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  LogOut, Users, Bell, MessageCircle, ArrowLeft, Check, X,
  UserPlus, Mail, BarChart3, BookOpen, ExternalLink, Trash2, Key, Plus
} from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;
const FORMATION_NAMES = { starter: "Peur 101 Starter", standard: "Transformation Cerebrale", premium: "Maitre Ton Cerveau", vip: "Transformation Annuelle" };
const FORMATION_IDS = ["starter", "standard", "premium", "vip"];

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("stats");
  const [stats, setStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [webinarRegs, setWebinarRegs] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "", enrolled_formations: [] });
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [resetPwdFor, setResetPwdFor] = useState(null);
  const [newPwd, setNewPwd] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) navigate("/connexion");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchStats();
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "admin") {
      if (tab === "members") fetchMembers();
      if (tab === "leads") fetchLeads();
      if (tab === "contacts") fetchContacts();
      if (tab === "webinar") fetchWebinarRegs();
    }
  }, [tab, user]);

  const fetchStats = async () => {
    try { const { data } = await axios.get(`${API}/api/admin/stats`, { withCredentials: true }); setStats(data); } catch (e) { console.error(e); }
  };
  const fetchMembers = async () => {
    try { const { data } = await axios.get(`${API}/api/admin/members`, { withCredentials: true }); setMembers(data); } catch (e) { console.error(e); }
  };
  const fetchLeads = async () => {
    try { const { data } = await axios.get(`${API}/api/admin/leads`, { withCredentials: true }); setLeads(data); } catch (e) { console.error(e); }
  };
  const fetchContacts = async () => {
    try { const { data } = await axios.get(`${API}/api/admin/contacts`, { withCredentials: true }); setContacts(data); } catch (e) { console.error(e); }
  };
  const fetchWebinarRegs = async () => {
    try { const { data } = await axios.get(`${API}/api/admin/webinar-registrations`, { withCredentials: true }); setWebinarRegs(data); } catch (e) { console.error(e); }
  };
  const fetchNotifications = async () => {
    try { const { data } = await axios.get(`${API}/api/admin/notifications`, { withCredentials: true }); setNotifications(data); } catch (e) { console.error(e); }
  };

  const enrollMember = async (userId, formationId) => {
    try {
      await axios.put(`${API}/api/admin/members/${userId}/enroll`, { formation_id: formationId }, { withCredentials: true });
      fetchMembers();
      fetchNotifications();
    } catch (e) { console.error(e); }
  };

  const unenrollMember = async (userId, formationId) => {
    try {
      await axios.put(`${API}/api/admin/members/${userId}/unenroll`, { formation_id: formationId }, { withCredentials: true });
      fetchMembers();
    } catch (e) { console.error(e); }
  };

  const createMember = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);
    try {
      await axios.post(`${API}/api/admin/members`, createForm, { withCredentials: true });
      setCreateForm({ name: "", email: "", password: "", enrolled_formations: [] });
      setShowCreateForm(false);
      fetchMembers();
      fetchStats();
    } catch (err) {
      setCreateError(err.response?.data?.detail || "Erreur lors de la création");
    } finally {
      setCreateLoading(false);
    }
  };

  const deleteMember = async (userId, name) => {
    if (!window.confirm(`Supprimer définitivement le membre "${name}" ?`)) return;
    try {
      await axios.delete(`${API}/api/admin/members/${userId}`, { withCredentials: true });
      fetchMembers();
      fetchStats();
    } catch (e) {
      alert(e.response?.data?.detail || "Erreur lors de la suppression");
    }
  };

  const resetPassword = async (userId) => {
    if (newPwd.length < 6) { alert("Mot de passe trop court (min 6 caractères)"); return; }
    try {
      await axios.put(`${API}/api/admin/members/${userId}/password`, { password: newPwd }, { withCredentials: true });
      setResetPwdFor(null);
      setNewPwd("");
      alert("Mot de passe réinitialisé avec succès");
    } catch (e) {
      alert(e.response?.data?.detail || "Erreur");
    }
  };

  const toggleCreateFormation = (fid) => {
    setCreateForm((prev) => ({
      ...prev,
      enrolled_formations: prev.enrolled_formations.includes(fid)
        ? prev.enrolled_formations.filter((f) => f !== fid)
        : [...prev.enrolled_formations, fid],
    }));
  };

  const markAllRead = async () => {
    try {
      await axios.put(`${API}/api/admin/notifications/read-all`, {}, { withCredentials: true });
      fetchNotifications();
      fetchStats();
    } catch (e) { console.error(e); }
  };

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF9F6" }}><p>Chargement...</p></div>;

  const TABS = [
    { id: "stats", label: "Tableau de bord", icon: BarChart3 },
    { id: "members", label: "Membres", icon: Users },
    { id: "leads", label: "Leads Quiz", icon: UserPlus },
    { id: "webinar", label: "Webinaire", icon: BookOpen },
    { id: "contacts", label: "Messages", icon: Mail },
    { id: "notifications", label: `Notifications${stats?.unread_notifications ? ` (${stats.unread_notifications})` : ""}`, icon: Bell },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAF9F6" }}>
      {/* Header */}
      <header className="bg-[#0B3A5A] text-white px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/"><img src="/logo-mindset-coaching.jpg" alt="Logo" className="h-10" /></Link>
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Administration</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">{user.name}</span>
            <Button data-testid="admin-logout-btn" variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}
              className="rounded-full border-white/20 text-white hover:bg-white/10 text-xs">
              <LogOut className="w-3.5 h-3.5 mr-1" /> Deconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-[#0B3A5A] mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Retour au site
        </Link>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-black/10 pb-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                data-testid={`admin-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-[#0B3A5A] text-white" : "bg-white text-[#4A4A4A] hover:bg-black/5 border border-black/5"
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Stats Tab */}
        {tab === "stats" && stats && (
          <div data-testid="admin-stats-panel">
            <h2 className="text-2xl font-bold text-[#0B3A5A] mb-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Tableau de bord
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Membres", value: stats.members, color: "#0B3A5A" },
                { label: "Leads Quiz", value: stats.leads, color: "#D4AF37" },
                { label: "Webinaire", value: stats.webinar_registrations, color: "#27AE60" },
                { label: "Messages", value: stats.contact_messages, color: "#E74C3C" },
                { label: "Newsletter", value: stats.newsletters, color: "#8E44AD" },
                { label: "Notifications", value: stats.unread_notifications, color: "#F39C12" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-black/5 shadow-sm">
                  <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-[#4A4A4A] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {tab === "members" && (
          <div data-testid="admin-members-panel">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#0B3A5A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Gestion des Membres ({members.length})
              </h2>
              <Button
                data-testid="admin-show-create-member-btn"
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-[#D4AF37] hover:bg-[#C4A137] text-[#0B3A5A] rounded-full text-sm font-semibold"
              >
                <Plus className="w-4 h-4 mr-1" /> {showCreateForm ? "Annuler" : "Créer un membre"}
              </Button>
            </div>

            {/* Create Member Form */}
            {showCreateForm && (
              <form
                data-testid="admin-create-member-form"
                onSubmit={createMember}
                className="bg-white rounded-xl p-6 border border-[#D4AF37]/30 shadow-sm mb-6"
              >
                <h3 className="text-lg font-bold text-[#0B3A5A] mb-4">Nouveau membre</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <input
                    data-testid="create-member-name"
                    type="text"
                    placeholder="Nom complet"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    className="px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0B3A5A]"
                  />
                  <input
                    data-testid="create-member-email"
                    type="email"
                    placeholder="email@exemple.com"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    className="px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0B3A5A]"
                  />
                  <input
                    data-testid="create-member-password"
                    type="text"
                    placeholder="Mot de passe (min 6 caractères)"
                    required
                    minLength={6}
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    className="px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0B3A5A]"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-xs text-[#4A4A4A] mb-2 font-medium">Formations à donner accès :</p>
                  <div className="flex flex-wrap gap-2">
                    {FORMATION_IDS.map((fid) => {
                      const isSel = createForm.enrolled_formations.includes(fid);
                      return (
                        <button
                          key={fid}
                          type="button"
                          data-testid={`create-formation-${fid}`}
                          onClick={() => toggleCreateFormation(fid)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            isSel ? "bg-[#0B3A5A] text-white" : "bg-black/5 text-[#4A4A4A] hover:bg-[#0B3A5A]/10"
                          }`}
                        >
                          {isSel ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
                          {FORMATION_NAMES[fid]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {createError && (
                  <p data-testid="create-member-error" className="text-sm text-red-600 mb-3">{createError}</p>
                )}
                <Button
                  data-testid="admin-create-member-submit"
                  type="submit"
                  disabled={createLoading}
                  className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full text-sm"
                >
                  {createLoading ? "Création..." : "Créer le membre"}
                </Button>
              </form>
            )}

            {members.length === 0 ? (
              <p className="text-[#4A4A4A] text-center py-12">Aucun membre inscrit pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {members.map((m) => (
                  <div key={m._id} data-testid={`admin-member-${m._id}`} className="bg-white rounded-xl p-5 border border-black/5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-[#0B3A5A]">{m.name}</p>
                        <p className="text-sm text-[#4A4A4A]">{m.email}</p>
                        <p className="text-xs text-[#4A4A4A]/50 mt-1">Inscrit le {m.created_at?.slice(0, 10)}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button
                          data-testid={`admin-reset-pwd-${m._id}`}
                          size="sm"
                          variant="outline"
                          onClick={() => { setResetPwdFor(m._id === resetPwdFor ? null : m._id); setNewPwd(""); }}
                          className="rounded-full text-xs border-[#D4AF37]/40 text-[#0B3A5A]"
                        >
                          <Key className="w-3.5 h-3.5 mr-1" /> Mot de passe
                        </Button>
                        <Button
                          data-testid={`admin-delete-${m._id}`}
                          size="sm"
                          variant="outline"
                          onClick={() => deleteMember(m._id, m.name)}
                          className="rounded-full text-xs border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" /> Supprimer
                        </Button>
                        <a href={`https://wa.me/22657575701?text=Bonjour ${m.name}`} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full text-xs">
                            <MessageCircle className="w-3.5 h-3.5 mr-1" /> WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                    {resetPwdFor === m._id && (
                      <div className="mt-3 flex items-center gap-2 bg-[#FAF9F6] p-3 rounded-lg">
                        <input
                          data-testid={`admin-new-pwd-${m._id}`}
                          type="text"
                          placeholder="Nouveau mot de passe (min 6 car.)"
                          value={newPwd}
                          onChange={(e) => setNewPwd(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0B3A5A]"
                        />
                        <Button
                          data-testid={`admin-confirm-reset-${m._id}`}
                          size="sm"
                          onClick={() => resetPassword(m._id)}
                          className="bg-[#0B3A5A] hover:bg-[#145A8A] text-white rounded-full text-xs"
                        >
                          Valider
                        </Button>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {FORMATION_IDS.map((fid) => {
                        const isEnrolled = m.enrolled_formations?.includes(fid);
                        return (
                          <button
                            key={fid}
                            data-testid={`admin-enroll-${m._id}-${fid}`}
                            onClick={() => isEnrolled ? unenrollMember(m._id, fid) : enrollMember(m._id, fid)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                              isEnrolled
                                ? "bg-[#0B3A5A] text-white"
                                : "bg-black/5 text-[#4A4A4A] hover:bg-[#0B3A5A]/10"
                            }`}
                          >
                            {isEnrolled ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
                            {FORMATION_NAMES[fid]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Leads Tab */}
        {tab === "leads" && (
          <div data-testid="admin-leads-panel">
            <h2 className="text-2xl font-bold text-[#0B3A5A] mb-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Leads Quiz ({leads.length})
            </h2>
            {leads.length === 0 ? <p className="text-[#4A4A4A] text-center py-12">Aucun lead pour le moment.</p> : (
              <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-[#FAF9F6] text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Prenom</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Email</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">WhatsApp</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Profil</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Date</th>
                    </tr></thead>
                    <tbody>
                      {leads.map((l, i) => (
                        <tr key={i} className="border-t border-black/5">
                          <td className="px-4 py-3 font-medium text-[#0B3A5A]">{l.first_name}</td>
                          <td className="px-4 py-3 text-[#4A4A4A]">{l.email}</td>
                          <td className="px-4 py-3 text-[#4A4A4A]">{l.whatsapp || "-"}</td>
                          <td className="px-4 py-3"><span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-1 rounded-full">{l.profile_type || "-"}</span></td>
                          <td className="px-4 py-3 text-[#4A4A4A]/60 text-xs">{l.created_at?.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Webinar Tab */}
        {tab === "webinar" && (
          <div data-testid="admin-webinar-panel">
            <h2 className="text-2xl font-bold text-[#0B3A5A] mb-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Inscriptions Webinaire ({webinarRegs.length})
            </h2>
            {webinarRegs.length === 0 ? <p className="text-[#4A4A4A] text-center py-12">Aucune inscription pour le moment.</p> : (
              <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-[#FAF9F6] text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Prenom</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Email</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Blocage</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Rappel</th>
                      <th className="px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Date</th>
                    </tr></thead>
                    <tbody>
                      {webinarRegs.map((r, i) => (
                        <tr key={i} className="border-t border-black/5">
                          <td className="px-4 py-3 font-medium text-[#0B3A5A]">{r.first_name}</td>
                          <td className="px-4 py-3 text-[#4A4A4A]">{r.email}</td>
                          <td className="px-4 py-3 text-[#4A4A4A] max-w-[200px] truncate">{r.biggest_challenge || "-"}</td>
                          <td className="px-4 py-3 text-[#4A4A4A]">{r.reminder_preference}</td>
                          <td className="px-4 py-3 text-[#4A4A4A]/60 text-xs">{r.created_at?.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {tab === "contacts" && (
          <div data-testid="admin-contacts-panel">
            <h2 className="text-2xl font-bold text-[#0B3A5A] mb-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Messages Contact ({contacts.length})
            </h2>
            {contacts.length === 0 ? <p className="text-[#4A4A4A] text-center py-12">Aucun message pour le moment.</p> : (
              <div className="space-y-4">
                {contacts.map((c, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-black/5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-base font-bold text-[#0B3A5A]">{c.name}</p>
                        <p className="text-xs text-[#4A4A4A]">{c.email} &bull; {c.subject}</p>
                      </div>
                      <span className="text-xs text-[#4A4A4A]/50">{c.created_at?.slice(0, 10)}</span>
                    </div>
                    <p className="text-sm text-[#4A4A4A] bg-[#FAF9F6] rounded-lg p-3">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {tab === "notifications" && (
          <div data-testid="admin-notifications-panel">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0B3A5A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Notifications
              </h2>
              <Button data-testid="admin-mark-all-read" onClick={markAllRead} variant="outline" size="sm"
                className="rounded-full border-[#0B3A5A]/20 text-[#0B3A5A] text-xs">
                <Check className="w-3.5 h-3.5 mr-1" /> Tout marquer lu
              </Button>
            </div>
            {notifications.length === 0 ? <p className="text-[#4A4A4A] text-center py-12">Aucune notification.</p> : (
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} data-testid={`admin-notif-${i}`}
                    className={`bg-white rounded-xl p-5 border shadow-sm flex items-start gap-4 ${
                      n.read ? "border-black/5 opacity-60" : "border-[#D4AF37]/30"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.type === "new_member" ? "bg-[#0B3A5A]/10" : "bg-[#D4AF37]/10"
                    }`}>
                      {n.type === "new_member" ? <UserPlus className="w-5 h-5 text-[#0B3A5A]" /> : <BookOpen className="w-5 h-5 text-[#D4AF37]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A]">{n.message}</p>
                      <p className="text-xs text-[#4A4A4A]/50 mt-1">{n.created_at?.slice(0, 16).replace("T", " ")}</p>
                    </div>
                    {n.whatsapp_url && (
                      <a href={n.whatsapp_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full text-xs flex-shrink-0">
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> WhatsApp
                        </Button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
