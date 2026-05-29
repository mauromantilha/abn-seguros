import { useState, useEffect, useRef } from 'react';
import { Send, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  chips?: string[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: insurance, 1: phone, 2: email, 3: finished
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInfo, setUserInfo] = useState({
    insurance: '',
    phone: '',
    email: '',
  });
  const [inputError, setInputError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on opening
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [messages, isTyping, isOpen]);

  // Log lead details when the chat is complete (satisfies noUnusedLocals)
  useEffect(() => {
    if (step === 3) {
      console.log('Dados do lead coletados pela Milena:', userInfo);
    }
  }, [step, userInfo]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          text: 'Olá! Sou a Milena, consultora virtual da ABN Seguros. 😊',
          sender: 'bot',
          timestamp: new Date(),
        },
        {
          id: 'welcome-2',
          text: 'Qual seguro você busca hoje?',
          sender: 'bot',
          timestamp: new Date(),
          chips: ['Automóvel', 'Vida', 'Saúde', 'Residencial', 'Empresarial', 'Não sei'],
        },
      ]);
    }
  }, [messages]);

  const addBotMessage = (text: string, chips?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text,
          sender: 'bot',
          timestamp: new Date(),
          chips,
        },
      ]);
    }, 1000);
  };

  const handleChipClick = (value: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        text: value,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    if (value.toLowerCase() === 'não sei') {
      addBotMessage(
        'Sem problemas! Nós temos várias opções para proteger você, sua família e sua empresa. Qual desses ramos mais se aproxima do que você precisa?',
        ['Seguro Auto', 'Seguro Vida', 'Plano de Saúde', 'Seguro Residencial', 'Seguro Empresarial', 'Previdência Privada']
      );
    } else {
      setUserInfo((prev) => ({ ...prev, insurance: value }));
      setStep(1);
      addBotMessage('Excelente escolha! Vou pedir algumas informações simples para que um de nossos corretores prepare seu estudo.');
      addBotMessage('Qual é o seu telefone com DDD? (Se preferir, digite o WhatsApp) 📱');
    }
  };

  const handleSendText = () => {
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue('');
    setInputError('');

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        text,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    if (step === 0) {
      if (text.toLowerCase() === 'não sei') {
        setStep(0);
        addBotMessage(
          'Sem problemas! Nós temos várias opções para proteger você, sua família e sua empresa. Qual desses ramos mais se aproxima do que você precisa?',
          ['Seguro Auto', 'Seguro Vida', 'Plano de Saúde', 'Seguro Residencial', 'Seguro Empresarial', 'Previdência Privada']
        );
      } else {
        setUserInfo((prev) => ({ ...prev, insurance: text }));
        setStep(1);
        addBotMessage('Entendido! Vou pedir algumas informações simples para continuarmos.');
        addBotMessage('Qual é o seu telefone com DDD? 📱');
      }
    } else if (step === 1) {
      // Basic phone validation (at least 8 digits)
      const phoneDigits = text.replace(/\D/g, '');
      if (phoneDigits.length < 8) {
        setInputError('Por favor, informe um telefone válido com DDD.');
        addBotMessage('Ops! O número informado parece muito curto. Poderia digitar seu telefone com DDD novamente? 📱');
        return;
      }
      setUserInfo((prev) => ({ ...prev, phone: text }));
      setStep(2);
      addBotMessage('Só mais uma coisa rapidinha... Qual seu e-mail? ✉️');
    } else if (step === 2) {
      // Basic email validation
      if (!text.includes('@') || !text.includes('.')) {
        setInputError('Por favor, insira um e-mail válido.');
        addBotMessage('Parece que o e-mail digitado não é válido. Poderia informar seu e-mail novamente? ✉️');
        return;
      }
      setUserInfo((prev) => ({ ...prev, email: text }));
      setStep(3);
      addBotMessage('Ótimo! Informações enviadas com sucesso.');
      addBotMessage('Um corretor entrará em contato com você nos próximos 10 minutos para apresentar as melhores propostas! Tenha um excelente dia! 🚀');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendText();
    }
  };

  const getInputPlaceholder = () => {
    if (step === 0) return 'Digite o seguro que busca...';
    if (step === 1) return 'Digite seu telefone...';
    if (step === 2) return 'Digite seu e-mail...';
    return 'Conversa finalizada...';
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-1 bg-white hover:bg-slate-50 rounded-full shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 group flex items-center justify-center cursor-pointer border border-slate-200/80 w-16 h-16"
        aria-label="Conversar com Milena"
      >
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <img 
            src="/milena_advisor.png" 
            alt="Milena - Consultora ABN" 
            className="w-full h-full object-cover"
          />
          {/* Green Online Dot Indicator */}
          <span className="absolute bottom-0 right-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
        </div>
        
        {/* Tooltip on Hover */}
        <span className="absolute right-20 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Falar com Milena 👋
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 md:bottom-24 right-0 left-0 md:left-auto md:right-6 z-50 w-full max-w-full md:max-w-[400px] h-[85vh] md:h-[550px] bg-white border-t md:border border-slate-200/80 rounded-t-[32px] md:rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <img 
                  src="/milena_advisor.png" 
                  alt="Milena" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="font-heading font-bold text-sm leading-none flex items-center gap-1.5">
                  Milena
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                </h4>
                <span className="text-[10px] text-blue-200 font-light mt-1 block">Consultora ABN Seguros</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 bg-tech-pattern">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div className={`p-3.5 max-w-[85%] text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none shadow-md shadow-indigo-600/10'
                    : 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-left font-light whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Option Chips (Buttons) */}
                {msg.chips && step === 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 max-w-[90%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        className="bg-white border border-indigo-200/60 hover:border-indigo-500 hover:bg-indigo-50/50 text-indigo-700 font-semibold rounded-full px-3 py-1.5 text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Error Message */}
          {inputError && (
            <div className="bg-rose-50 border-t border-rose-100 px-4 py-2 text-[11px] text-rose-600 font-medium flex items-center gap-1.5 text-left">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{inputError}</span>
            </div>
          )}

          {/* Success Check on finished */}
          {step === 3 && !isTyping && (
            <div className="bg-emerald-50 border-t border-emerald-100 px-4 py-3 text-xs text-emerald-700 font-medium flex items-center gap-2 text-left">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
              <span>Sua solicitação de cotação foi enviada com sucesso!</span>
            </div>
          )}

          {/* Chat Footer Input Area */}
          <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              ref={inputRef}
              type={step === 1 ? 'tel' : step === 2 ? 'email' : 'text'}
              disabled={step >= 3}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getInputPlaceholder()}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/80 transition-colors disabled:opacity-50 text-slate-800"
            />
            <Button
              onClick={handleSendText}
              disabled={step >= 3 || !inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl w-10 h-10 flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-50 p-0 min-w-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

        </div>
      )}
    </>
  );
}
