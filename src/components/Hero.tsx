import { ShieldCheck, ArrowRight, Activity, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onNavigate: (page: 'home' | 'seguros' | 'simulador', sectionId?: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-white">
      {/* Decorative Glow Color Clouds (glow effects) */}
      <div className="glow-indigo top-10 left-10 opacity-70" />
      <div className="glow-amber bottom-10 right-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/60 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-extrabold tracking-wider font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 uppercase">
              ABN Seguros • Corretora Multiseguros
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 leading-tight">
            Protegemos o seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              hoje
            </span>
            ,<br />
            garantimos o seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
              amanhã
            </span>
            .
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-xl font-light leading-relaxed">
            Soluções inovadoras desenhadas sob medida para proteger sua família, seus bens e blindar a saúde financeira da sua empresa contra os imprevistos do mercado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto">
            <Button
              onClick={() => onNavigate('simulador')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-6 text-sm rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              Simular Seguros
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onNavigate('seguros')}
              variant="outline"
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold px-8 py-6 text-sm rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
            >
              Conhecer Coberturas
            </Button>
          </div>

          {/* Core Trust Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 w-full">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center gap-1.5">
                <Users className="w-5 h-5 text-orange-500 hidden sm:inline" />
                10k+
              </span>
              <span className="text-xs text-slate-500 mt-1">Clientes Atendidos</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center gap-1.5">
                <Activity className="w-5 h-5 text-teal-500 hidden sm:inline" />
                99%
              </span>
              <span className="text-xs text-slate-500 mt-1">De Satisfação</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-indigo-500 hidden sm:inline" />
                24h
              </span>
              <span className="text-xs text-slate-500 mt-1">Suporte e Sinistros</span>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Mockup */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
          <div className="w-72 h-72 md:w-96 md:h-96 relative flex items-center justify-center">
            {/* Spinning Outer Rings (Teal / Indigo) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/60 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-indigo-200/50 animate-[spin_20s_linear_infinite_reverse]" />
            
            {/* Pulsing Back Glow */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-orange-400/10 to-indigo-500/10 blur-2xl animate-pulse" />

            {/* Core Shield Dashboard Card (Clean White) */}
            <div className="absolute w-60 h-72 md:w-80 md:h-96 rounded-[32px] bg-tech-pattern border border-slate-100 p-6 flex flex-col justify-between shadow-xl shadow-slate-200/60 z-10 overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Proteção Ativa</h4>
                  <p className="text-base font-bold text-slate-800 mt-0.5">ABN SafeShield™</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-600">Online</span>
                </div>
              </div>

              {/* Central Abstract Shield Visualization */}
              <div className="my-auto flex flex-col items-center justify-center relative">
                {/* CSS Shield Drawing */}
                <div className="w-20 h-24 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-b-full flex items-center justify-center shadow-lg shadow-indigo-600/20 relative group-hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Status Operacional</span>
                  <span className="text-sm font-bold text-slate-800 mt-0.5">100% Protegido</span>
                </div>
              </div>

              {/* Lower Stats Row */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Sinistralidade</span>
                  <span className="text-xs font-bold text-slate-700">Mínima</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Segurança</span>
                  <span className="text-xs font-bold text-slate-700">Grau Máximo</span>
                </div>
              </div>
            </div>

            {/* Floating Mini Custom Badges */}
            <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-tech-pattern border border-slate-100 shadow-md animate-[bounce_6s_ease-in-out_infinite] z-20 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              <span className="text-xs font-bold text-slate-800">Seguro Vida</span>
            </div>
            
            <div className="absolute bottom-12 -right-6 p-3 rounded-2xl bg-tech-pattern border border-slate-100 shadow-md animate-[bounce_8s_ease-in-out_infinite_2s] z-20 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span className="text-xs font-bold text-slate-800">Cyber Seguros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
