import { useState } from 'react';
import { ShieldAlert, ShieldCheck, User, Building, XCircle, CheckCircle2 } from 'lucide-react';

interface ImpactScenario {
  title: string;
  situation: string;
  withoutShield: {
    title: string;
    consequences: string[];
    lossType: string;
  };
  withShield: {
    title: string;
    consequences: string[];
    gainType: string;
  };
}

export default function ImpactSection() {
  const [activeProfile, setActiveProfile] = useState<'PF' | 'PJ'>('PF');

  const scenarios: Record<'PF' | 'PJ', ImpactScenario> = {
    PF: {
      title: 'Cenário: Emergência de Saúde Familiar',
      situation: 'Um membro da família necessita de cirurgia de urgência e internação em hospital de referência.',
      withoutShield: {
        title: 'Sem Seguro Saúde & Vida',
        lossType: 'Impacto Financeiro e Emocional Severo',
        consequences: [
          'Esgotamento rápido das reservas financeiras e poupanças.',
          'Necessidade de contratar empréstimos com altos juros.',
          'Espera excessiva e angústia por atendimento em filas públicas.',
          'Estresse psicológico que prejudica a recuperação do paciente.'
        ]
      },
      withShield: {
        title: 'Com Proteção ABN Seguros',
        gainType: 'Tranquilidade e Foco na Recuperação',
        consequences: [
          'Internação imediata nos melhores hospitais credenciados do país.',
          'Custos médicos e cirúrgicos totalmente cobertos pelo plano.',
          'Reembolso ágil para consultas e exames fora da rede.',
          'Seguro de vida garante indenização complementar em vida.'
        ]
      }
    },
    PJ: {
      title: 'Cenário: Ataque de Ransomware (Sequestro de Dados)',
      situation: 'Os servidores da empresa são criptografados por hackers, paralisando a operação e exigindo resgate.',
      withoutShield: {
        title: 'Sem Cyber Seguro & Patrimonial',
        lossType: 'Risco Crítico de Falência e Processos',
        consequences: [
          'Paralisação das operações por semanas (perda total de faturamento).',
          'Multas pesadas devido à quebra de privacidade da LGPD.',
          'Prejuízo à reputação da marca perante clientes e parceiros.',
          'Custos astronômicos com perícia de TI e reconstrução de sistemas.'
        ]
      },
      withShield: {
        title: 'Com Proteção ABN Seguros',
        gainType: 'Resiliência e Continuidade do Negócio',
        consequences: [
          'Equipe de resposta a crises de TI acionada de forma imediata.',
          'Custos de restauração de sistemas e dados integralmente indenizados.',
          'Lucros cessantes (despesas fixas e lucros pausados) cobertos pelo seguro.',
          'Defesa jurídica e pagamento de penalidades administrativas garantidos.'
        ]
      }
    }
  };

  const currentScenario = scenarios[activeProfile];

  return (
    <section id="impacto" className="py-28 relative overflow-hidden bg-[#080d1a] text-white border-y border-slate-900">
      {/* Decorative inner glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Prevenção Operacional</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white">O Impacto Real de Estar Protegido</h2>
          <p className="text-slate-400 font-light text-base md:text-lg">
            Um imprevisto não precisa se tornar uma catástrofe. Veja a diferença prática que a proteção de seguros faz na estabilidade de uma família ou empresa.
          </p>
        </div>

        {/* Profile Selector */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveProfile('PF')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border transition-all duration-300 font-heading font-semibold text-sm cursor-pointer ${
              activeProfile === 'PF'
                ? 'bg-indigo-500/10 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            Impacto no Dia a Dia (Pessoal)
          </button>
          <button
            onClick={() => setActiveProfile('PJ')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border transition-all duration-300 font-heading font-semibold text-sm cursor-pointer ${
              activeProfile === 'PJ'
                ? 'bg-teal-500/10 border-teal-500/50 text-white shadow-lg shadow-teal-500/10'
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            Impacto Corporativo (Empresarial)
          </button>
        </div>

        {/* Comparison Box */}
        <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-6 md:p-10 shadow-2xl space-y-8 backdrop-blur-md">
          {/* Situation Title */}
          <div className="text-left border-b border-white/5 pb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Caso Prático Analisado</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{currentScenario.title}</h3>
            <p className="text-slate-300 font-light mt-2 text-sm md:text-base italic">"{currentScenario.situation}"</p>
          </div>

          {/* Dual Columns Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Column A: Without Protection */}
            <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-rose-400 mb-6">
                  <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/25">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">{currentScenario.withoutShield.title}</h4>
                    <span className="text-[10px] uppercase font-bold text-rose-400/80">{currentScenario.withoutShield.lossType}</span>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  {currentScenario.withoutShield.consequences.map((cons, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-rose-500/60 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-light text-slate-300 leading-relaxed">{cons}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-rose-500/10">
                <span className="text-xs text-rose-400 font-semibold">Resultado: Alta exposição a endividamento e quebra de fluxo.</span>
              </div>
            </div>

            {/* Column B: With Protection */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-emerald-400 mb-6">
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/25">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">{currentScenario.withShield.title}</h4>
                    <span className="text-[10px] uppercase font-bold text-emerald-400/80">{currentScenario.withShield.gainType}</span>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  {currentScenario.withShield.consequences.map((cons, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500/80 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-light text-slate-300 leading-relaxed">{cons}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-500/10">
                <span className="text-xs text-emerald-400 font-semibold">Resultado: Resolução ágil e estabilidade financeira preservada.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
