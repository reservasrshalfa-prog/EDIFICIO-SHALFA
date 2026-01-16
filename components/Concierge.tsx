
import { useLanguage } from "../contexts/LanguageContext";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendMessageToGemini } from "../services/geminiService";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "Qual o melhor quarto para família?",
  "Fica perto do Paraguai?",
  "Tem estacionamento?",
  "Quais quartos têm cozinha?",
  "Aceitam check-in de madrugada?"
];

const Concierge: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "model",
      text: language === 'en' 
        ? "Hello. I am the Virtual Concierge of **Residencial Shalfa**. \n\nHow can I help you today?" 
        : language === 'es'
        ? "Hola. Soy el Conserje Virtual de **Residencial Shalfa**. \n\n¿Como posso ayudarte hoy?"
        : "Olá. Sou o Concierge Virtual do **Residencial Shalfa**. \n\nEstou aqui para ajudar a escolher a suíte perfeita ou tirar dúvidas sobre sua viagem a Foz. Como posso servir você hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("concierge_tooltip_dismissed");
    if (dismissed === "true") setIsDismissed(true);
  }, []);

  useEffect(() => {
    if (isOpen || isDismissed) {
        setShowTooltip(false);
        return;
    }
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const startLoop = () => {
        showTimer = setTimeout(() => {
            if (isOpen || isDismissed) return;
            setShowTooltip(true);
            hideTimer = setTimeout(() => {
                setShowTooltip(false);
                startLoop();
            }, 8000);
        }, 15000); 
    };
    startLoop();
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [isOpen, isDismissed]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleDismissTooltip = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowTooltip(false);
      setIsDismissed(true);
      localStorage.setItem("concierge_tooltip_dismissed", "true");
  };

  const processMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    try {
      const responseText = await sendMessageToGemini(history, userMessage.text, language);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendClick = () => {
    processMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[9990] flex flex-col items-end pointer-events-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="pointer-events-auto mb-6 w-[calc(100vw-32px)] sm:w-[380px] h-[75vh] sm:max-h-[600px] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-white/10 relative bg-dark-900"
          >
            {/* Professional Dark Header */}
            <div className="relative z-10 px-6 py-4 border-b border-white/5 bg-dark-950 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center border border-brand-600">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-dark-950 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-serif text-base tracking-wide">Shalfa Concierge</h3>
                  <p className="text-[10px] text-brand-400 uppercase tracking-widest font-bold">Online Agora</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-5 space-y-6 bg-dark-900/95 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === 'model' && (
                      <div className="w-6 h-6 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center flex-shrink-0 mt-2">
                          <Bot size={12} className="text-brand-400" />
                      </div>
                  )}
                  
                  <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-brand-700 text-white rounded-2xl rounded-tr-sm"
                        : "bg-dark-800 border border-white/5 text-gray-200 rounded-2xl rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-200 font-bold">$1</strong>').replace(/\n/g, '<br/>') }} />
                  </div>

                  {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-brand-900/50 flex items-center justify-center flex-shrink-0 mt-2">
                          <User size={12} className="text-brand-500" />
                      </div>
                  )}
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center flex-shrink-0">
                      <Bot size={12} className="text-brand-400" />
                   </div>
                   <div className="bg-dark-800 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="relative z-10 p-4 bg-dark-950 border-t border-white/5">
                {/* Suggestions Pills */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar mask-gradient-right">
                    {SUGGESTIONS.map((suggestion, idx) => (
                        <button
                            key={idx}
                            onClick={() => processMessage(suggestion)}
                            className="flex-shrink-0 text-[10px] font-medium px-3 py-1.5 rounded-md border border-white/10 text-gray-400 hover:bg-brand-900/50 hover:text-brand-300 hover:border-brand-800 transition-all whitespace-nowrap bg-dark-900"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={language === 'en' ? "Type your question..." : language === 'es' ? "Escribe tu duda..." : "Digite sua dúvida..."}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg pl-4 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/50 transition-all placeholder-gray-600 font-light"
                    />
                    <button
                        onClick={handleSendClick}
                        disabled={loading || !input.trim()}
                        className="absolute right-2 p-2 bg-brand-700 rounded-md text-white hover:bg-brand-600 disabled:opacity-50 disabled:bg-transparent disabled:text-gray-600 transition-all"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Action Button */}
      <div className="relative pointer-events-auto">
        <AnimatePresence>
            {!isOpen && showTooltip && (
                <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    className="absolute bottom-2 right-[calc(100%+16px)] bg-dark-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-4 whitespace-nowrap border border-white/10 cursor-pointer group"
                    onClick={toggleChat}
                >
                    <div>
                        <p className="font-serif text-sm text-brand-100">{language === 'en' ? "Can I help you?" : language === 'es' ? "¿Puedo ayudarte?" : "Posso ajudar?"}</p>
                        <p className="text-[9px] text-brand-500 font-bold uppercase tracking-widest">Concierge Online</p>
                    </div>
                    <button onClick={handleDismissTooltip} className="text-gray-500 hover:text-white transition-colors p-1">
                        <X size={14} />
                    </button>
                    {/* Arrow */}
                    <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-dark-900 rotate-45 border-t border-r border-white/10"></div>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl shadow-black/50 flex items-center justify-center transition-all duration-300 relative group overflow-hidden border border-white/10 ${isOpen ? 'bg-dark-800 text-gray-400' : 'bg-brand-700 text-white'}`}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Ping animation ring */}
            {!isOpen && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-20 animate-ping"></span>
            )}
            
            {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" className="text-white/90" />}
        </motion.button>
      </div>
    </div>
  );
};

export default Concierge;
