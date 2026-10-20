import { useMockApi } from './api';

const generateMockResponse = (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
      let reply = "That's an interesting question about gemstones. GemSense AI analyzes characteristics like color, clarity, carat, and cut to provide market insights. Could you be more specific about which aspect of gemstone valuation you'd like to learn about?";

      if (lowerMsg.includes("sapphire") && lowerMsg.includes("price")) {
        reply = "Sapphire prices are primarily driven by their color (specifically hue, tone, and saturation). For blue sapphires, a vivid 'Cornflower' or 'Royal Blue' commands the highest premium. Clarity is also important, but color is the dominant factor. Unheated sapphires will also carry a significant premium over heated ones.";
      } else if (lowerMsg.includes("heat treatment") || lowerMsg.includes("heated")) {
        reply = "Heat treatment is a standard industry practice used to improve a gemstone's color or clarity. While heat-treated gems are perfectly acceptable and make up the majority of the market, unheated (natural) gemstones of equal quality are much rarer and therefore significantly more valuable.";
      } else if (lowerMsg.includes("clarity")) {
        reply = "Clarity grades describe the presence of internal inclusions or external blemishes. Common grades include VVS (Very Very Slightly Included) to I (Included). The impact of clarity on value varies by gem type; for instance, inclusions are expected in Emeralds but highly penalized in Aquamarines.";
      } else if (lowerMsg.includes("care") || lowerMsg.includes("clean")) {
        reply = "Most hard gemstones like Sapphires and Rubies (Corundum) can be safely cleaned with warm soapy water and a soft brush. However, softer or porous gems like Emeralds, Pearls, or Opals require special care and should never be put in an ultrasonic cleaner.";
      } else if (lowerMsg.includes("buy") || lowerMsg.includes("check before")) {
        reply = "Before buying a gemstone, always check the '4 Cs' (Color, Clarity, Cut, Carat) and ask for disclosure of any treatments. For significant purchases, insist on an independent laboratory report from a recognized gemological authority (like GIA, GRS, or a reputed local lab).";
      }

      resolve({
        success: true,
        text: reply
      });
    }, 1500); // simulate network delay
  });
};

export const sendAdvisorMessage = async (message) => {
  if (useMockApi) {
    return generateMockResponse(message);
  }
  
  // Real implementation will call FastAPI backend which then calls Gemini
  // try {
  //   const response = await api.post('/advisor/chat', { message });
  //   return response.data;
  // } catch (error) { ... }
  
  return generateMockResponse(message); // Fallback to mock for now
};
