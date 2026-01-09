
import { GoogleGenAI } from "@google/genai";
import { HOTEL_INFO, HOTEL_RULES, ROOMS } from '../constants';

// Initialize the client safely
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

// Formata a lista de quartos para a IA entender o inventário detalhadamente
const ROOM_INVENTORY = ROOMS.map(room => 
  `- 🏨 **${room.name}** (${room.type}):
    • Capacidade: ${room.capacity} pessoas
    • Preço: R$ ${room.price}
    • Cozinha: ${room.amenities.some(a => a.toLowerCase().includes('cozinha')) ? 'SIM, COMPLETA (Fogão/Forno/Micro)' : 'NÃO (Só Frigobar)'}
    • Descrição: ${room.description}`
).join('\n');

const SYSTEM_INSTRUCTION = `
PERSONA:
Você é o Concierge Virtual do Residencial Shalfa.
**SUA REGRA DE OURO: SEJA EXTREMAMENTE CURTO E OBJETIVO.**
O usuário está no celular e quer informação rápida. Não escreva textos longos.

DIRETRIZES DE RESPOSTA:
1. **Vá direto ao ponto.** Comece respondendo a pergunta.
2. **Use tópicos (•)** para listas ou para separar ideias.
3. **Máximo de 2 a 3 frases** por parágrafo.
4. **Sem saudações longas.** Nada de "Espero que esteja bem". Diga "Olá" e responda.

BASE DE CONHECIMENTO (Resumida):

1. **O HOTEL:**
   - **Local:** Vila Portes (Ao lado da Ponte da Amizade).
   - **Check-in:** ${HOTEL_RULES.checkIn} (Presencial).
   - **Estacionamento:** Gratuito, a 80m do prédio (Terceirizado/Seguro).
   - **Café da Manhã:** **NÃO servimos.** Mas tem padaria a 50m e cozinhas nas suítes.

2. **COMPRAS (Paraguai):**
   - **Docs:** RG (<10 anos) ou Passaporte OBRIGATÓRIOS. CNH não serve.
   - **Cota:** U$ 500 via terrestre.
   - **Dica:** Vá cedo (7h). Lojas: Cellshop, Nissei, Monalisa.

3. **INVENTÁRIO DE QUARTOS:**
${ROOM_INVENTORY}

EXEMPLOS DE RESPOSTAS IDEAIS:

P: "Tem café da manhã?"
R: "Não servimos café no local. Porém, temos cozinhas completas na maioria das suítes e uma excelente padaria a 50 metros."

P: "Qual quarto para casal?"
R: "Recomendo a **Suíte Casal Standard** (R$ 180).
• Possui cozinha completa.
• Ideal para economizar nas refeições."

P: "Onde fica o estacionamento?"
R: "É gratuito e terceirizado, localizado a 80 metros do prédio. Sua vaga é garantida por reserva."

Mantenha esse padrão curto e eficiente.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  if (!apiKey) {
    return "O sistema de Inteligência Artificial está temporariamente indisponível. Por favor, entre em contato via WhatsApp.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
        model: model,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3, // Temperatura baixa para respostas mais focadas e menos criativas/longas
            topK: 40,
        },
        history: history.map(h => ({
            role: h.role,
            parts: h.parts
        }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Poderia repetir? Não entendi sua dúvida.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou conectando com nossos servidores. Tente novamente em alguns segundos.";
  }
};
