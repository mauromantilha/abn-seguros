import { useState, type ReactNode } from 'react';
import { 
  Heart, Home, Car, TrendingUp, HeartPulse, Smile, 
  Users2, Landmark, Activity, ShieldAlert, Award,
  CheckCircle, ArrowRight, ShieldCheck, AlertTriangle, FileText
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogClose 
} from './ui/dialog';
import { Button } from './ui/button';

interface InsuranceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  category: 'PF' | 'PJ';
  impact: string;
  coverages: string[];
  regulation: string;
  targetAudience: string;
  exclusions: string[];
}

interface InsuranceSelectorProps {
  onSelectInsurance: (id: string, category: 'PF' | 'PJ') => void;
}

export default function InsuranceSelector({ onSelectInsurance }: InsuranceSelectorProps) {
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const personalInsurances: InsuranceItem[] = [
    {
      id: 'vida',
      title: 'Seguro de Vida',
      description: 'Garanta a tranquilidade financeira e a proteção patrimonial dos seus dependentes contra imprevistos, com isenção de impostos.',
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      category: 'PF',
      impact: 'Provê suporte financeiro imediato em momentos cruciais. É um recurso isento de imposto sobre transmissão causa mortis (ITCMD) e com liberação rápida, evitando o bloqueio de contas durante inventários e garantindo a manutenção do padrão de vida familiar.',
      coverages: [
        'Morte Natural ou Acidental (Cobertura básica essencial)',
        'Invalidez Permanente por Acidente (IPA - Total ou Parcial)',
        'Diagnóstico de Doenças Graves (Câncer, Infarto, AVC)',
        'Assistência Funeral Familiar Completa (Prestação ou Reembolso)'
      ],
      regulation: 'Regulado pela Circular SUSEP nº 602/2020 (Seguro de Pessoas)',
      targetAudience: 'Indivíduos de 18 a 70 anos com dependentes financeiros ou que visam planejamento sucessório.',
      exclusions: [
        'Doenças ou lesões preexistentes não declaradas na contratação',
        'Suicídio voluntário cometido nos primeiros dois anos de vigência do contrato',
        'Eventos decorrentes de catástrofes nucleares ou atos de guerra'
      ]
    },
    {
      id: 'residencial',
      title: 'Seguro Residencial',
      description: 'Proteção completa para a estrutura do seu lar, móveis e eletrodomésticos, com assistências 24h inclusas.',
      icon: <Home className="w-6 h-6 text-orange-500" />,
      category: 'PF',
      impact: 'Garante a indenização necessária para reconstrução física da moradia e reposição de bens internos após sinistros, além de disponibilizar chaveiro, eletricista e encanador 24h para economizar despesas imprevistas no dia a dia.',
      coverages: [
        'Incêndio, Queda de Raios, Explosão e Implosão de qualquer natureza',
        'Danos Elétricos (Quedas de energia que queimem aparelhos e eletrodomésticos)',
        'Subtração de Bens (Indenização por eletroeletrônicos e bens roubados)',
        'Responsabilidade Civil Familiar (Danos acidentais causados a terceiros ou vizinhos)'
      ],
      regulation: 'Normas gerais de seguros patrimoniais da SUSEP',
      targetAudience: 'Proprietários ou inquilinos de residências térreas ou apartamentos urbanos.',
      exclusions: [
        'Desgaste natural de telhado, pintura, fiação ou tubulações antigas',
        'Infiltrações lentas e progressivas sem evento climático causador súbito',
        'Negligência grave em manutenção básica ou abandono prolongado do imóvel'
      ]
    },
    {
      id: 'automovel',
      title: 'Seguro Automóvel',
      description: 'Segurança integral nas estradas com cobertura para colisões, roubos e indenização civil a terceiros.',
      icon: <Car className="w-6 h-6 text-indigo-500" />,
      category: 'PF',
      impact: 'Evita a perda de um patrimônio de alto valor aquisitivo e previne custos milionários com processos de responsabilidade civil em acidentes de trânsito. Oferece socorro mecânico e guincho ilimitados.',
      coverages: [
        'Cobertura Compreensiva (Colisão, Incêndio, Roubo, Furto e Enchentes)',
        'Responsabilidade Civil Facultativa (RCF-V - Danos Materiais e Corporais a Terceiros)',
        'Acidentes Pessoais por Passageiro (APP - Proteção aos ocupantes do veículo)',
        'Assistência 24h (Reboque sem limite de KM, chaveiro, pane seca e carro reserva)'
      ],
      regulation: 'Regulado pela SUSEP (Superintendência de Seguros Privados)',
      targetAudience: 'Proprietários de veículos de passeio, motocicletas ou utilitários.',
      exclusions: [
        'Condução do veículo sob o efeito de álcool ou drogas ilícitas',
        'Veículo conduzido por pessoa sem habilitação legal válida no país',
        'Participação em rachas ou competições de velocidade não autorizadas'
      ]
    },
    {
      id: 'previdencia',
      title: 'Previdência Privada',
      description: 'Planeje sua aposentadoria e construa um fundo de capital sólido com vantagens tributárias.',
      icon: <TrendingUp className="w-6 h-6 text-violet-500" />,
      category: 'PF',
      impact: 'Permite acumular recursos de forma estruturada com benefícios fiscais dedutíveis no IR (PGBL) ou flexibilidade tributária no resgate (VGBL), além de simplificar a sucessão por não passar por inventário.',
      coverages: [
        'Planos PGBL (Dedução de até 12% da renda bruta anual tributável)',
        'Planos VGBL (Tributação incide apenas sobre os rendimentos auferidos)',
        'Tributação Regressiva (A alíquota diminui gradativamente até 10% após 10 anos)',
        'Tributação Progressiva (Imposto baseado na tabela mensal - ideal para saques baixos)'
      ],
      regulation: 'Circular SUSEP nº 563/2017 (Planos de Previdência Complementar)',
      targetAudience: 'Pessoas focadas em acumular riqueza para o futuro ou sucessores buscando simplificação tributária.',
      exclusions: [
        'Retiradas antecipadas antes do término do prazo mínimo de carência do fundo',
        'Escolha incorreta do regime tributário (progressivo/regressivo) sem consultoria'
      ]
    },
    {
      id: 'saude',
      title: 'Planos de Saúde',
      description: 'Acesso às melhores redes médicas, laboratórios e hospitais privados de referência do país.',
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      category: 'PF',
      impact: 'Assegura consultas ágeis com especialistas de referência, pronto-socorro qualificado 24h e cobertura integral para cirurgias, internações e tratamentos complexos, resguardando suas economias.',
      coverages: [
        'Consultas Médicas de Rotina e Exames de Diagnóstico básicos e avançados',
        'Atendimento de Urgência e Emergência 24h com abrangência nacional',
        'Internação Hospitalar Clínico-Cirúrgica sem limite de diárias',
        'Obstetrícia e Parto com cobertura para o recém-nascido nos primeiros 30 dias'
      ],
      regulation: 'Regulado pela Lei Federal nº 9.656/1998 e normas da ANS',
      targetAudience: 'Famílias e pessoas físicas buscando qualidade de atendimento à saúde.',
      exclusions: [
        'Procedimentos e cirurgias puramente estéticos não reconstrutivos',
        'Tratamentos experimentais ou medicamentos importados sem registro na ANVISA',
        'Procedimentos fora do Rol de Procedimentos e Eventos em Saúde da ANS'
      ]
    },
    {
      id: 'odontologico',
      title: 'Planos Odontológicos',
      description: 'Garanta a saúde bucal e o sorriso da sua família com ampla rede de consultórios credenciados.',
      icon: <Smile className="w-6 h-6 text-orange-500" />,
      category: 'PF',
      impact: 'Estimula a prevenção bucal periódica através de limpezas e consultas gratuitas, gerando uma economia drástica em comparação a tratamentos particulares como canais e cirurgias.',
      coverages: [
        'Consultas, Limpezas de Rotina, Profilaxia e Aplicação de Flúor',
        'Tratamento de Canal (Endodontia) e Gengivas (Periodontia)',
        'Atendimento de Urgência e Emergência Odontológica 24h',
        'Cirurgias menores em consultório (incluindo extração de siso)'
      ],
      regulation: 'Rol de procedimentos odontológicos regulados pela ANS',
      targetAudience: 'Pessoas físicas de qualquer idade focadas na prevenção da saúde oral.',
      exclusions: [
        'Procedimentos exclusivamente estéticos como facetas e clareamentos',
        'Ortodontia estética com materiais especiais importados',
        'Implantes dentários avançados não previstos no plano básico contratado'
      ]
    }
  ];

  const corporateInsurances: InsuranceItem[] = [
    {
      id: 'vida_emp',
      title: 'Vida Empresarial',
      description: 'Proteção e amparo financeiro para os colaboradores do seu negócio, atendendo acordos sindicais.',
      icon: <Users2 className="w-6 h-6 text-teal-600" />,
      category: 'PJ',
      impact: 'Melhora a atratividade do pacote de benefícios corporativos da empresa, auxiliando na retenção de talentos de alto nível e garantindo conformidade com as Convenções Coletivas de Trabalho (CCT).',
      coverages: [
        'Indenização por Morte Natural ou Acidental do Colaborador',
        'Invalidez Permanente por Acidente (IPA) Total ou Parcial',
        'Auxílio Cesta Básica e Assistência Funeral Familiar em Grupo',
        'Adequação técnica completa às exigências de Convenções Coletivas (CCT)'
      ],
      regulation: 'Regulado pela Circular SUSEP nº 602/2020 (Seguros de Pessoas)',
      targetAudience: 'Empresas de todos os portes com colaboradores sob regime CLT ou terceirizados.',
      exclusions: [
        'Doenças ou lesões preexistentes omitidas intencionalmente no cadastro',
        'Prática de atos ilícitos por parte do segurado ou beneficiários'
      ]
    },
    {
      id: 'saude_emp',
      title: 'Saúde Empresarial',
      description: 'Mantenha sua equipe saudável, motivada e produtiva com planos de saúde corporativos flexíveis.',
      icon: <Activity className="w-6 h-6 text-teal-600" />,
      category: 'PJ',
      impact: 'Reduz significativamente os índices de absenteísmo médico, atrai profissionais de alta performance e aumenta o engajamento organizacional através de assistência médica de alto nível a custos reduzidos.',
      coverages: [
        'Planos customizados PME (a partir de 2 vidas) e Grandes Corporações',
        'Rede credenciada hospitalar de alta qualidade e pronto-socorro nacional',
        'Coparticipação Opcional Regulável para controle de sinistralidade e prêmios',
        'Acesso a programas de medicina preventiva e telemedicina 24h inclusa'
      ],
      regulation: 'Regulado pela Lei nº 9.656/1998 e normas da ANS para Planos Coletivos',
      targetAudience: 'Empresas com CNPJ ativo que desejam oferecer assistência à saúde a sócios e colaboradores.',
      exclusions: [
        'Procedimentos estéticos sem recomendação médica de caráter reconstrutor',
        'Medicamentos de uso domiciliar não previstos em cobertura especial ou legislação'
      ]
    },
    {
      id: 'patrimoniais',
      title: 'Seguros Patrimoniais',
      description: 'Garanta a continuidade do seu negócio contra incêndios, danos estruturais e lucros cessantes.',
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      category: 'PJ',
      impact: 'Blinda os ativos da sua empresa repondo instalações físicas, maquinários e estoques após acidentes, além de indenizar o faturamento (lucros cessantes) para manter pagamentos em dia durante interrupções.',
      coverages: [
        'Danos Físicos por Incêndio, Queda de Raios, Explosões e Implosões (Básica)',
        'Lucros Cessantes (Reembolso de despesas fixas e perda de receita líquida operacional)',
        'Subtração de Bens, Mercadorias comerciais e Valores em Caixa',
        'Danos Elétricos em Servidores, Computadores e Equipamentos de Produção'
      ],
      regulation: 'SUSEP - Condições Gerais de Seguro de Riscos Nomeados e Operacionais',
      targetAudience: 'Comércios, indústrias, prestadores de serviços, depósitos e escritórios corporativos.',
      exclusions: [
        'Danos decorrentes de desgaste natural, oxidação ou falta de manutenção básica',
        'Desvio de bens corporativos por apropriação indébita ou furto simples sem vestígios',
        'Multas e penalidades contratuais ou administrativas impostas à empresa'
      ]
    },
    {
      id: 'seguranca',
      title: 'Segurança & Garantia',
      description: 'Substitua depósitos judiciais e viabilize a participação em licitações públicas com fianças estruturadas.',
      icon: <Landmark className="w-6 h-6 text-teal-600" />,
      category: 'PJ',
      impact: 'Permite que a empresa atenda a exigências de contratos públicos ou privados de fornecimento sem drenar o fluxo de caixa ou comprometer limites de crédito bancário tradicional.',
      coverages: [
        'Seguro Garantia do Licitante (Bid Bond) e do Executante (Performance Bond)',
        'Garantia Judicial e Recursal em processos cíveis, tributários ou trabalhistas',
        'Responsabilidade Civil Profissional (E&O - Erros e Omissões)',
        'Seguro D&O (Proteção para o patrimônio pessoal de Diretores e Administradores)'
      ],
      regulation: 'Circulares SUSEP nº 477/2013 e nº 662/2022 (Seguro Garantia)',
      targetAudience: 'Empresas licitantes, construtoras, prestadores de serviços e executivos corporativos.',
      exclusions: [
        'Prejuízos decorrentes de atos dolosos ou má-fé comprovados em juízo',
        'Multas de caráter estritamente punitivo não contratadas na apólice'
      ]
    },
    {
      id: 'cyber',
      title: 'Cyber Seguros',
      description: 'Blindagem financeira abrangente contra ataques cibernéticos, sequestros digitais e vazamento de dados.',
      icon: <ShieldAlert className="w-6 h-6 text-teal-600" />,
      category: 'PJ',
      impact: 'Mitiga os severos impactos financeiros e administrativos decorrentes da Lei Geral de Proteção de Dados (LGPD), cobrindo multas da ANPD, custos de perícia de TI, assessoria jurídica e lucros cessantes por sistemas inoperantes.',
      coverages: [
        'Responsabilidade Civil por Incidentes de Privacidade e Vazamento de Dados (LGPD)',
        'Extorsão Digital (Negociação e remediação em ataques de Ransomware/Sequestro)',
        'Custos Forenses e Tecnológicos para Investigação do Vazamento e Mitigação',
        'Lucros Cessantes decorrentes de interrupções operacionais por ataque cibernético'
      ],
      regulation: 'Resoluções SUSEP aplicáveis a Seguros de Riscos Cibernéticos',
      targetAudience: 'Empresas digitais, startups, e-commerces, hospitais, operadoras de dados e prestadores de TI.',
      exclusions: [
        'Negligência óbvia em patches de segurança conhecidos expostos e vencidos',
        'Uso corporativo de sistemas operacionais e softwares piratas ou sem suporte',
        'Ataque provocado intencionalmente por sócios ou diretores da empresa'
      ]
    },
    {
      id: 'beneficios',
      title: 'Benefícios Corporativos',
      description: 'Gestão estratégica de vale-alimentação, refeição e odonto para valorização de colaboradores.',
      icon: <Award className="w-6 h-6 text-teal-600" />,
      category: 'PJ',
      impact: 'Garante vantagens e isenções fiscais sob as regras do PAT (Programa de Alimentação do Trabalhador) e atua como uma ferramenta estratégica na valorização profissional e diminuição do turnover (rotatividade).',
      coverages: [
        'Vale Refeição e Vale Alimentação aceitos nacionalmente',
        'Planos Odontológicos Empresariais integrados e customizáveis',
        'Seguro de Vida em Grupo com taxas operacionais exclusivas',
        'Plataforma Digital Unificada para RH e colaboradores'
      ],
      regulation: 'Legislação do Programa de Alimentação do Trabalhador (PAT - Lei nº 6.321/1976)',
      targetAudience: 'Departamentos de Recursos Humanos de empresas buscando otimização de benefícios.',
      exclusions: [
        'Desvio de finalidade dos cartões de benefício (uso para itens não alimentares)',
        'Desrespeito às regras de isenção tributária do PAT'
      ]
    }
  ];

  const handleSimulateClick = (item: InsuranceItem) => {
    setIsDialogOpen(false);
    onSelectInsurance(item.id, item.category);
    
    // Smooth scroll to simulator
    const element = document.getElementById('simulador');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (item: InsuranceItem) => {
    setSelectedInsurance(item);
    setIsDialogOpen(true);
  };

  return (
    <section id="seguros" className="py-28 relative overflow-hidden bg-slate-50 border-y border-slate-200/50">
      {/* Decorative Glow Color Clouds (glow effects) */}
      <div className="glow-amber -top-20 right-10 opacity-70" />
      <div className="glow-indigo bottom-10 left-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Portfólio de Proteção</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900">Explore Nossos Ramos de Seguro</h2>
          <p className="text-slate-500 font-light text-base md:text-lg">
            Selecione uma cobertura abaixo para ver os detalhes e entender como cada seguro impacta positivamente a estabilidade da sua vida ou do seu negócio.
          </p>
        </div>

        {/* Tab System */}
        <Tabs defaultValue="voce" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-slate-100/80 border border-slate-200/50 p-1 rounded-2xl h-auto shadow-inner">
              <TabsTrigger 
                value="voce" 
                className="px-8 py-3.5 rounded-xl font-heading text-sm font-semibold tracking-wide data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=state]:text-slate-500 data-[state=active]:shadow-sm transition-all cursor-pointer"
              >
                Para Você
              </TabsTrigger>
              <TabsTrigger 
                value="empresas" 
                className="px-8 py-3.5 rounded-xl font-heading text-sm font-semibold tracking-wide data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=state]:text-slate-500 data-[state=active]:shadow-sm transition-all cursor-pointer"
              >
                Para Empresas
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Personal Insurance Grid */}
          <TabsContent value="voce" className="focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 pt-6">
              {personalInsurances.map((item) => (
                <Card 
                  key={item.id} 
                  onClick={() => handleCardClick(item)}
                  className="human-card human-card-PF cursor-pointer relative group p-6 pt-12 flex flex-col justify-between"
                >
                  {/* Floating Icon Overlap */}
                  <div className="card-icon-badge bg-rose-50 border border-rose-100/60 text-rose-500">
                    {item.icon}
                  </div>
                  
                  <CardHeader className="p-0 space-y-3">
                    <CardTitle className="font-heading text-xl text-slate-800 font-bold group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-sm font-light leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0 pt-5 flex items-center justify-between border-t border-slate-100 mt-5">
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">Ver detalhes</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 transform group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Corporate Insurance Grid */}
          <TabsContent value="empresas" className="focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 pt-6">
              {corporateInsurances.map((item) => (
                <Card 
                  key={item.id} 
                  onClick={() => handleCardClick(item)}
                  className="human-card human-card-PJ cursor-pointer relative group p-6 pt-12 flex flex-col justify-between"
                >
                  {/* Floating Icon Overlap */}
                  <div className="card-icon-badge bg-teal-50 border border-teal-100/60 text-teal-600">
                    {item.icon}
                  </div>
                  
                  <CardHeader className="p-0 space-y-3">
                    <CardTitle className="font-heading text-xl text-slate-800 font-bold group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-sm font-light leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0 pt-5 flex items-center justify-between border-t border-slate-100 mt-5">
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-teal-600 transition-colors">Ver detalhes</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 transform group-hover:translate-x-1 group-hover:text-teal-600 transition-all" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Detailed Coverage Modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-tech-pattern border border-slate-200 text-slate-800 rounded-[32px] w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[55vw] p-6 md:p-8 shadow-2xl shadow-slate-900/10 h-auto max-h-[95vh] overflow-y-auto">
            {selectedInsurance && (
              <>
                <DialogHeader className="space-y-3 text-left">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className={`p-3.5 rounded-2xl w-fit ${
                      selectedInsurance.category === 'PF' 
                        ? 'bg-rose-50 border border-rose-100' 
                        : 'bg-teal-50 border border-teal-100'
                    }`}>
                      {selectedInsurance.icon}
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border ${
                        selectedInsurance.category === 'PF' 
                          ? 'border-rose-200 text-rose-600 bg-rose-50' 
                          : 'border-teal-200 text-teal-600 bg-teal-50'
                      }`}>
                        {selectedInsurance.category === 'PF' ? 'Para Você' : 'Empresarial'}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-slate-50">
                        {selectedInsurance.id === 'saude' || selectedInsurance.id === 'saude_emp' || selectedInsurance.id === 'odontologico' ? 'ANS' : selectedInsurance.id === 'beneficios' ? 'PAT' : 'SUSEP'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <DialogTitle className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                      {selectedInsurance.title}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 text-sm font-light mt-1 leading-relaxed">
                      {selectedInsurance.description}
                    </DialogDescription>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 text-left border-t border-slate-100 mt-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Impact Info */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                        Abordagem Técnico-Comercial
                      </h4>
                      <p className="text-slate-600 text-sm font-light leading-relaxed">
                        {selectedInsurance.impact}
                      </p>
                    </div>

                    {/* Público Alvo */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Público-Alvo Recomendado</h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        {selectedInsurance.targetAudience}
                      </p>
                    </div>

                    {/* Regulation */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Estrutura Regulatória</h4>
                      <p className="text-xs text-slate-500 font-light leading-relaxed bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        {selectedInsurance.regulation}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Primary Coverages */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Principais Coberturas</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedInsurance.coverages.map((cov, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-slate-600">
                            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              selectedInsurance.category === 'PF' ? 'text-rose-500' : 'text-teal-500'
                            }`} />
                            <span className="text-sm font-light">{cov}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exclusions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        Principais Exclusões Gerais
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedInsurance.exclusions.map((exc, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-slate-500">
                            <span className="text-xs font-light list-item list-inside">{exc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-6">
                  <DialogClose asChild>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-slate-200 hover:bg-slate-50 hover:text-slate-800 rounded-2xl h-12 text-sm font-medium cursor-pointer"
                    >
                      Fechar
                    </Button>
                  </DialogClose>
                  <Button 
                    onClick={() => handleSimulateClick(selectedInsurance)}
                    className={`flex-1 rounded-2xl h-12 text-sm font-bold text-white cursor-pointer ${
                      selectedInsurance.category === 'PF'
                        ? 'bg-indigo-600 hover:bg-indigo-500'
                        : 'bg-teal-600 hover:bg-teal-500'
                    }`}
                  >
                    Simular Seguro
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
