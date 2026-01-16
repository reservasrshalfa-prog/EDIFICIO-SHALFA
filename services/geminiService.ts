
import { GoogleGenAI } from "@google/genai";
import { HOTEL_INFO, HOTEL_RULES, ROOMS } from '../constants';

// Formata a lista de quartos para a IA entender o inventário detalhadamente
const ROOM_INVENTORY = ROOMS.map(room => 
  `- 🏨 **${room.name}** (${room.type}):
    • Capacidade: ${room.capacity} pessoas
    • Preço: R$ ${room.price}
    • Cozinha: ${room.amenities.some(a => a.toLowerCase().includes('cozinha')) ? 'SIM, COMPLETA (Fogão/Forno/Micro)' : 'NÃO (Só Frigobar)'}
    • Descrição: ${room.description}`
).join('\n');

const getSystemInstruction = (lang: string) => {
  const languageNames: Record<string, string> = {
    pt: 'Português',
    en: 'English',
    es: 'Español'
  };
  
  const currentLangName = languageNames[lang] || 'Português';

  return `
PERSONA:
You are the Virtual Concierge of Residencial Shalfa.
**YOUR GOLDEN RULE: BE EXTREMELY SHORT AND OBJECTIVE.**
The user is on a mobile device and wants quick information. Do not write long texts.
**IMPORTANT: You must respond ALWAYS in ${currentLangName}.**

DIRETRIZES DE RESPOSTA (Guidelines):
1. **Direct to the point.** Start by answering the question.
2. **Use bullets (•)** for lists.
3. **Maximum 2 to 3 sentences** per paragraph.
4. **No long greetings.** Just a quick "Hello" or go straight to the answer.

BASE DE CONHECIMENTO (Resumida):

1. **O HOTEL:**
   - **Local:** Vila Portes, Foz do Iguaçu (Next to the Friendship Bridge/Paraguay).
   - **Check-in:** ${HOTEL_RULES.checkIn}.
   - **Parking:** Free, 80m from the building (Secure).
   - **Breakfast:** **NOT served.** We have full kitchens in most suites and a bakery 50m away.

2. **SHOPPING (Paraguay):**
   - **Docs:** Passport or ID Card (less than 10 years old) MANDATORY.
   - **Quota:** U$ 500 via land.

3. **ROOM INVENTORY:**
${ROOM_INVENTORY}

Respond in ${currentLangName} keeping the objective tone.
`;
};

export const sendMessageToGemini = async (
    history: {role: string, parts: {text: string}[]}[], 
    message: string,
    language: string = 'pt'
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "O sistema de Inteligência Artificial está temporariamente indisponível.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelName = 'gemini-3-flash-preview';
    
    const chat = ai.chats.create({
        model: modelName,
        config: {
            systemInstruction: getSystemInstruction(language),
            temperature: 0.3,
            topK: 40,
        },
        history: history.map(h => ({
            role: h.role,
            parts: h.parts
        }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Poderia repetir?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro de conexão. Tente novamente.";
  }
};
