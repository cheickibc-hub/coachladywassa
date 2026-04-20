import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import AboutSection from "./components/AboutSection";
import VideoSection from "./components/VideoSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ServicesSection from "./components/ServicesSection";
import FormationsSection from "./components/FormationsSection";
import QuizSection from "./components/QuizSection";
import WebinarSection from "./components/WebinarSection";
import BookSection from "./components/BookSection";
import MediaSection from "./components/MediaSection";
import BlogSection from "./components/BlogSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <AboutSection />
      <VideoSection />
      <TestimonialsSection />
      <ServicesSection />
      <FormationsSection />
      <QuizSection apiUrl={API} />
      <WebinarSection apiUrl={API} />
      <BookSection />
      <MediaSection />
      <BlogSection />
      <FAQSection />
      <ContactSection apiUrl={API} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="/membre" element={<MemberDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
