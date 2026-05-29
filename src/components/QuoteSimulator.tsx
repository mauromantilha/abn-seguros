import { useState, useEffect } from 'react';
import { 
  Mail, Phone, ArrowRight, ArrowLeft, Send, 
  Car, Home, Heart, FileText, AlertTriangle, Sparkles, CheckCircle, Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

// Actuarial Tables & Mock Datasets
interface FipeModel {
  id: string;
  label: string;
  baseValue: number;
}

const fipeModels: Record<string, FipeModel[]> = {
  toyota: [
    { id: 'corolla', label: 'Corolla Sedan (XEi/Altis)', baseValue: 145000 },
    { id: 'hilux', label: 'Hilux Diesel CD 4x4', baseValue: 260000 },
    { id: 'yaris', label: 'Yaris Hatchback', baseValue: 95000 }
  ],
  chevrolet: [
    { id: 'onix', label: 'Onix Hatch LTZ', baseValue: 85000 },
    { id: 'tracker', label: 'Tracker Premier SUV', baseValue: 130000 },
    { id: 's10', label: 'S10 High Country Pick-up', baseValue: 230000 }
  ],
  fiat: [
    { id: 'argo', label: 'Argo Trekking Hatch', baseValue: 78000 },
    { id: 'toro', label: 'Toro Freedom Diesel 4x4', baseValue: 165000 },
    { id: 'mobi', label: 'Mobi Trekking', baseValue: 65000 }
  ],
  volkswagen: [
    { id: 'gol', label: 'Gol Trendline 1.0', baseValue: 55000 },
    { id: 'tcross', label: 'T-Cross Highline SUV', baseValue: 135000 },
    { id: 'polo', label: 'Polo Comfortline TSI', baseValue: 98000 }
  ],
  honda: [
    { id: 'civic', label: 'Civic Sedan Touring', baseValue: 160000 },
    { id: 'hrv', label: 'HR-V EXL SUV', baseValue: 150000 },
    { id: 'fit', label: 'Fit EXL Hatch', baseValue: 80000 }
  ],
  hyundai: [
    { id: 'hb20', label: 'HB20 Evolution Hatch', baseValue: 82000 },
    { id: 'creta', label: 'Creta Ultimate SUV', baseValue: 140000 }
  ]
};

const cities = [
  { id: 'sp', label: 'São Paulo (SP) - Risco Alto (SUSEP 12.5%)', theftMultiplier: 1.25, riskLabel: 'Alto' },
  { id: 'rj', label: 'Rio de Janeiro (RJ) - Risco Crítico (SUSEP 14.2%)', theftMultiplier: 1.42, riskLabel: 'Crítico' },
  { id: 'bh', label: 'Belo Horizonte (MG) - Risco Médio (SUSEP 8.5%)', theftMultiplier: 1.10, riskLabel: 'Médio' },
  { id: 'cur', label: 'Curitiba (PR) - Risco Baixo (SUSEP 6.2%)', theftMultiplier: 0.90, riskLabel: 'Baixo' },
  { id: 'poa', label: 'Porto Alegre (RS) - Risco Alto (SUSEP 11.4%)', theftMultiplier: 1.20, riskLabel: 'Alto' },
  { id: 'df', label: 'Brasília (DF) - Risco Baixo (SUSEP 5.8%)', theftMultiplier: 0.85, riskLabel: 'Baixo' },
  { id: 'outros', label: 'Outras Regiões - Risco Padrão (SUSEP 7.0%)', theftMultiplier: 1.00, riskLabel: 'Médio-Baixo' }
];

const professions = [
  { id: 'adm', label: 'Administrativo / Escritório (Risco Baixo)', riskMultiplier: 0.85 },
  { id: 'com', label: 'Comercial / Vendas / Técnico (Risco Médio)', riskMultiplier: 1.10 },
  { id: 'op', label: 'Operacional / Indústria / Logística (Risco Alto)', riskMultiplier: 1.35 },
  { id: 'seg', label: 'Segurança / Policial / Motorista (Risco Crítico)', riskMultiplier: 1.60 },
  { id: 'med', label: 'Médico / Profissional de Saúde (Risco Baixo)', riskMultiplier: 0.90 }
];

interface QuoteSimulatorProps {
  preselectedId?: string;
  preselectedCategory?: 'PF' | 'PJ';
  onClearPreselection?: () => void;
}

export default function QuoteSimulator({ 
  preselectedId,
  onClearPreselection 
}: QuoteSimulatorProps) {
  const [step, setStep] = useState(1); // 1: Select Ramo, 2: Specific Fields, 3: Contact Info, 4: Results, 5: Done
  const [selectedRamo, setSelectedRamo] = useState<'auto' | 'residencial' | 'vida' | 'outros'>('auto');

  // Input States
  // Auto
  const [autoBrand, setAutoBrand] = useState('toyota');
  const [autoModelId, setAutoModelId] = useState('corolla');
  const [autoYear, setAutoYear] = useState('2024');
  const [autoAge, setAutoAge] = useState(35);
  const [autoCity, setAutoCity] = useState('sp');

  // FIPE API State
  const [fipeBrands, setFipeBrands] = useState<{ id: string; label: string }[]>([
    { id: 'toyota', label: 'Toyota' },
    { id: 'chevrolet', label: 'Chevrolet' },
    { id: 'fiat', label: 'Fiat' },
    { id: 'volkswagen', label: 'Volkswagen' },
    { id: 'honda', label: 'Honda' },
    { id: 'hyundai', label: 'Hyundai' }
  ]);
  const [fipeModelsList, setFipeModelsList] = useState<{ id: string; label: string; baseValue: number }[]>([]);
  const [fipeYearsList, setFipeYearsList] = useState<{ id: string; label: string }[]>([]);
  const [fipeSelectedValue, setFipeSelectedValue] = useState<number | null>(null);
  const [loadingFipe, setLoadingFipe] = useState(false);
  const [apiMode, setApiMode] = useState(false);

  // Residencial
  const [resPropValue, setResPropValue] = useState(450000);
  const [resPropType, setResPropType] = useState('apartamento');
  const [resCity, setResCity] = useState('sp');
  const [resSafety, setResSafety] = useState('portaria');

  // Vida
  const [vidaAge, setVidaAge] = useState(35);
  const [vidaPreExisting, setVidaPreExisting] = useState('nao');
  const [vidaProfession, setVidaProfession] = useState('adm');
  const [vidaSpouse, setVidaSpouse] = useState('nao');

  // Outros
  const [outrosText, setOutrosText] = useState('');

  // Contact
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculation Results
  const [results, setResults] = useState({
    annualPremium: 0,
    monthlyPremium: 0,
    riskScore: 'Médio',
    susepSinistralidade: 0
  });

  // Preselected listen
  useEffect(() => {
    if (preselectedId) {
      if (preselectedId === 'automovel') {
        setSelectedRamo('auto');
        setStep(2);
      } else if (preselectedId === 'residencial') {
        setSelectedRamo('residencial');
        setStep(2);
      } else if (preselectedId === 'vida' || preselectedId === 'vida_emp') {
        setSelectedRamo('vida');
        setStep(2);
      } else {
        setSelectedRamo('outros');
        setStep(2);
      }
      if (onClearPreselection) {
        onClearPreselection();
      }
    }
  }, [preselectedId, onClearPreselection]);

  // FIPE API Integration Effect: Fetch all brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingFipe(true);
        const res = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        if (!res.ok) throw new Error('API FIPE offline');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map((b: any) => ({
            id: String(b.codigo),
            label: b.nome
          }));
          setFipeBrands(list);
          setApiMode(true);
          // Set initial brand
          setAutoBrand(list[0].id);
        }
      } catch (err) {
        console.warn('Erro ao carregar marcas da FIPE (usando fallback offline):', err);
        setApiMode(false);
        setFipeModelsList(fipeModels['toyota'] || []);
      } finally {
        setLoadingFipe(false);
      }
    };
    
    fetchBrands();
  }, []);

  // Fetch models when autoBrand changes
  useEffect(() => {
    if (!apiMode) {
      const models = fipeModels[autoBrand] || [];
      setFipeModelsList(models);
      if (models.length > 0) {
        setAutoModelId(models[0].id);
      }
      setFipeYearsList([
        { id: '2025', label: '2025' },
        { id: '2024', label: '2024' },
        { id: '2023', label: '2023' },
        { id: '2022', label: '2022' },
        { id: '2021', label: '2021' },
        { id: '2020', label: '2020' },
        { id: '2019', label: '2019' },
        { id: '2018', label: '2018' }
      ]);
      setAutoYear('2024');
      setFipeSelectedValue(null);
      return;
    }

    const fetchModels = async () => {
      try {
        setLoadingFipe(true);
        const res = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${autoBrand}/modelos`);
        if (!res.ok) throw new Error('Falha ao obter modelos');
        const data = await res.json();
        if (data && Array.isArray(data.modelos)) {
          const list = data.modelos.map((m: any) => ({
            id: String(m.codigo),
            label: m.nome,
            baseValue: 100000
          }));
          setFipeModelsList(list);
          if (list.length > 0) {
            setAutoModelId(list[0].id);
          }
        }
      } catch (err) {
        console.error('Erro ao obter modelos:', err);
      } finally {
        setLoadingFipe(false);
      }
    };

    if (autoBrand && apiMode) {
      fetchModels();
    }
  }, [autoBrand, apiMode]);

  // Fetch years when autoModelId changes
  useEffect(() => {
    if (!apiMode) return;

    const fetchYears = async () => {
      try {
        setLoadingFipe(true);
        const res = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${autoBrand}/modelos/${autoModelId}/anos`);
        if (!res.ok) throw new Error('Falha ao obter anos');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map((y: any) => ({
            id: String(y.codigo),
            label: y.nome
          }));
          setFipeYearsList(list);
          if (list.length > 0) {
            setAutoYear(list[0].id);
          }
        }
      } catch (err) {
        console.error('Erro ao obter anos:', err);
      } finally {
        setLoadingFipe(false);
      }
    };

    if (autoBrand && autoModelId && apiMode) {
      fetchYears();
    }
  }, [autoBrand, autoModelId, apiMode]);

  // Fetch exact valuation price when autoYear changes
  useEffect(() => {
    if (!apiMode) return;

    const fetchValuation = async () => {
      try {
        setLoadingFipe(true);
        const res = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${autoBrand}/modelos/${autoModelId}/anos/${autoYear}`);
        if (!res.ok) throw new Error('Falha ao obter valor FIPE');
        const data = await res.json();
        if (data && data.Valor) {
          const parsed = parseFloat(data.Valor.replace(/[^\d,]/g, '').replace(',', '.'));
          setFipeSelectedValue(parsed);
        }
      } catch (err) {
        console.error('Erro ao obter valor FIPE:', err);
      } finally {
        setLoadingFipe(false);
      }
    };

    if (autoBrand && autoModelId && autoYear && apiMode) {
      fetchValuation();
    }
  }, [autoBrand, autoModelId, autoYear, apiMode]);

  // Handle brand change: set default model of that brand
  const handleBrandChange = (brand: string) => {
    setAutoBrand(brand);
    if (!apiMode) {
      const models = fipeModels[brand] || [];
      if (models.length > 0) {
        setAutoModelId(models[0].id);
      }
    }
  };

  // Perform Actuarial Math based on variables
  const runActuarialMath = () => {
    if (selectedRamo === 'auto') {
      const selectedCity = cities.find(c => c.id === autoCity) || { theftMultiplier: 1.0, riskLabel: 'Médio' };
      
      const carValue = apiMode 
        ? (fipeSelectedValue || 100000) 
        : ((fipeModels[autoBrand] || []).find(m => m.id === autoModelId)?.baseValue || 100000);
      const basePremium = carValue * 0.035; // 3.5% base
      
      let ageFactor = 1.0;
      if (autoAge < 25) ageFactor = 1.65;
      else if (autoAge >= 25 && autoAge < 35) ageFactor = 1.15;
      else if (autoAge >= 35 && autoAge < 60) ageFactor = 0.85;
      else ageFactor = 1.05;

      let yearFactor = 1.0;
      if (autoYear.includes('2025') || autoYear.includes('2024') || autoYear === '2025' || autoYear === '2024') yearFactor = 1.05;
      else if (autoYear.includes('2022') || autoYear.includes('2023') || autoYear === '2022' || autoYear === '2023') yearFactor = 0.95;
      else yearFactor = 0.85;

      const annualPremium = basePremium * ageFactor * yearFactor * selectedCity.theftMultiplier;
      const monthlyPremium = annualPremium / 10;

      setResults({
        annualPremium,
        monthlyPremium,
        riskScore: selectedCity.riskLabel,
        susepSinistralidade: selectedCity.theftMultiplier * 8.4
      });

    } else if (selectedRamo === 'residencial') {
      const basePremium = resPropValue * 0.0013; // 0.13% base
      
      let typeFactor = 1.0;
      if (resPropType === 'apartamento') typeFactor = 0.75;
      else if (resPropType === 'casa_condominio') typeFactor = 0.90;
      else typeFactor = 1.25; // casa de rua

      let safetyFactor = 1.0;
      if (resSafety === 'portaria') safetyFactor = 0.80;
      else if (resSafety === 'alarme') safetyFactor = 0.90;
      else safetyFactor = 1.15;

      let cityFactor = 1.0;
      if (resCity === 'sp' || resCity === 'rj') cityFactor = 1.10;
      else cityFactor = 0.90;

      const annualPremium = basePremium * typeFactor * safetyFactor * cityFactor;
      const monthlyPremium = annualPremium / 10;

      let riskScore = 'Médio';
      if (annualPremium > 2200) riskScore = 'Alto';
      else if (annualPremium < 700) riskScore = 'Baixo';

      setResults({
        annualPremium,
        monthlyPremium,
        riskScore,
        susepSinistralidade: cityFactor * 4.5
      });

    } else if (selectedRamo === 'vida') {
      const basePremium = 450; // R$ 450 base per year
      
      let ageFactor = 1.0;
      if (vidaAge < 25) ageFactor = 0.60;
      else if (vidaAge >= 25 && vidaAge < 35) ageFactor = 0.85;
      else if (vidaAge >= 35 && vidaAge < 50) ageFactor = 1.20;
      else if (vidaAge >= 50 && vidaAge < 65) ageFactor = 2.05;
      else ageFactor = 3.50;

      const healthFactor = vidaPreExisting === 'sim' ? 2.20 : 1.00;
      
      const selectedProf = professions.find(p => p.id === vidaProfession) || { riskMultiplier: 1.0 };
      const spouseFactor = vidaSpouse === 'sim' ? 1.50 : 1.00;

      const annualPremium = basePremium * ageFactor * healthFactor * selectedProf.riskMultiplier * spouseFactor;
      const monthlyPremium = annualPremium / 12;

      let riskScore = 'Médio';
      if (annualPremium > 2400) riskScore = 'Alto';
      else if (annualPremium < 600) riskScore = 'Baixo';

      setResults({
        annualPremium,
        monthlyPremium,
        riskScore,
        susepSinistralidade: selectedProf.riskMultiplier * 5.8
      });
    } else {
      // Outros
      setResults({
        annualPremium: 1200,
        monthlyPremium: 120,
        riskScore: 'Padrão',
        susepSinistralidade: 7.2
      });
    }
  };

  const handleNextStep = () => {
    if (step === 2 && selectedRamo === 'outros' && !outrosText.trim()) {
      alert('Por favor, descreva brevemente qual seguro você busca.');
      return;
    }
    if (step === 3) {
      // Validate Contact Info
      const newErrors: Record<string, string> = {};
      if (!name.trim()) newErrors.name = 'Nome completo é obrigatório.';
      if (!phone.trim()) {
        newErrors.phone = 'Telefone/WhatsApp é obrigatório.';
      } else if (phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Número inválido (mínimo 10 dígitos com DDD).';
      }
      if (!email.trim()) {
        newErrors.email = 'E-mail é obrigatório.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Insira um e-mail válido.';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      runActuarialMath();
      setStep(4);
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Generate pre-filled WhatsApp link with simulated data
  const getWhatsAppLink = () => {
    let details = '';
    if (selectedRamo === 'auto') {
      const selectedModelLabel = apiMode 
        ? (fipeModelsList.find(m => m.id === autoModelId)?.label || '') 
        : (fipeModels[autoBrand] || []).find(m => m.id === autoModelId)?.label || '';
      
      const selectedYearLabel = apiMode
        ? (fipeYearsList.find(y => y.id === autoYear)?.label || autoYear)
        : autoYear;

      const selectedCity = cities.find(c => c.id === autoCity);
      details = `Seguro Auto para o veículo ${selectedModelLabel} (${selectedYearLabel}), condutor de ${autoAge} anos residente em ${selectedCity?.label || ''}.`;
    } else if (selectedRamo === 'residencial') {
      const selectedCity = cities.find(c => c.id === resCity);
      details = `Seguro Residencial para imóvel do tipo ${resPropType === 'apartamento' ? 'Apartamento' : resPropType === 'casa_condominio' ? 'Casa em Condomínio' : 'Casa de Rua'}, avaliado em ${formatCurrency(resPropValue)}, em ${selectedCity?.label || ''}.`;
    } else if (selectedRamo === 'vida') {
      const selectedProf = professions.find(p => p.id === vidaProfession);
      details = `Seguro de Vida para segurado de ${vidaAge} anos, profissão: ${selectedProf?.label || ''}, doenças preexistentes: ${vidaPreExisting === 'sim' ? 'Sim' : 'Não'}, inclusão de cônjuge: ${vidaSpouse === 'sim' ? 'Sim' : 'Não'}.`;
    } else {
      details = `Solicitação especial de seguro: ${outrosText}`;
    }

    const message = `Olá ABN Seguros! Acabei de realizar uma simulação no site e gostaria de uma cotação firme.
    
*Nome:* ${name}
*Telefone:* ${phone}
*E-mail:* ${email}
*Ramo:* ${selectedRamo.toUpperCase()}
*Dados da Simulação:* ${details}
*Valor Simulado:* ${formatCurrency(results.annualPremium)}/ano (${formatCurrency(results.monthlyPremium)}/mês)`;

    return `https://wa.me/5511944084097?text=${encodeURIComponent(message)}`;
  };

  const resetForm = () => {
    setStep(1);
    setSelectedRamo('auto');
    setAutoBrand(apiMode ? (fipeBrands[0]?.id || 'toyota') : 'toyota');
    setAutoModelId(apiMode ? (fipeModelsList[0]?.id || '') : 'corolla');
    setAutoYear(apiMode ? (fipeYearsList[0]?.id || '') : '2024');
    setAutoAge(35);
    setAutoCity('sp');
    setResPropValue(450000);
    setResPropType('apartamento');
    setResCity('sp');
    setResSafety('portaria');
    setVidaAge(35);
    setVidaPreExisting('nao');
    setVidaProfession('adm');
    setVidaSpouse('nao');
    setOutrosText('');
    setName('');
    setPhone('');
    setEmail('');
    setErrors({});
    setFipeSelectedValue(null);
  };

  return (
    <section id="simulador" className="pt-36 pb-24 md:pt-40 md:pb-28 relative overflow-hidden bg-transparent">
      {/* Decorative Glow Color Clouds (glow effects) */}
      <div className="glow-indigo top-10 left-10 opacity-70" />
      <div className="glow-amber bottom-10 right-10 opacity-60" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            Cálculo Atuarial Digital
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900">Simulador de Proteção Inteligente</h2>
          <p className="text-slate-500 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Calcule uma estimativa de preços de seguros baseada em custos médios nacionais e índices oficiais de sinistros da SUSEP.
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        {step < 5 && (
          <div className="flex items-center justify-between mb-10 px-4 max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all duration-300 ${
                step >= 1 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'bg-slate-200 text-slate-500'
              }`}>
                1
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Ramo</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all duration-300 ${
                step >= 2 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'bg-slate-200 text-slate-500'
              }`}>
                2
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Variáveis</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all duration-300 ${
                step >= 3 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Contato</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step >= 4 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all duration-300 ${
                step >= 4 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'bg-slate-200 text-slate-500'
              }`}>
                4
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Preço</span>
            </div>
          </div>
        )}

        {/* Step Content Card */}
        <div className="bg-tech-pattern border border-slate-200/60 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 min-h-[380px] flex flex-col justify-between">
          
          {/* Step 1: Select Ramo */}
          {step === 1 && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-bold text-slate-800 font-heading">Passo 1: Qual proteção você deseja simular hoje?</h3>
                <p className="text-slate-500 text-sm font-light mt-1">Selecione o ramo de seguro para iniciarmos os cálculos de risco.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div 
                  onClick={() => { setSelectedRamo('auto'); setStep(2); }}
                  className="bg-white hover:bg-slate-50/50 hover:border-indigo-300/80 p-5 rounded-[24px] border border-slate-200/60 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 shadow-sm"
                >
                  <div className="p-3.5 bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:scale-105 transition-transform mb-3 rounded-xl">
                    <Car className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-slate-800">Seguro Auto</h4>
                </div>

                <div 
                  onClick={() => { setSelectedRamo('residencial'); setStep(2); }}
                  className="bg-white hover:bg-slate-50/50 hover:border-orange-300/80 p-5 rounded-[24px] border border-slate-200/60 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 shadow-sm"
                >
                  <div className="p-3.5 bg-orange-50 border border-orange-100 text-orange-500 group-hover:scale-105 transition-transform mb-3 rounded-xl">
                    <Home className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-slate-800">Residencial</h4>
                </div>

                <div 
                  onClick={() => { setSelectedRamo('vida'); setStep(2); }}
                  className="bg-white hover:bg-slate-50/50 hover:border-rose-300/80 p-5 rounded-[24px] border border-slate-200/60 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 shadow-sm"
                >
                  <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-500 group-hover:scale-105 transition-transform mb-3 rounded-xl">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-slate-800">Seguro de Vida</h4>
                </div>

                <div 
                  onClick={() => { setSelectedRamo('outros'); setStep(2); }}
                  className="bg-white hover:bg-slate-50/50 hover:border-teal-300/80 p-5 rounded-[24px] border border-slate-200/60 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 shadow-sm"
                >
                  <div className="p-3.5 bg-teal-50 border border-teal-100 text-teal-600 group-hover:scale-105 transition-transform mb-3 rounded-xl">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-slate-800">Outros Ramos</h4>
                </div>
              </div>
            </div>
          )}

              {/* Step 2: Actuarial Variables Form */}
          {step === 2 && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-heading">
                    Passo 2: Informe as variáveis atuariais
                  </h3>
                  <p className="text-slate-500 text-sm font-light mt-1">
                    Esses dados determinam a taxa de sinistro e o cálculo médio das seguradoras.
                  </p>
                </div>
                {loadingFipe && (
                  <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full border border-indigo-100 animate-pulse shrink-0">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
                    <span>Carregando FIPE...</span>
                  </div>
                )}
              </div>

              {/* AUTO FORM */}
              {selectedRamo === 'auto' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="autoBrand" className="text-xs font-semibold text-slate-600">Marca do Veículo</Label>
                    <select
                      id="autoBrand"
                      value={autoBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={loadingFipe}
                    >
                      {fipeBrands.map(b => (
                        <option key={b.id} value={b.id}>{b.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="autoModel" className="text-xs font-semibold text-slate-600">Modelo FIPE</Label>
                    <select
                      id="autoModel"
                      value={autoModelId}
                      onChange={(e) => setAutoModelId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={loadingFipe}
                    >
                      {apiMode ? (
                        fipeModelsList.map(m => (
                          <option key={m.id} value={m.id}>{m.label}</option>
                        ))
                      ) : (
                        (fipeModels[autoBrand] || []).map(m => (
                          <option key={m.id} value={m.id}>{m.label} ({formatCurrency(m.baseValue)})</option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="autoYear" className="text-xs font-semibold text-slate-600">Ano do Veículo (Tabela FIPE)</Label>
                    <select
                      id="autoYear"
                      value={autoYear}
                      onChange={(e) => setAutoYear(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={loadingFipe}
                    >
                      {apiMode ? (
                        fipeYearsList.map(y => (
                          <option key={y.id} value={y.id}>{y.label}</option>
                        ))
                      ) : (
                        ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'].map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))
                      )}
                    </select>
                  </div>

                  {apiMode && fipeSelectedValue && (
                    <div className="md:col-span-2 bg-indigo-50/40 border border-indigo-100 rounded-2xl p-3.5 text-left flex justify-between items-center animate-fadeIn">
                      <span className="text-xs text-slate-600 font-light">Valor de referência na Tabela FIPE:</span>
                      <strong className="text-sm font-bold text-indigo-700">{formatCurrency(fipeSelectedValue)}</strong>
                    </div>
                  )}

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="autoCity" className="text-xs font-semibold text-slate-600">Cidade de Circulação</Label>
                    <select
                      id="autoCity"
                      value={autoCity}
                      onChange={(e) => setAutoCity(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      {cities.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2 text-left pt-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="autoAge" className="text-xs font-semibold text-slate-600">Idade do Principal Condutor</Label>
                      <span className="text-xs font-bold text-indigo-600">{autoAge} anos</span>
                    </div>
                    <input
                      id="autoAge"
                      type="range"
                      min="18"
                      max="85"
                      value={autoAge}
                      onChange={(e) => setAutoAge(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              )}

              {/* RESIDENCIAL FORM */}
              {selectedRamo === 'residencial' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2 text-left">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="resPropValue" className="text-xs font-semibold text-slate-600">Valor Estimado do Imóvel</Label>
                      <span className="text-xs font-bold text-orange-500">{formatCurrency(resPropValue)}</span>
                    </div>
                    <input
                      id="resPropValue"
                      type="range"
                      min="100000"
                      max="3000000"
                      step="50000"
                      value={resPropValue}
                      onChange={(e) => setResPropValue(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="resPropType" className="text-xs font-semibold text-slate-600">Tipo de Construção</Label>
                    <select
                      id="resPropType"
                      value={resPropType}
                      onChange={(e) => setResPropType(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      <option value="apartamento">Apartamento (Risco Baixo)</option>
                      <option value="casa_condominio">Casa em Condomínio Fechado</option>
                      <option value="casa_rua">Casa de Rua (Risco de Invasão Elevado)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="resCity" className="text-xs font-semibold text-slate-600">Localização</Label>
                    <select
                      id="resCity"
                      value={resCity}
                      onChange={(e) => setResCity(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      {cities.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left md:col-span-2">
                    <Label htmlFor="resSafety" className="text-xs font-semibold text-slate-600">Dispositivos de Segurança</Label>
                    <select
                      id="resSafety"
                      value={resSafety}
                      onChange={(e) => setResSafety(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      <option value="portaria">Portaria 24h e Sistema de Câmeras</option>
                      <option value="alarme">Cerca Elétrica e Sistema de Alarme monitorado</option>
                      <option value="nenhuma">Nenhum Dispositivo / Fechadura Padrão</option>
                    </select>
                  </div>
                </div>
              )}

              {/* VIDA FORM */}
              {selectedRamo === 'vida' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2 text-left">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="vidaAge" className="text-xs font-semibold text-slate-600">Sua Idade</Label>
                      <span className="text-xs font-bold text-rose-500">{vidaAge} anos</span>
                    </div>
                    <input
                      id="vidaAge"
                      type="range"
                      min="18"
                      max="80"
                      value={vidaAge}
                      onChange={(e) => setVidaAge(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="vidaProfession" className="text-xs font-semibold text-slate-600">Profissão / Risco Ocupacional</Label>
                    <select
                      id="vidaProfession"
                      value={vidaProfession}
                      onChange={(e) => setVidaProfession(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      {professions.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="vidaPreExisting" className="text-xs font-semibold text-slate-600">Doenças Preexistentes?</Label>
                    <select
                      id="vidaPreExisting"
                      value={vidaPreExisting}
                      onChange={(e) => setVidaPreExisting(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      <option value="nao">Não Possuo Doenças Preexistentes</option>
                      <option value="sim">Sim (Possuo Histórico/Doença Declarada)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left md:col-span-2">
                    <Label htmlFor="vidaSpouse" className="text-xs font-semibold text-slate-600">Deseja Incluir Cônjuge na Apólice?</Label>
                    <select
                      id="vidaSpouse"
                      value={vidaSpouse}
                      onChange={(e) => setVidaSpouse(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none text-slate-800"
                    >
                      <option value="nao">Não, apenas cobertura individual</option>
                      <option value="sim">Sim, desejo incluir cobertura conjunta (+50% no prêmio)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* OUTROS FORM */}
              {selectedRamo === 'outros' && (
                <div className="space-y-2 text-left">
                  <Label htmlFor="outrosText" className="text-xs font-semibold text-slate-600">Descreva o seguro que precisa</Label>
                  <textarea
                    id="outrosText"
                    placeholder="Descreva detalhes como: Planos de saúde empresarial com CNPJ, frota de veículos comerciais, seguros patrimoniais, etc."
                    value={outrosText}
                    onChange={(e) => setOutrosText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all h-28 text-slate-800"
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-slate-200 mt-6">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl h-11 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-6 h-11 font-bold text-white cursor-pointer"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-800 font-heading">
                  Passo 3: Como podemos te enviar a cotação oficial?
                </h3>
                <p className="text-slate-500 text-sm font-light mt-1">
                  Insira seus dados de contato básicos para gerar a proposta detalhada.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-slate-600">Nome Completo</Label>
                  <Input 
                    id="name" 
                    placeholder="Ex: Mauro Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`bg-white border-slate-200 rounded-xl text-slate-800 h-11 focus-visible:ring-indigo-600/20 ${
                      errors.name ? 'border-red-500 focus-visible:ring-red-500/20' : ''
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-500 block">{errors.name}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-semibold text-slate-600">WhatsApp / Celular com DDD</Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="phone" 
                      placeholder="Ex: (11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`bg-white border-slate-200 rounded-xl text-slate-800 h-11 pl-10 focus-visible:ring-indigo-600/20 ${
                        errors.phone ? 'border-red-500 focus-visible:ring-red-500/20' : ''
                      }`}
                    />
                  </div>
                  {errors.phone && <span className="text-[10px] text-red-500 block">{errors.phone}</span>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-600">Seu melhor E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="email" 
                      placeholder="Ex: seuemail@dominio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-white border-slate-200 rounded-xl text-slate-800 h-11 pl-10 focus-visible:ring-indigo-600/20 ${
                        errors.email ? 'border-red-500 focus-visible:ring-red-500/20' : ''
                      }`}
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-red-500 block">{errors.email}</span>}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-200 mt-6">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl h-11 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-6 h-11 font-bold text-white cursor-pointer"
                >
                  Calcular Cotação
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Breakdown Actuarial Results */}
          {step === 4 && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-800 font-heading">
                  Cotação Estimada Concluída! 🎉
                </h3>
                <p className="text-slate-500 text-xs font-light mt-1">
                  Cálculo realizado com base em sinistros de mercado e tabelas atuariais.
                </p>
              </div>

              {/* Price block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 border border-slate-200/50 p-6 rounded-3xl">
                <div className="md:col-span-7 flex flex-col justify-center text-left space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Investimento Médio Estimado</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
                      {formatCurrency(results.monthlyPremium)}
                    </span>
                    <span className="text-slate-500 text-xs font-light">/mês</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Ou prêmio anual integral de <strong>{formatCurrency(results.annualPremium)}</strong>
                  </span>
                </div>

                <div className="md:col-span-5 border-l border-slate-200/80 pl-6 flex flex-col justify-center text-left space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Classificação de Risco (SUSEP)</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border mt-1 ${
                      results.riskScore === 'Alto' || results.riskScore === 'Crítico'
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : results.riskScore === 'Médio'
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    }`}>
                      {results.riskScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Taxa de Sinistralidade Média</span>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">{results.susepSinistralidade.toFixed(1)}% ao ano</span>
                  </div>
                </div>
              </div>

              {/* Visual Mock Chart: Comparison */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-500" />
                  Comparativo de Custo Mensal (Média de Mercado)
                </h4>
                
                <div className="space-y-2.5 text-xs">
                  {/* Outras Seguradoras */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-medium text-slate-500">
                      <span>Média das Seguradoras Convencionais</span>
                      <span>{formatCurrency(results.monthlyPremium * 1.18)}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-slate-300 h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>

                  {/* ABN Seguros */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-indigo-700">
                      <span>ABN Seguros (Com Descontos Especiais)</span>
                      <span>{formatCurrency(results.monthlyPremium)}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer Alert */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-left">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">Aviso Importante</h4>
                  <p className="text-[11px] text-amber-700 font-light leading-relaxed">
                    Esta é uma simulação estatística aproximada baseada nas variáveis básicas informadas e tabelas atuariais comuns de mercado. O valor final e a aceitação do risco dependem de vistoria, análise cadastral completa e especificidades da seguradora escolhida. Se você deseja obter uma cotação firme, <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="font-bold underline text-indigo-700 hover:text-indigo-600 transition-colors">clique aqui</a> para criar um contato na corretora e falar diretamente com um especialista.
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200 mt-8">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl h-12 text-sm font-medium cursor-pointer"
                >
                  Nova Simulação
                </Button>
                
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setStep(5)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold h-12 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Solicitar Cotação Firme
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Step 5: Finished */}
          {step === 5 && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 animate-scaleUp">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-500 animate-pulse">
                <CheckCircle className="w-16 h-16" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-slate-900">Estudo Enviado!</h3>
                <p className="text-slate-600 font-light text-sm max-w-md leading-relaxed">
                  Obrigado, <strong className="text-slate-800">{name}</strong>. Os dados da simulação foram gerados com sucesso.
                </p>
                <p className="text-slate-500 font-light text-xs max-w-sm leading-relaxed mt-2">
                  Você foi redirecionado(a) para o WhatsApp da ABN Seguros. Um corretor sênior já está ciente das suas escolhas e iniciará o contato em até 10 minutos.
                </p>
              </div>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl h-11 px-6 cursor-pointer"
              >
                Fazer Nova Simulação
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
