import { ArrowLeft, CheckCircle, HelpCircle, FileText, Send } from 'lucide-react';
import { Button } from './ui/button';

interface InsuranceDetail {
  id: string;
  title: string;
  slogan: string;
  intro: string;
  image: string;
  commercialValue: string;
  technicalSpecs: {
    target: string;
    regulation: string;
    keyBenefit: string;
    exclusions: string[];
  };
  coverages: string[];
}

interface SeguroDetailPageProps {
  productId: string;
  onBack: () => void;
  onSimulate: (id: string, category: 'PF' | 'PJ') => void;
}

export default function SeguroDetailPage({ productId, onBack, onSimulate }: SeguroDetailPageProps) {
  
  const productDetails: Record<string, InsuranceDetail> = {
    vida: {
      id: 'vida',
      title: 'Seguros de Vida',
      slogan: 'Seu amor é eterno, sua proteção também pode ser.',
      intro: 'Mais do que um seguro, uma garantia de continuidade para o padrão de vida de quem você mais estima. O seguro de vida protege sua família contra as maiores intempéries e garante amparo financeiro e tranquilidade nos momentos mais delicados.',
      image: '/happy_family.png',
      commercialValue: 'Protege a estabilidade financeira dos dependentes, auxilia na quitação de eventuais dívidas e garante liquidez para processos de inventário. É um recurso isento de impostos sucessórios (ITCMD) e entra rapidamente na conta dos beneficiários, evitando bloqueios de contas.',
      technicalSpecs: {
        target: 'Pessoas de 18 a 70 anos com dependentes financeiros ou patrimônio a ser sucedido.',
        regulation: 'Circular SUSEP nº 602/2020 (Seguro de Pessoas)',
        keyBenefit: 'Suporte financeiro imediato e isenção fiscal sob o artigo 794 do Código Civil.',
        exclusions: ['Lesões autoinduzidas pré-existentes', 'Eventos decorrentes de catástrofes nucleares', 'Atividades ilegais do segurado']
      },
      coverages: [
        'Morte Natural ou Acidental (Cobertura básica indispensável)',
        'Invalidez Permanente por Acidente (IPA - Total ou Parcial)',
        'Antecipação por Doença Terminal (Liberação em vida para custeio médico)',
        'Diagnóstico de Doenças Graves (Indenização direta por Câncer, Infarto, AVC)',
        'Assistência Funeral Familiar (Reembolso ou prestação direta de serviços)'
      ]
    },
    saude: {
      id: 'saude',
      title: 'Planos de Saúde',
      slogan: 'Bem-estar e segurança para cada batida do seu coração.',
      intro: 'O acesso à saúde de qualidade é essencial para a longevidade. Oferecemos as melhores opções de operadoras e seguradoras para consultas rápidas com especialistas, pronto-atendimentos eficientes e ampla cobertura para tratamentos complexos.',
      image: '/happy_family.png',
      commercialValue: 'Prevenção de gastos catastróficos em cirurgias ou internações de urgência. Permite a livre escolha de médicos com reembolso de despesas e dedução integral das mensalidades na declaração anual do Imposto de Renda (IRPF).',
      technicalSpecs: {
        target: 'Indivíduos, casais e famílias buscando assistência médica de excelência sem burocracias.',
        regulation: 'Lei Federal nº 9.656/1998 regulamentada pela ANS (Agência Nacional de Saúde)',
        keyBenefit: 'Acesso rápido à rede privada credenciada e dedutibilidade tributária.',
        exclusions: ['Tratamentos puramente estéticos não reconstrutivos', 'Tratamentos experimentais não reconhecidos pela ANS', 'Medicamentos sem registro na ANVISA']
      },
      coverages: [
        'Consultas Médicas e Exames Diagnósticos básicos e avançados',
        'Atendimento de Urgência e Emergência 24h nacional',
        'Internação Hospitalar Clínico-Cirúrgica sem limite de diárias',
        'Obstetrícia e Parto (Com cobertura integral do recém-nascido nos primeiros 30 dias)',
        'Programas de check-up anual e medicina preventiva integrada'
      ]
    },
    automovel: {
      id: 'automovel',
      title: 'Seguro Auto',
      slogan: 'Seu carro protegido, sua mente tranquila.',
      intro: 'O trânsito apresenta riscos imprevisíveis a todo momento. O seguro automóvel da ABN protege o seu bem e te livra de preocupações com colisões, furtos ou indenizações civis a terceiros nas vias brasileiras.',
      image: '/car_insurance.png',
      commercialValue: 'Preservação de um patrimônio de alto valor de depreciação. O seguro evita que um acidente de trânsito drene suas finanças e oferece soluções de mobilidade (como reboques e carros reservas) para manter seu dia a dia ativo.',
      technicalSpecs: {
        target: 'Proprietários de veículos de passeio, motocicletas ou frotas comerciais.',
        regulation: 'Regulado pela SUSEP (Superintendência de Seguros Privados)',
        keyBenefit: 'Cobertura civil robusta para ressarcimento de danos causados a terceiros.',
        exclusions: ['Conduzir sob efeito de substâncias alucinógenas ou álcool', 'Veículo sem manutenção obrigatória (pneus carecas)', 'Guarda de veículo em via pública habitual omitida']
      },
      coverages: [
        'Cobertura Compreensiva (Colisão, Incêndio, Roubo, Furto e Enchente)',
        'Responsabilidade Civil Facultativa (RCF-V - Danos Materiais e Corporais a Terceiros)',
        'Acidentes Pessoais por Passageiro (APP - Proteção à vida dos ocupantes)',
        'Assistência 24h Completa (Reboque sem limite, chaveiro, pane seca e elétrica)',
        'Carro Reserva por até 30 dias com ar-condicionado'
      ]
    },
    residencial: {
      id: 'residencial',
      title: 'Seguro Residencial',
      slogan: 'Seu lar, seu refúgio, nossa proteção.',
      intro: 'O seu lar abriga suas maiores memórias e conquistas. O seguro residencial é uma ferramenta de baixo custo e altíssimo valor agregado, que blinda sua casa ou apartamento contra danos estruturais e incêndios.',
      image: '/home_insurance.png',
      commercialValue: 'Com prêmios anuais que costumam custar menos de 0,2% do valor total do imóvel, o seguro residencial é um dos mais acessíveis e eficientes do mercado. Oferece assistências domésticas diárias de chaveiro e eletricista, pagando o próprio investimento.',
      technicalSpecs: {
        target: 'Proprietários ou inquilinos de residências térreas ou apartamentos.',
        regulation: 'Normas gerais SUSEP para seguros patrimoniais.',
        keyBenefit: 'Custo anual extremamente baixo com coberturas de assistência doméstica.',
        exclusions: ['Desgaste natural de pintura ou telhas', 'Infiltrações lentas sem evento climático súbito', 'Negligência em manutenção estrutural básica']
      },
      coverages: [
        'Incêndio, Queda de Raios e Explosão de qualquer natureza (Básica)',
        'Danos Elétricos (Quedas de energia que queimem aparelhos e eletrodomésticos)',
        'Subtração de Bens (Indenização por eletroeletrônicos e joias roubadas no lar)',
        'Vendaval, Furacão e Chuva de Granizo (Danos ao telhado e janelas)',
        'Responsabilidade Civil Familiar (Danos causados por vazamentos a vizinhos ou acidentes de pets)'
      ]
    },
    odontologico: {
      id: 'odontologico',
      title: 'Planos Odontológicos',
      slogan: 'Cuide do seu sorriso, nós cuidamos de você.',
      intro: 'A saúde do corpo começa pela boca. Um plano dental bem estruturado estimula visitas regulares ao dentista e evita o desenvolvimento de quadros mais complexos que exigem cirurgias onerosas.',
      image: '/happy_family.png',
      commercialValue: 'Economia financeira direta em limpezas, canais e extrações, que em clínicas particulares custariam o equivalente a vários anos de mensalidades do plano. É um benefício altamente apreciado por toda a família.',
      technicalSpecs: {
        target: 'Pessoas de todas as idades que priorizam a saúde preventiva oral.',
        regulation: 'Rol de procedimentos odontológicos regulados pela ANS',
        keyBenefit: 'Cobertura imediata para emergências dentárias sem limite de consultas.',
        exclusions: ['Procedimentos puramente estéticos (facetas de porcelana)', 'Ortodontia estética com materiais especiais importados', 'Implantes dentários avançados não previstos no rol']
      },
      coverages: [
        'Prevenção bucal (Consultas regulares, Limpeza, Profilaxia e Aplicação de Flúor)',
        'Procedimentos de Diagnóstico (Radiologia intraoral detalhada)',
        'Odontopediatria (Atendimento dedicado à saúde bucal infantil)',
        'Endodontia e Periodontia (Tratamento de canal, gengivas e tecidos de suporte)',
        'Cirurgias menores ambulatoriais e extração simples de dentes (Siso)'
      ]
    },
    patrimoniais: {
      id: 'patrimoniais',
      title: 'Seguros Patrimoniais',
      slogan: 'Sua conquista segura, seu futuro protegido.',
      intro: 'Empresas enfrentam riscos físicos reais todos os dias. O seguro empresarial/patrimonial protege prédios comerciales, escritórios, galpões industriais e estoques, garantindo a liquidez em incidentes.',
      image: '/business_team.png',
      commercialValue: 'Evita a falência do negócio em decorrência de eventos graves de incêndio ou desastres. Possibilita indenização de lucros cessantes para garantir o pagamento de funcionários e fornecedores mesmo com a operação paralisada.',
      technicalSpecs: {
        target: 'Micro, pequenas, médias e grandes empresas de comércio, indústria ou serviços.',
        regulation: 'SUSEP - Condições Gerais de Seguro Multirrisco Empresarial',
        keyBenefit: 'Blindagem de ativos físicos corporativos e estabilização de fluxo de caixa.',
        exclusions: ['Desgaste natural de maquinários de produção', 'Apropriação indébita por funcionários', 'Multas judiciais civis não contratadas em apólice']
      },
      coverages: [
        'Incêndio, Queda de Raio e Explosão das instalações físicas (Básica)',
        'Lucros Cessantes (Reembolso de despesas fixas e perda de receita operacional)',
        'Subtração de Mercadorias e Equipamentos comerciais',
        'Quebra de Máquinas e Equipamentos de TI (Computadores e Servidores)',
        'Responsabilidade Civil do Estabelecimento Comercial'
      ]
    },
    agronegocio: {
      id: 'agronegocio',
      title: 'Seguro Agronegócio',
      slogan: 'Sua colheita farta, nossa proteção forte.',
      intro: 'O agronegócio é o motor da economia, mas lida com o maior dos riscos imprevisíveis: o clima. Nosso seguro agrícola protege sua safra, rebanho, galpões e maquinários para garantir a estabilidade do ciclo produtivo.',
      image: '/agro_insurance.png',
      commercialValue: 'Garante o pagamento do financiamento de custeio agrícola junto aos bancos, impedindo o endividamento do produtor rural em anos de seca extrema, granizo ou geadas severas. Possui acesso a subsídios federais de custeio.',
      technicalSpecs: {
        target: 'Produtores rurais (cooperativas, agricultores e pecuaristas) de pequeno a grande porte.',
        regulation: 'Programa de Subvenção ao Prêmio do Seguro Rural (PSR) do MAPA / SUSEP',
        keyBenefit: 'Segurança financeira em safras e acesso a subsídios governamentais.',
        exclusions: ['Pragas e doenças agrícolas controláveis', 'Safra plantada fora do Zoneamento Agrícola (ZARC)', 'Uso de sementes sem certificação técnica']
      },
      coverages: [
        'Seguro Agrícola Multiperfil (Proteção contra Seca, Geada, Granizo, Excesso de Chuva)',
        'Seguro de Penhor Rural (Segurança de galpões, benfeitorias, estoques de grãos)',
        'Seguro de Máquinas Agrícolas (Cobertura para Tratores, Colheitadeiras e Pivôs de Irrigação)',
        'Seguro Pecuário (Indenização por morte de animais de rebanho ou matrizes reprodutoras)'
      ]
    },
    cyber: {
      id: 'cyber',
      title: 'Cyber Seguros',
      slogan: 'Sua segurança digital, nossa blindagem.',
      intro: 'Na era dos negócios digitais, os dados e a infraestrutura de rede são o bem mais crítico das empresas. O seguro cibernético previne perdas resultantes de invasões hacker, sequestros digitais e vazamento de dados.',
      image: '/business_team.png',
      commercialValue: 'Blindagem contra multas severas decorrentes da Lei Geral de Proteção de Dados (LGPD). Oferece suporte financeiro emergencial imediato para pagar peritos forenses, restaurar backups e compensar a interrupção das vendas.',
      technicalSpecs: {
        target: 'Empresas digitais, e-commerces, startups, hospitais, operadoras de dados e prestadores de TI.',
        regulation: 'Resoluções SUSEP para Riscos Financeiros e de Responsabilidade Civil',
        keyBenefit: 'Cobertura de penalidades administrativas (LGPD) e custos de remediação forense.',
        exclusions: ['Negligência explícita em patches de segurança urgentes e vencidos', 'Ataque causado com conivência da diretoria', 'Infraestrutura de rede sem firewalls e antivírus mínimos padrão']
      },
      coverages: [
        'Responsabilidade por Proteção de Dados e Privacidade (Custos de defesa e multas LGPD)',
        'Extorsão Cibernética (Custeio e resgate em incidentes de Ransomware)',
        'Lucros Cessantes por Interrupção de Rede e Operações',
        'Custos de Investigação Forense de TI (Identificação e mitigação do vazamento)',
        'Custeio de Notificação de Titulares e Assessoria de Relações Públicas'
      ]
    },
    previdencia: {
      id: 'previdencia',
      title: 'Previdência Privada',
      slogan: 'Seu futuro planejado, sua tranquilidade garantida.',
      intro: 'A previdência pública é frequentemente incerta e limitada. A previdência privada da ABN permite a construção de reservas financeiras de longo prazo de forma estruturada, profissional e focada nos seus objetivos.',
      image: '/happy_family.png',
      commercialValue: 'Uma das ferramentas mais eficientes do planejamento financeiro e sucessório. Os recursos aplicados não passam por inventário em caso de falecimento, sendo liquidados em poucos dias sem incidência do imposto ITCMD. Permite abater impostos anuais.',
      technicalSpecs: {
        target: 'Pessoas focadas em acumular riqueza para o futuro ou sucessores buscando simplificação tributária.',
        regulation: 'Circular SUSEP nº 563/2017 (Planos de Previdência Complementar)',
        keyBenefit: 'Isenção de inventário judicial e benefício fiscal dedutível no IRPF.',
        exclusions: ['Retiradas antecipadas em prazos de carência curtos padrão', 'Fundos sem conformidade de perfil de risco contratado']
      },
      coverages: [
        'Plano PGBL (Dedução de até 12% da Renda Bruta Tributável no modelo completo do IR)',
        'Plano VGBL (Tributação incide unicamente sobre os rendimentos na hora do resgate)',
        'Tributação Regressiva (A alíquota de imposto cai gradativamente até 10% após 10 anos)',
        'Tributação Progressiva (Imposto baseado na tabela de rendimentos mensais - ideal para baixos saques)',
        'Indenização por invalidez temporária ou planos de pensão vitalícia reversível'
      ]
    }
  };

  const currentProduct = productDetails[productId];

  if (!currentProduct) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-600">Seguro não encontrado.</p>
        <Button onClick={onBack} className="mt-4">Voltar</Button>
      </div>
    );
  }

  const category = (productId === 'vida_emp' || productId === 'saude_emp' || productId === 'patrimoniais' || productId === 'seguranca' || productId === 'cyber' || productId === 'beneficios' || productId === 'agronegocio') ? 'PJ' : 'PF';

  return (
    <section className="pt-36 pb-24 md:pt-40 md:pb-28 relative overflow-hidden bg-transparent min-h-[90vh]">
      {/* Decorative Glow Color Clouds (glow effects) */}
      <div className="glow-indigo -top-20 left-10 opacity-70" />
      <div className="glow-amber bottom-10 right-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium mb-12 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Voltar para Coberturas
        </button>

        {/* Dynamic Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Commercial & Technical Detail */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Consultoria de Seguros</span>
              <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
                {currentProduct.title}
              </h1>
              <p className="text-lg font-medium text-slate-700 italic border-l-4 border-indigo-500 pl-4">
                "{currentProduct.slogan}"
              </p>
              <p className="text-slate-600 font-light leading-relaxed pt-2">
                {currentProduct.intro}
              </p>
            </div>

            {/* Commercial Evaluation */}
            <div className="space-y-3 bg-tech-pattern p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-heading font-bold text-slate-800 flex items-center gap-2 text-base">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                Por que contratar? (Avaliação Comercial)
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                {currentProduct.commercialValue}
              </p>
            </div>

            {/* Core Coverages */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-lg">Coberturas Oferecidas</h3>
              <div className="grid grid-cols-1 gap-3.5">
                {currentProduct.coverages.map((cov, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-tech-pattern p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{cov}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image and Technical Sheet */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* Main Product Image Card */}
            <div className="rounded-[32px] overflow-hidden border-4 border-white shadow-xl h-64 md:h-80">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Technical Sheet Card */}
            <div className="bg-tech-pattern border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-md space-y-6">
              <h3 className="font-heading font-bold text-slate-800 text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                Ficha Técnica Operacional
              </h3>

              <div className="space-y-4 divide-y divide-slate-100 text-sm">
                <div className="pt-0 pb-3">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Público-Alvo Recomendado</span>
                  <p className="text-slate-700 font-medium mt-1 leading-relaxed">{currentProduct.technicalSpecs.target}</p>
                </div>
                
                <div className="py-3.5">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estrutura e Regulamentação</span>
                  <p className="text-slate-700 font-medium mt-1">{currentProduct.technicalSpecs.regulation}</p>
                </div>

                <div className="py-3.5">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Principal Benefício Legal</span>
                  <p className="text-slate-700 font-medium mt-1 leading-relaxed">{currentProduct.technicalSpecs.keyBenefit}</p>
                </div>

                <div className="pt-3.5">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exclusões Gerais Comuns</span>
                  <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1 mt-1.5 leading-relaxed">
                    {currentProduct.technicalSpecs.exclusions.map((exc, idx) => (
                      <li key={idx}>{exc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Banner Quote CTA */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 border border-indigo-950 text-white rounded-[32px] p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mt-16">
          <div className="text-left space-y-2">
            <h3 className="font-heading text-xl md:text-2xl font-bold">Deseja simular coberturas personalizadas?</h3>
            <p className="text-indigo-200 text-sm font-light max-w-lg leading-relaxed">
              Inicie a simulação agora e receba em seu WhatsApp um estudo completo feito por um corretor sênior da ABN Seguros.
            </p>
          </div>
          <Button 
            onClick={() => onSimulate(productId, category)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold h-14 px-8 rounded-2xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300 flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            Solicitar Simulação deste Ramo
            <Send className="w-4 h-4 animate-bounce-horizontal" />
          </Button>
        </div>
      </div>
    </section>
  );
}
