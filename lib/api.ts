import axios from "axios";

const API_BASE_URL = "https://everydayconversify-conversify-model.hf.space";

export interface AllInOneTranslationResponse {
  english: string;
  japanese: string;
  pronunciation: string;
}

export const translateAllInOne = async (koreanText: string): Promise<AllInOneTranslationResponse> => {
  try {
    const response = await axios.post<AllInOneTranslationResponse>(`${API_BASE_URL}/translate`, {
      text: koreanText,
    });
    return response.data;
  } catch (error) {
    console.error("All-in-one translation API error:", error);
    // 더 구체적인 에러 메시지를 제공할 수 있음.
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error data:", error.response.data);
      throw new Error(error.response.data.error || "번역 중 서버에서 오류가 발생했습니다.");
    }
    throw new Error("번역 요청 중 알 수 없는 오류가 발생했습니다.");
  }
}; 