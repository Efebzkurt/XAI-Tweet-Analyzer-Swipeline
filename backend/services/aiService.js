const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function analyzeWithGPT(text) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Aşağıdaki tweet'in kısa özetini ve duygu analizini yap:\n"${text}"\n\nŞu formatta dön:\nÖzet: ...\nDuygu: olumlu / olumsuz / nötr`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text(); // Get the plain text response

    const summary = textResponse.match(/Özet: (.*)/)?.[1]?.trim();
    const sentiment = textResponse.match(/Duygu: (.*)/)?.[1]?.trim();

    
    if (!summary || !sentiment) {
        console.warn("Gemini response parsing failed for:", textResponse);
        
        return { summary: textResponse, sentiment: "bilinmiyor" }; 
    }

    return { summary, sentiment };
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    
    throw new Error("AI analizi sırasında bir hata oluştu: " + error.message);
  }
}

module.exports = { analyzeWithGPT };