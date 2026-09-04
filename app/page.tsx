import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeHelpSection from "@/components/HowWeHelpSection";
import SegmentSelector from "@/components/SegmentSelector";
import PricingBuilder from "@/components/PricingBuilder";
import ContactSection from "@/components/ContactSection";
import ResultsSection from "@/components/ResultsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />

      <HeroSection />
      <SegmentSelector />
      <HowWeHelpSection />
      <ServicesSection />
      <ResultsSection />
      <PricingBuilder />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Digital Growth Engine. All rights reserved.</p>
          <p className="mt-2 text-slate-500">No pricing games. Measurable results.</p>
        </div>
      </footer>
    </main>
  );
}
