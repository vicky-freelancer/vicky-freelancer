import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash for speed and cost-efficiency with long context window for audio
const MODEL_NAME = 'gemini-2.5-flash';

export const transcribeMedia = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    // Clean base64 string if it contains the data URL prefix
    const cleanBase64 = base64Data.split(',')[1] || base64Data;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          },
          {
            text: "Please transcribe this media file verbatim. Return ONLY the transcription text, no preamble or markdown formatting blocks."
          }
        ]
      }
    });

    return response.text || "No transcription generated.";
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe media. Please ensure the file format is supported and the API key is valid.");
  }
};

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};