
import { GoogleGenAI } from "@google/genai";
import { HOTEL_INFO, HOTEL_RULES, ROOMS } from '../constants.ts';

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
  // Always use process.env.API_KEY directly as per guidelines
  if (!process.env.API_KEY) {
    return "No momento estou offline. Mas você pode falar com nossa equipe agora mesmo pelo WhatsApp: " + HOTEL_INFO.phone;
  }

  try {
    // Initialize GoogleGenAI instance right before the call using the named parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role as any, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    // Access the .text property directly as it is a property, not a method
    return response.text || "Desculpe, não consegui processar sua pergunta. Pode repetir?";
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "Estou com uma instabilidade técnica. Por favor, tente novamente em instantes ou chame no WhatsApp.";
  }
};
