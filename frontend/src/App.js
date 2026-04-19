import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FormationsSection from "./components/FormationsSection";
import ServicesSection from "./components/ServicesSection";
import QuizSection from "./components/QuizSection";
import WebinarSection from "./components/WebinarSection";
import BookSection from "./components/BookSection";
import MediaSection from "./components/MediaSection";
import BlogSection from "./components/BlogSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <AboutSection />
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
