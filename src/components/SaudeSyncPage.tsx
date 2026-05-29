import { useState } from 'react';
import { 
  ArrowLeft, AlertCircle, CheckCircle, Brain, 
  ArrowRight, Terminal
} from 'lucide-react';
import { Button } from './ui/button';

interface SaudeSyncPageProps {
  onBack: () => void;
}

export default function SaudeSyncPage({ onBack }: SaudeSyncPageProps) {
  const [activeTab, setActiveTab] = useState<string>('01');
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoCompany, setDemoCompany] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const tabsData = [
    {
      id: '01',
      title: 'Visão Geral',
      description: 'Score de risco (0–100), nível crítico/alto/médio/baixo, fatores ponderados e KPIs principais da fatura.',
      metrics: 'Score de Risco: 76/100 (Alto)',
      kpis: ['Fatura Analisada: R$ 420.000', 'Economia Detectada: R$ 38.450', 'Erros Identificados: 24']
    },
    {
      id: '02',
      title: 'Faixas Etárias',
      description: 'Distribuição de titulares e dependentes por faixa ANS. Identificação automática de cobranças em faixas etárias incorretas.',
      metrics: '4 divergências encontradas',
      kpis: ['ANS Faixas Auditadas: 10/10', 'Divergência Etária: R$ 8.900', 'Titulares impactados: 3']
    },
    {
      id: '03',
      title: 'Custo por Departamento',
      description: 'Detalhamento do custo total, esperado, anomalias e participação percentual por centro de custo.',
      metrics: 'Engenharia: Maior custo (32%)',
      kpis: ['Vendas: R$ 112.000', 'Operações: R$ 145.000', 'Erros em Vendas: R$ 12.400']
    },
    {
      id: '04',
      title: 'Top Beneficiários',
      description: 'Ranking por custo faturado com CPF, tipo (titular/dependente), meses e status de vínculo cadastral.',
      metrics: 'Top 5 concentram 18% do custo',
      kpis: ['Titular A: R$ 14.500/mês', 'Dependente B: R$ 12.800/mês', 'Anomalias no Top 10: R$ 18.200']
    },
    {
      id: '05',
      title: 'Vidas Fantasma',
      description: 'Lista de beneficiários desligados ainda cobrados pela operadora, com indicação exata de dias de atraso na baixa.',
      metrics: '6 Vidas Fantasma Ativas',
      kpis: ['Desligado há 92 dias: R$ 11.200', 'Desligado há 45 dias: R$ 4.500', 'Cobrança indevida total: R$ 18.700']
    },
    {
      id: '06',
      title: 'Absenteísmo',
      description: 'Monitoramento de funcionários em licença ou afastamento temporário com plano de saúde ativo, avaliando custos.',
      metrics: '8 colaboradores afastados',
      kpis: ['Custo total afastados: R$ 24.300', 'Licença Maternidade: R$ 9.100', 'Licença Médica INSS: R$ 15.200']
    },
    {
      id: '07',
      title: 'Projeção de Custo',
      description: 'Cálculo do impacto financeiro de mudanças de faixa etária futuras, com variação mensal e anual estimada.',
      metrics: 'Alta projetada de +4.8% no custo',
      kpis: ['Próximos 6 meses: +R$ 14.800', 'Impacto anualizado: +R$ 29.600', 'Beneficiários mudando de faixa: 8']
    },
    {
      id: '08',
      title: 'Sinistralidade L/R',
      description: 'Índice de sinistralidade (Loss Ratio) com tendência histórica e breakdown por categoria de evento de saúde.',
      metrics: 'Sinistralidade Média: 82%',
      kpis: ['Consultas: 14% do custo', 'Internações: 58% do custo', 'Exames de Imagem: 28% do custo']
    },
    {
      id: '09',
      title: 'Altos Utilizadores',
      description: 'Mapeamento de beneficiários com maior valor sinistrado (custo catastrófico), baseado nos relatórios analíticos da operadora.',
      metrics: '3 Casos de Alta Utilização',
      kpis: ['Paciente Internado A: R$ 124.000', 'Tratamento Crônico B: R$ 68.000', 'Apoio de Gestão de Saúde ABN ativo']
    }
  ];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoPhone || !demoEmail || !demoCompany) return;
    setFormSubmitted(true);
    setTimeout(() => {
      // Open WhatsApp pre-filled link
      const message = `Olá ABN Seguros! Tenho interesse em agendar uma demonstração do SaudeSync.
      
*Nome:* ${demoName}
*Empresa:* ${demoCompany}
*Telefone:* ${demoPhone}
*E-mail:* ${demoEmail}`;
      window.open(`https://wa.me/5511944084097?text=${encodeURIComponent(message)}`, '_blank');
      // Reset form
      setDemoName('');
      setDemoPhone('');
      setDemoEmail('');
      setDemoCompany('');
      setShowDemoForm(false);
      setFormSubmitted(false);
    }, 1200);
  };

  return (
    <section className="pt-36 pb-24 md:pt-40 md:pb-28 relative overflow-hidden bg-transparent min-h-[90vh]">
      {/* Decorative Glow Color Clouds */}
      <div className="glow-indigo -top-20 left-10 opacity-70" />
      <div className="glow-amber bottom-10 right-10 opacity-60" />
      <div className="glow-teal top-1/2 left-1/3 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium mb-12 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold font-heading shadow-sm">
              <Brain className="w-3.5 h-3.5" />
              Gestão de plano de saúde com IA que recupera dinheiro.
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
              Otimize sua fatura de saúde com inteligência artificial
            </h1>
            
            <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
              Sua empresa paga por beneficiários inexistentes, faixas etárias erradas e cobranças fora do contrato. O <strong className="text-slate-800 font-semibold">SaudeSync</strong> audita cada linha da fatura, detecta as anomalias e gera as contestações automaticamente.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                onClick={() => setShowDemoForm(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl h-13 px-8 shadow-lg shadow-indigo-600/10 cursor-pointer"
              >
                Agendar demonstração
              </Button>
              <a 
                href="#modulos"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 text-sm font-bold transition-colors py-2 px-4"
              >
                Ver módulos
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Segmento</span>
                <span className="text-sm font-semibold text-slate-700 mt-1">Empresas · 30+ vidas</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Ideal para</span>
                <span className="text-sm font-semibold text-slate-700 mt-1">Corretoras de saúde</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tecnologia</span>
                <span className="text-sm font-semibold text-slate-700 mt-1">Anomalias por IA</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Dashboard Mockup */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-teal-500/5 blur-3xl pointer-events-none -z-10" />
            <div className="w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.01] relative z-10">
              <img 
                src="/saudesync_dashboard.png" 
                alt="SaudeSync AI Dashboard Auditing" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: THE INVISIBLE PROBLEM */}
        <div className="bg-white bg-hexagons border border-slate-200/60 rounded-[32px] p-8 md:p-12 mb-24 shadow-2xl shadow-slate-200/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-rose-500 tracking-widest uppercase flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              O Problema Invisível
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 leading-tight">
              Você paga toda fatura. A operadora cobra o que quer.
            </h2>
            <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
              A maioria das empresas aprova a fatura do plano de saúde sem questionar. Sem sistema, auditar centenas de linhas manualmente é inviável — e a operadora sabe disso.
            </p>
            <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
              Ghost life, faixas etárias erradas e divergências contratuais somadas representam entre <strong className="text-slate-800 font-bold">5% e 15%</strong> do valor total pago. Em empresas com 100 vidas, isso passa de <strong className="text-slate-800 font-bold">R$ 50 mil por ano</strong> perdidos silenciosamente.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <div className="bg-rose-50/50 border border-rose-100/60 p-5 rounded-2xl text-left">
              <span className="text-3xl font-extrabold text-rose-600 font-heading block">5–15%</span>
              <span className="text-xs text-slate-500 font-medium mt-1.5 block leading-normal">
                do valor da fatura é cobrado indevidamente em média pelas operadoras de saúde.
              </span>
            </div>
            <div className="bg-indigo-50/50 border border-indigo-100/60 p-5 rounded-2xl text-left">
              <span className="text-3xl font-extrabold text-indigo-600 font-heading block">9 abas</span>
              <span className="text-xs text-slate-500 font-medium mt-1.5 block leading-normal">
                de análise de risco detalhada no dashboard de inteligência comercial.
              </span>
            </div>
            <div className="bg-teal-50/50 border border-teal-100/60 p-5 rounded-2xl text-left">
              <span className="text-3xl font-extrabold text-teal-600 font-heading block">100%</span>
              <span className="text-xs text-slate-500 font-medium mt-1.5 block leading-normal">
                das contestações geradas por IA com evidências e relatórios em PDF.
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: PIPELINE DE FATURAS */}
        <div className="space-y-12 mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Fluxo Automatizado</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900">Pipeline de Faturas</h2>
            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              Upload do PDF. Auditoria automática completa. Faça upload da fatura da operadora — qualquer formato. O SaudeSync extrai o texto via OCR, identifica a operadora e detecta 4 tipos de anomalias críticas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ghost Life */}
            <div className="human-card p-6 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-heading text-xl shadow-sm">
                  👻
                </div>
                <h3 className="font-heading font-bold text-base text-slate-800 group-hover:text-indigo-600 transition-colors">
                  Ghost Life
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Beneficiário faturado que não existe no cadastro ou já foi desligado. O sistema cruza automaticamente cada CPF cobrado com o histórico de vínculos ativos.
                </p>
              </div>
            </div>

            {/* Faixa Etária Incorreta */}
            <div className="human-card p-6 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-heading text-xl shadow-sm">
                  📅
                </div>
                <h3 className="font-heading font-bold text-base text-slate-800 group-hover:text-indigo-600 transition-colors">
                  Faixa Etária
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  A faixa cobrada é comparada com a calculada pela data de nascimento do beneficiário. Qualquer divergência é marcada com o impacto financeiro exato.
                </p>
              </div>
            </div>

            {/* Divergência Contratual */}
            <div className="human-card p-6 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-heading text-xl shadow-sm">
                  📋
                </div>
                <h3 className="font-heading font-bold text-base text-slate-800 group-hover:text-indigo-600 transition-colors">
                  Divergência Contratual
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  O valor cobrado é comparada com a tabela de preços extraída do contrato (via OCR + IA). Itens fora do contrato geram alerta com valor da diferença.
                </p>
              </div>
            </div>

            {/* Duplicata */}
            <div className="human-card p-6 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center font-heading text-xl shadow-sm">
                  🔁
                </div>
                <h3 className="font-heading font-bold text-base text-slate-800 group-hover:text-indigo-600 transition-colors">
                  Duplicata
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Cobranças duplicadas: mesmo CPF em duas ou mais linhas da mesma fatura. Conta com deduplicação por hash MD5 para evitar qualquer reprocessamento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE RISK DASHBOARD (9 DIMENSÕES) */}
        <div className="space-y-10 mb-24">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Dashboard Integrado</span>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">Análise de Risco</h2>
            <p className="text-slate-500 font-light text-sm leading-relaxed">
              Painel de inteligência comercial com 9 dimensões analíticas exclusivas. Tenha um score de risco de 0 a 100, nível de exposição e KPIs que a operadora de saúde não fornece.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Tabs Selector list */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto max-h-[480px] pb-3 lg:pb-0 pr-2 scrollbar-thin flex-nowrap whitespace-nowrap lg:whitespace-normal">
              {tabsData.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 flex-shrink-0 lg:flex-shrink ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-heading text-xs ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.id}
                  </span>
                  <div>
                    <h4 className="font-heading text-sm font-bold leading-tight">{tab.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Details Panel Viewer */}
            <div className="lg:col-span-8 bg-slate-900 text-slate-100 rounded-[32px] p-8 md:p-10 shadow-2xl flex flex-col justify-between border border-slate-800/80 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              {(() => {
                const tab = tabsData.find(t => t.id === activeTab) || tabsData[0];
                return (
                  <div className="space-y-8 h-full flex flex-col justify-between relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2.5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
                        <Terminal className="w-4 h-4 text-indigo-400" />
                        Aba {tab.id} • Dimensão Atuarial
                      </div>
                      
                      <h3 className="font-heading text-2xl font-extrabold text-white">
                        {tab.title}
                      </h3>
                      
                      <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed">
                        {tab.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-sm font-semibold text-emerald-400">{tab.metrics}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                        {tab.kpis.map((kpi, idx) => (
                          <div key={idx} className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col text-left">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Métrica {idx + 1}</span>
                            <span className="text-xs font-bold text-white mt-1.5 leading-snug">{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* SECTION 5: PLATAFORMA COMPLETA (MÓDULOS DE PONTA A PONTA) */}
        <div id="modulos" className="space-y-12 mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Todos os Módulos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900">Plataforma Completa</h2>
            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              Do cadastro de funcionários ao processamento de sinistralidade. O SaudeSync entrega a gestão completa do plano de saúde corporativo, eliminando planilhas manuais e perdas financeiras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* RH e Funcionários */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  👥
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">RH e Funcionários</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Importação de funcionários via Excel com mapeamento automático por IA. Cadastro de beneficiários, dependentes e desligamentos históricos de vínculos.
                </p>
              </div>
            </div>

            {/* Contratos e Beneficiários */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  📄
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Contratos e Tabelas</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Cadastro de contratos com vigência e coberturas. Extração automatizada da tabela de preços contratada com as operadoras via OCR + IA (Gemini).
                </p>
              </div>
            </div>

            {/* Auditoria de Faturas */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  🔍
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Auditoria de Faturas</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Upload PDF da operadora → extração inteligente de texto → detecção automatizada de Ghost Life, faixa etária incorreta, divergência contratual e duplicatas.
                </p>
              </div>
            </div>

            {/* Contestações */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  ⚖️
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Contestações por IA</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Geração automática de cartas de contestação em linguagem técnica e formal por inteligência artificial. Upload das evidências e controle do valor recuperado.
                </p>
              </div>
            </div>

            {/* Sinistralidade */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  📊
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Sinistralidade Histórica</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Upload dos relatórios PDF por contrato de saúde. Processamento assíncrono com OCR, estruturação e histórico de utilização consolidado por competência.
                </p>
              </div>
            </div>

            {/* Alertas Automáticos */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  🔔
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Alertas Inteligentes</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Alertas em lote por vidas fantasma, mudanças críticas de sinistro ou desvios contratuais graves com resumo prático na página inicial da plataforma.
                </p>
              </div>
            </div>

            {/* Multi-tenancy */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center font-heading text-lg shadow-sm">
                  🔑
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Multi-tenancy Isolado</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Subdomínio por empresa (`{'{'}slug{'}'}.saudesync.app`), esquema de dados exclusivo no PostgreSQL e autenticação isolada de acesso corporativo.
                </p>
              </div>
            </div>

            {/* Advisor API */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  🌐
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Advisor API</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Para corretoras de saúde: painel integrado com visão consolidada dos clientes, sinistralidade agregada, prazos de renovação e alertas em um único endpoint.
                </p>
              </div>
            </div>

            {/* IA Integrada */}
            <div className="bg-white border border-slate-200/50 p-7 rounded-[28px] text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center font-heading text-lg shadow-sm">
                  🤖
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Inteligência Artificial</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Uso do Gemini 2.0 Flash para leitura técnica de faturas e contratos, integrado ao Google Cloud Vision para OCR e processamento de sinistro por IA.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA: AGENDE SUA DEMONSTRAÇÃO */}
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white p-10 md:p-16 shadow-2xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Demonstração Gratuita</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white leading-tight">
              Recupere a saúde financeira do seu plano corporativo
            </h2>
            <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Veja em tempo real como o SaudeSync pode identificar inconsistências e economizar milhares de reais na sua próxima fatura de plano de saúde.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowDemoForm(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold h-12 px-8 rounded-2xl cursor-pointer shadow-lg hover:shadow-orange-500/20"
              >
                Agendar demonstração
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* DEMO FORM DIALOG/MODAL */}
      {showDemoForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop glass blur */}
          <div 
            onClick={() => setShowDemoForm(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300"
          />
          
          <div className="bg-white border border-slate-200/80 rounded-[32px] shadow-2xl p-6 md:p-8 max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-heading text-lg font-bold text-slate-900">Agendar Demonstração</h3>
                <button 
                  onClick={() => setShowDemoForm(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors text-xs font-semibold"
                >
                  Fechar
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Insira seus dados abaixo. Você será redirecionado para falar com um consultor comercial no WhatsApp e definir o melhor horário.
              </p>
              
              <form onSubmit={handleDemoSubmit} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label htmlFor="demoName" className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nome Completo</label>
                  <input 
                    id="demoName"
                    type="text"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="Digite seu nome..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="demoCompany" className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Empresa</label>
                  <input 
                    id="demoCompany"
                    type="text"
                    required
                    value={demoCompany}
                    onChange={(e) => setDemoCompany(e.target.value)}
                    placeholder="Nome da sua empresa..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="demoPhone" className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Telefone Comercial</label>
                  <input 
                    id="demoPhone"
                    type="tel"
                    required
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="demoEmail" className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">E-mail Corporativo</label>
                  <input 
                    id="demoEmail"
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="seuemail@empresa.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 rounded-xl shadow-md cursor-pointer pt-0"
                >
                  {formSubmitted ? 'Redirecionando...' : 'Confirmar e Abrir WhatsApp'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
