import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'seguros' | 'simulador' | 'saudesync', sectionId?: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300">
      {/* Top Header Banner (Faixa Superior Âmbar) */}
      <div className="bg-amber-500 text-amber-950 py-2 px-6 text-[10px] md:text-xs font-bold tracking-wide flex justify-between items-center shadow-sm select-none">
        <div className="flex items-center gap-2">
          <span className="bg-amber-600 text-white px-2 py-0.5 rounded text-[9px] uppercase font-extrabold">SUSEP</span>
          <span>Corretagem Autorizada SUSEP sob Registro Oficial</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Segunda a Sexta: 08:00 às 18:00</span>
          <span>|</span>
          <span>Atendimento Nacional</span>
        </div>
      </div>

      <header 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm' 
            : 'py-5 bg-slate-50/70 backdrop-blur-xs border-b border-slate-200/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 select-none cursor-pointer group"
          >
            {/* Símbolo Vetorial (Escudo Protetor) */}
            <svg className="w-11 h-11 flex-shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 14C80 14 98 22 98 42C98 72 74 98 60 106C46 98 22 72 22 42C22 22 40 14 60 14Z" 
                    className="stroke-blue-900" 
                    strokeWidth="8" 
                    strokeLinejoin="round" />
              <path d="M38 52L60 74L82 52" 
                    className="stroke-amber-500" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" />
              <line x1="60" y1="36" x2="60" y2="58" 
                    className="stroke-blue-900" 
                    strokeWidth="6" 
                    strokeLinecap="round" />
              <circle cx="60" cy="30" r="5" 
                      className="fill-amber-500" />
            </svg>

            {/* Tipografia */}
            <div className="flex flex-col justify-center font-sans text-left">
              <span className="text-2xl font-extrabold text-blue-900 tracking-tight leading-none">
                ABN <span className="text-amber-500">Seguros</span>
              </span>
              <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase mt-1 leading-none font-heading">
                A sua vida, bem protegida.
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Início
            </button>
            <button 
              onClick={() => onNavigate('home', 'sobre')}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Quem Somos
            </button>
            <button 
              onClick={() => onNavigate('seguros')}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Coberturas
            </button>
            <button 
              onClick={() => onNavigate('saudesync')}
              className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Gestão Contratos Saúde
            </button>
            <button 
              onClick={() => onNavigate('home', 'impacto')}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Nosso Impacto
            </button>
          </nav>

          {/* CTA & Mobile Toggler Container */}
          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <div className="hidden sm:block">
              <Button 
                onClick={() => onNavigate('simulador')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-5 py-2.5 h-auto rounded-full shadow-md shadow-indigo-600/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Simulação Express
              </Button>
            </div>

            {/* Hamburger / Close Menu Toggler */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700 focus:outline-none cursor-pointer"
              aria-label="Alternar Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/60 shadow-lg flex flex-col p-6 space-y-6 lg:hidden animate-in fade-in slide-in-from-top-5 duration-200 overflow-y-auto ${
          isScrolled ? 'top-[92px]' : 'top-[108px]'
        }`}>
          <nav className="flex flex-col gap-4 text-left">
            <button 
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors py-2 border-b border-slate-100 text-left cursor-pointer"
            >
              Início
            </button>
            <button 
              onClick={() => {
                onNavigate('home', 'sobre');
                setIsMobileMenuOpen(false);
              }}
              className="text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors py-2 border-b border-slate-100 text-left cursor-pointer"
            >
              Quem Somos
            </button>
            <button 
              onClick={() => {
                onNavigate('seguros');
                setIsMobileMenuOpen(false);
              }}
              className="text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors py-2 border-b border-slate-100 text-left cursor-pointer"
            >
              Coberturas
            </button>
            <button 
              onClick={() => {
                onNavigate('saudesync');
                setIsMobileMenuOpen(false);
              }}
              className="text-base font-bold text-indigo-600 hover:text-indigo-700 transition-colors py-2 border-b border-slate-100 text-left cursor-pointer"
            >
              Gestão Contratos Saúde
            </button>
            <button 
              onClick={() => {
                onNavigate('home', 'impacto');
                setIsMobileMenuOpen(false);
              }}
              className="text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors py-2 text-left cursor-pointer"
            >
              Nosso Impacto
            </button>
          </nav>
          
          <div className="pt-4 flex flex-col gap-3">
            <div className="sm:hidden">
              <Button 
                onClick={() => {
                  onNavigate('simulador');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-md cursor-pointer"
              >
                Simulação Express
              </Button>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider text-center select-none">
              Corretagem Autorizada SUSEP
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
