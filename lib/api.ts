import axios from "axios";

const API_BASE_URL = "https://everydayconversify-conversify-model.hf.space";

interface TranslateResponse {
  translated_text: string;
}

interface PronunciationResponse {
  pronunciation_text: string;
}

export const translateEnglish = async (text: string): Promise<string> => {
  try {
    const response = await axios.post<TranslateResponse>(`${API_BASE_URL}/translate`, {
      korean_text: text,
      target_lang: "en",
    });
    return response.data.translated_text;
  } catch (error) {
    console.error("English translation API error:", error);
    throw new Error("영어로 번역 중 오류가 발생했습니다.");
  }
};

export const translateJapanese = async (text: string): Promise<string> => {
  try {
    const response = await axios.post<TranslateResponse>(`${API_BASE_URL}/translate`, {
      korean_text: text,
      target_lang: "ja",
    });
    return response.data.translated_text;
  } catch (error) {
    console.error("Japanese translation API error:", error);
    throw new Error("일본어로 번역 중 오류가 발생했습니다.");
  }
};

export const getJapanesePronunciation = async (japaneseText: string): Promise<string> => {
  try {
    const response = await axios.post<PronunciationResponse>(`${API_BASE_URL}/pronunciation`, {
      japanese_text: japaneseText,
    });
    return response.data.pronunciation_text;
  } catch (error) {
    console.error("Japanese pronunciation API error:", error);
    throw new Error("일본어 발음을 가져오는 중 오류가 발생했습니다.");
  }
}; 