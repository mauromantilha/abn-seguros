import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

interface InsuranceCardItem {
  id: string;
  title: string;
  slogan: string;
  image: string;
}

interface SegurosPageProps {
  onSelectProduct: (id: string) => void;
  onSimulate: (id: string, category: 'PF' | 'PJ') => void;
}

export default function SegurosPage({ onSelectProduct, onSimulate }: SegurosPageProps) {
  
  const insurances: InsuranceCardItem[] = [
    {
      id: 'vida',
      title: 'Seguros de Vida',
      slogan: 'Seu amor é eterno, sua proteção também pode ser.',
      image: '/happy_family.png'
    },
    {
      id: 'saude',
      title: 'Planos de Saúde',
      slogan: 'Bem-estar e segurança para cada batida do seu coração.',
      image: '/happy_family.png'
    },
    {
      id: 'automovel',
      title: 'Seguro Auto',
      slogan: 'Seu carro protegido, sua mente tranquila.',
      image: '/car_insurance.png'
    },
    {
      id: 'residencial',
      title: 'Seguro Residencial',
      slogan: 'Seu lar, seu refúgio, nossa proteção.',
      image: '/home_insurance.png'
    },
    {
      id: 'odontologico',
      title: 'Planos Odontológicos',
      slogan: 'Cuide do seu sorriso, nós cuidamos de você.',
      image: '/happy_family.png'
    },
    {
      id: 'patrimoniais',
      title: 'Seguros Patrimoniais',
      slogan: 'Sua conquista segura, seu futuro protegido.',
      image: '/business_team.png'
    },
    {
      id: 'agronegocio',
      title: 'Seguro Agronegócio',
      slogan: 'Sua colheita farta, nossa proteção forte.',
      image: '/agro_insurance.png'
    },
    {
      id: 'cyber',
      title: 'Cyber Seguros',
      slogan: 'Sua segurança digital, nossa blindagem.',
      image: '/business_team.png'
    },
    {
      id: 'previdencia',
      title: 'Previdência Privada',
      slogan: 'Seu futuro planejado, sua tranquilidade garantida.',
      image: '/happy_family.png'
    }
  ];

  const handleQuoteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Avoid card click triggering details
    const category = (id === 'patrimoniais' || id === 'agronegocio' || id === 'cyber') ? 'PJ' : 'PF';
    onSimulate(id, category);
  };

  return (
    <section className="pt-36 pb-24 md:pt-40 md:pb-28 relative overflow-hidden bg-transparent min-h-[90vh]">
      {/* Decorative Glow Color Clouds (glow effects) */}
      <div className="glow-indigo -top-20 left-10 opacity-70" />
      <div className="glow-amber bottom-10 right-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left space-y-16">
        
        {/* Intro Layout (Split 2-column or structured block) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-slate-200 pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                Portfólio Completo ABN
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
              Nosso Portfólio de Seguros
            </h1>
            <div className="space-y-4 text-slate-600 font-light text-sm md:text-base leading-relaxed max-w-4xl">
              <p>
                Na ABN Seguros, entendemos que o maior patrimônio não é material, mas sim a sua tranquilidade e a segurança de quem você ama. Por isso, construímos um portfólio completo de seguros para proteger cada aspecto da sua vida, desde os bens que você conquistou até a saúde e o futuro da sua família.
              </p>
              <p>
                Nossa missão é ir além da simples cotação. Com a experiência de mais de 25 anos no mercado, nosso time de especialistas está pronto para oferecer uma consultoria completa, encontrando a proteção ideal e sob medida para você. Aqui, cada apólice é um passo a mais em direção à sua paz de espírito.
              </p>
            </div>
          </div>

          {/* Quick Action Simulator box */}
          <div className="lg:col-span-4 bg-tech-pattern border border-slate-100 p-6 md:p-8 rounded-[32px] shadow-lg shadow-slate-200/40 text-center space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest block">Cotação Rápida</span>
              <h3 className="font-heading font-bold text-slate-800 text-lg">Solicite sua Cotação</h3>
              <p className="text-slate-500 text-xs font-light leading-relaxed">
                Descubra como podemos cuidar do que realmente importa para você. Preencha nosso formulário em 1 minuto.
              </p>
            </div>
            <Button
              onClick={(e) => handleQuoteClick(e, 'vida')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 w-full rounded-2xl shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              Simular Cotação
            </Button>
          </div>
        </div>

        {/* 9 Cards Grid */}
        <div className="space-y-8">
          <h2 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Clique para explorar cada ramo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insurances.map((item) => (
              <Card 
                key={item.id} 
                onClick={() => onSelectProduct(item.id)}
                className="bg-tech-pattern border border-slate-100 shadow-sm rounded-[32px] overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-[390px]"
              >
                {/* Clickable Image Box with Zoom Effect */}
                <div className="h-44 overflow-hidden relative border-b border-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>

                {/* Card Header Content */}
                <CardHeader className="p-6 pb-2 text-left space-y-2">
                  <CardTitle className="font-heading text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs font-light leading-relaxed h-10 overflow-hidden line-clamp-2">
                    {item.slogan}
                  </CardDescription>
                </CardHeader>

                {/* Footer Buttons */}
                <CardContent className="p-6 pt-0 flex gap-3 border-t border-slate-100/60 mt-auto">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl h-10 text-xs font-semibold cursor-pointer"
                  >
                    Saiba mais...
                  </Button>
                  
                  <Button
                    onClick={(e) => handleQuoteClick(e, item.id)}
                    className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 rounded-xl h-10 text-xs font-bold shadow-none border-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Cotar
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
