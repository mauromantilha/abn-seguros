import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'seguros' | 'simulador' | 'saudesync', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <div className="flex items-center gap-3 select-none">
            {/* Símbolo Vetorial (Escudo Protetor) */}
            <svg className="w-11 h-11 flex-shrink-0" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 14C80 14 98 22 98 42C98 72 74 98 60 106C46 98 22 72 22 42C22 22 40 14 60 14Z" 
                    className="stroke-white" 
                    strokeWidth="8" 
                    strokeLinejoin="round" />
              <path d="M38 52L60 74L82 52" 
                    className="stroke-amber-400" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" />
              <line x1="60" y1="36" x2="60" y2="58" 
                    className="stroke-white" 
                    strokeWidth="6" 
                    strokeLinecap="round" />
              <circle cx="60" cy="30" r="5" 
                      className="fill-amber-400" />
            </svg>

            {/* Tipografia */}
            <div className="flex flex-col justify-center font-sans text-left">
              <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
                ABN <span className="text-amber-400">Seguros</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-1 leading-none font-heading">
                A sua vida, bem protegida.
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm">
            Corretora especialista em seguros integrados de alta performance. Protegemos vidas, famílias e blindamos a saúde financeira de empresas com transparência e tecnologia.
          </p>
        </div>

        {/* Links Column A */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Produtos</h4>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            <li>
              <button onClick={() => onNavigate('seguros')} className="hover:text-white transition-colors cursor-pointer text-left">
                Seguro de Vida
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('seguros')} className="hover:text-white transition-colors cursor-pointer text-left">
                Seguro Residencial
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('seguros')} className="hover:text-white transition-colors cursor-pointer text-left">
                Seguro Automóvel
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('seguros')} className="hover:text-white transition-colors cursor-pointer text-left">
                Cyber Seguros
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('seguros')} className="hover:text-white transition-colors cursor-pointer text-left">
                Saúde Empresarial
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column B */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Navegação</h4>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                Início
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home', 'sobre')} className="hover:text-white transition-colors cursor-pointer">
                Quem Somos
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('seguros')} className="hover:text-white transition-colors cursor-pointer">
                Coberturas
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('saudesync')} className="hover:text-white transition-colors cursor-pointer text-left">
                Gestão Contratos Saúde
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home', 'impacto')} className="hover:text-white transition-colors cursor-pointer">
                Nosso Impacto
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Contato & Canais</h4>
          <ul className="space-y-3.5 text-sm font-light text-slate-400">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-slate-500 font-semibold uppercase">Atendimento Comercial</span>
                <a href="tel:+551130039000" className="hover:text-white transition-colors">+55 (11) 3003-9000</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-slate-500 font-semibold uppercase">E-mail para Cotações</span>
                <a href="mailto:contato@abnseguros.com.br" className="hover:text-white transition-colors">contato@abnseguros.com.br</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-slate-500 font-semibold uppercase">Sede Administrativa</span>
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo/SP</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Compliance Footer */}
        <div className="text-left space-y-2 md:max-w-xl">
          <p className="text-[11px] text-slate-500 leading-relaxed font-light">
            © {new Date().getFullYear()} ABN Seguros. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-slate-600 leading-relaxed font-light">
            ABN Corretora de Seguros Ltda. • CNPJ 00.000.000/0001-00 • Registro SUSEP nº 10.203040.5
            As coberturas de seguro propostas são garantidas por seguradoras devidamente autorizadas pela SUSEP. A aceitação do seguro estará sujeita à análise do risco pelas seguradoras contratadas.
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-all shadow-lg hover:shadow-black/30 cursor-pointer flex-shrink-0"
          aria-label="Voltar para o topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
