import { GoogleGenAI } from "@google/genai";
import { HOTEL_INFO, HOTEL_RULES, ROOMS } from '../constants';

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const ROOM_INVENTORY = ROOMS.map(room => 
  `- 🏨 **${room.name}** (${room.type}):
    • Capacidade: ${room.capacity} pessoas
    • Preço: R$ ${room.price}
    • Cozinha: ${room.amenities.some(a => a.toLowerCase().includes('cozinha')) ? 'SIM, COMPLETA' : 'NÃO (Só Frigobar)'}
    • Descrição: ${room.description}`
).join('\n');

const SYSTEM_INSTRUCTION = `
PERSONA:
Você é o Concierge Virtual do Residencial Shalfa em Foz do Iguaçu.
SEJA CURTO E OBJETIVO. Máximo 3 frases.

CONHECIMENTO:
1. HOTEL: Localizado na Vila Portes (R. Cassiano Ricardo, 675). Check-in: ${HOTEL_RULES.checkIn}. Sem café da manhã. Estacionamento grátis a 80m.
2. QUARTOS: 
${ROOM_INVENTORY}
3. TURISMO/COMPRAS: Use a ferramenta de busca do Google para dar informações atualizadas sobre horários de lojas no Paraguai ou eventos em Foz se o usuário perguntar.

Sempre priorize vender uma reserva no Residencial Shalfa.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  if (!apiKey) return "Sistema offline. Fale conosco no WhatsApp: " + HOTEL_INFO.phone;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const text = response.text || "Poderia repetir? Não entendi sua dúvida.";
    
    // Se houver chunks de grounding (links do Google), poderíamos listá-los, 
    // mas para o chat vamos manter o texto limpo.
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Estou reconectando. Pode tentar de novo?";
  }
};