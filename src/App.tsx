import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import InsuranceSelector from './components/InsuranceSelector';
import ImpactSection from './components/ImpactSection';
import QuoteSimulator from './components/QuoteSimulator';
import Footer from './components/Footer';
import SegurosPage from './components/SegurosPage';
import SeguroDetailPage from './components/SeguroDetailPage';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import ChatWidget from './components/ChatWidget';
import SaudeSyncPage from './components/SaudeSyncPage';

function App() {
  const [page, setPage] = useState<'home' | 'seguros' | 'seguro-detalhe' | 'simulador' | 'saudesync'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const [preselectedId, setPreselectedId] = useState<string | undefined>(undefined);
  const [preselectedCategory, setPreselectedCategory] = useState<'PF' | 'PJ' | undefined>(undefined);

  const handleSelectInsurance = (id: string, category: 'PF' | 'PJ') => {
    setPreselectedId(id);
    setPreselectedCategory(category);
    handleNavigate('simulador');
  };

  const handleClearPreselection = () => {
    setPreselectedId(undefined);
    setPreselectedCategory(undefined);
  };

  const handleNavigate = (targetPage: 'home' | 'seguros' | 'simulador' | 'saudesync', sectionId?: string) => {
    setPage(targetPage);
    window.scrollTo({ top: 0 }); // Reset scroll instantly
    
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setPage('seguro-detalhe');
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-850 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Header */}
      <Header onNavigate={handleNavigate} />
      
      {/* Main Content Sections */}
      <main className="flex-1">
        {page === 'home' && (
          <>
            {/* Hero Section */}
            <Hero onNavigate={handleNavigate} />

            {/* About Us (Founder & Expertise) */}
            <AboutUs />
            
            {/* Insurance Selection Grid */}
            <InsuranceSelector onSelectInsurance={handleSelectInsurance} />
            
            {/* Narrative Impact Section */}
            <ImpactSection />
          </>
        )}

        {page === 'seguros' && (
          <SegurosPage 
            onSelectProduct={handleSelectProduct}
            onSimulate={handleSelectInsurance}
          />
        )}

        {page === 'seguro-detalhe' && (
          <SeguroDetailPage 
            productId={selectedProductId}
            onBack={() => setPage('seguros')}
            onSimulate={handleSelectInsurance}
          />
        )}

        {page === 'simulador' && (
          <QuoteSimulator 
            preselectedId={preselectedId}
            preselectedCategory={preselectedCategory}
            onClearPreselection={handleClearPreselection}
          />
        )}

        {page === 'saudesync' && (
          <SaudeSyncPage 
            onBack={() => setPage('home')}
          />
        )}
      </main>
      
      {/* Floating Whatsapp Button */}
      <FloatingWhatsapp />

      {/* Conversational Chat Assistant */}
      <ChatWidget />

      {/* Floating Simulator CTA Button */}
      <button 
        onClick={() => handleNavigate('simulador')}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-white font-bold py-3 px-5 md:py-3.5 md:px-6 rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 border border-amber-400/30 select-none group font-sans text-xs md:text-sm tracking-wide shadow-orange-500/10"
        title="Simular Meu Seguro"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span className="hidden sm:inline">Simular meu Seguro</span>
        <span className="sm:hidden">Simular</span>
        <Sparkles className="w-4 h-4 text-amber-100 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Footnote Compliance Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
