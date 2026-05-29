import { History, Award, ShieldCheck, Heart, Home } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="sobre" className="py-28 relative overflow-hidden bg-white bg-hexagons border-b border-slate-100">
      {/* Decorative Glow Color Clouds (glow effects) */}
      <div className="glow-indigo -top-20 -left-20 opacity-60" />
      <div className="glow-teal bottom-0 right-0 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        
        {/* Left Column: Visual Stack */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div className="relative w-full max-w-md h-[400px] md:h-[450px]">
            {/* Background Decorative Blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/40 to-rose-100/40 blur-3xl pointer-events-none -z-10" />

            {/* Behind Card: Business/Corporate Team */}
            <div className="absolute right-0 bottom-4 w-64 h-64 md:w-72 md:h-72 rounded-[32px] overflow-hidden border-4 border-white shadow-xl shadow-slate-200/50 z-10 transform translate-x-4 translate-y-4 hover:translate-x-2 hover:translate-y-2 transition-transform duration-500">
              <img 
                src="/business_team.png" 
                alt="Equipe ABN Seguros" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Front Card: Happy Family */}
            <div className="absolute left-0 top-0 w-72 h-72 md:w-80 md:h-80 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl shadow-slate-300/60 z-20 hover:-translate-y-2 transition-transform duration-500">
              <img 
                src="/happy_family.png" 
                alt="Família Protegida pela ABN" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badge: Years of Experience */}
            <div className="absolute -top-4 right-12 bg-indigo-600 text-white p-4 rounded-3xl shadow-xl shadow-indigo-600/20 z-30 flex flex-col items-center justify-center animate-[bounce_8s_ease-in-out_infinite]">
              <History className="w-5 h-5 text-indigo-200 mb-0.5" />
              <span className="text-sm font-extrabold font-heading">Desde 2017</span>
            </div>

            {/* Floating Badge: Founder since 1995 */}
            <div className="absolute bottom-8 left-4 bg-white border border-slate-100 p-4 rounded-3xl shadow-xl shadow-slate-200/80 z-30 flex items-center gap-3">
              <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expertise</span>
                <span className="text-xs font-bold text-slate-800">Desde 1995 no Setor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copywriting content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Tradição e Confiança
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
            ABN Seguros, Tradição e Confiança a Serviço da Sua Proteção
          </h2>

          <div className="space-y-4 text-slate-600 font-light text-sm md:text-base leading-relaxed">
            <p>
              Na ABN Seguros, acreditamos que a proteção do seu patrimônio e da sua família vai muito além de uma simples apólice. É a tranquilidade de saber que você pode contar com quem entende do assunto para guiar suas escolhas mais importantes. Desde 2017, nos dedicamos a construir uma história de excelência e confiança, consolidando-nos como a parceira ideal para a sua segurança.
            </p>
            <p>
              Nossa fundação é o reflexo de uma trajetória de sucesso e profundo conhecimento do mercado. Nosso fundador, <strong className="text-slate-900 font-semibold">Adomi Barbosa Nunes</strong>, atua no setor de seguros desde <strong className="text-slate-900 font-semibold">1995</strong>, acumulando uma vasta e inestimável experiência em instituições de peso como <strong className="text-slate-900 font-semibold">Banco Bradesco, Bradesco Vida e Previdência e Bradesco Seguros</strong>. Essa bagagem nos permite oferecer uma visão estratégica e uma consultoria de altíssimo nível, sempre focada nas suas necessidades.
            </p>
            <p>
              Contamos com um time de corretores altamente qualificados e em constante atualização, prontos para entender seu perfil e encontrar as melhores soluções disponíveis no mercado. Nossa especialidade se estende por um portfólio completo de produtos, garantindo que cada área da sua vida esteja protegida:
            </p>
          </div>

          {/* Grouped Bullet lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 w-full">
            <div className="flex gap-3 text-left">
              <div className="p-2 bg-rose-50 rounded-xl text-rose-500 h-fit">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-heading">Proteção Pessoal & Familiar</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Planos de Saúde e Odontológicos, Seguros de Vida e Previdência Privada.
                </p>
              </div>
            </div>

            <div className="flex gap-3 text-left">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500 h-fit">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-heading">Segurança Patrimonial</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Seguros Residenciais, Patrimoniais e proteção completa para seu Automóvel.
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 font-light text-sm italic pt-4">
            "Na ABN Seguros, você não contrata apenas um seguro; você ganha um parceiro que está ao seu lado para construir um futuro mais seguro e tranquilo."
          </p>
        </div>

      </div>
    </section>
  );
}
