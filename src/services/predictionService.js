import api, { useMockApi } from './api';

const generateMockPrediction = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic mock logic to generate a realistic number based on carat
      const baseValue = 50000;
      const caratMultiplier = data.carat * data.carat * 80000;
      
      let typeMultiplier = 1;
      if (data.type === 'Blue Sapphire') typeMultiplier = 2.5;
      if (data.type === 'Ruby') typeMultiplier = 3.0;
      if (data.type === 'Alexandrite') typeMultiplier = 4.0;

      const estimatedValue = Math.round((baseValue + caratMultiplier) * typeMultiplier);
      const minRange = Math.round(estimatedValue * 0.9);
      const maxRange = Math.round(estimatedValue * 1.1);
      
      let marketStatus = "Fairly Valued";
      let difference = 0;
      
      if (data.sellerPrice) {
        const sellerPrice = parseFloat(data.sellerPrice);
        difference = ((sellerPrice - estimatedValue) / estimatedValue) * 100;
        
        if (difference > 15) {
          marketStatus = "Potentially Overvalued";
        } else if (difference < -15) {
          marketStatus = "Potentially Undervalued";
        }
      }

      resolve({
        success: true,
        data: {
          estimatedValue,
          minRange,
          maxRange,
          confidence: 87 + Math.floor(Math.random() * 8), // 87-94%
          marketStatus,
          difference: parseFloat(difference.toFixed(1)),
          summary: data
        }
      });
    }, 2500); // 2.5s delay to simulate ML analysis
  });
};

export const predictGemPrice = async (predictionData) => {
  if (useMockApi) {
    return generateMockPrediction(predictionData);
  }
  
  try {
    const response = await api.post('/predict', predictionData);
    return response.data;
  } catch (error) {
    console.error("Prediction failed:", error);
    throw error;
  }
};
