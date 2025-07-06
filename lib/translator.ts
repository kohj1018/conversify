// For an optimal user experience, we want to only load the models when needed.
// We can use a singleton pattern to ensure that we only load the models once.
import { pipeline, TranslationPipeline } from "@xenova/transformers"

class TranslatorSingleton {
  static ko_en_model = "Xenova/opus-mt-ko-en"
  static en_ja_model = "Xenova/opus-mt-en-jap"

  static ko_en_instance: TranslationPipeline | null = null
  static en_ja_instance: TranslationPipeline | null = null

  static async get_ko_en_instance(
    progress_callback?: Function,
  ): Promise<TranslationPipeline> {
    if (this.ko_en_instance === null) {
      this.ko_en_instance = (await pipeline("translation", this.ko_en_model, {
        progress_callback,
      })) as TranslationPipeline
    }
    return this.ko_en_instance
  }

  static async get_en_ja_instance(
    progress_callback?: Function,
  ): Promise<TranslationPipeline> {
    if (this.en_ja_instance === null) {
      this.en_ja_instance = (await pipeline("translation", this.en_ja_model, {
        progress_callback,
      })) as TranslationPipeline
    }
    return this.en_ja_instance
  }
}

export const translate_ko_to_en = async (text: string) => {
  const translator = await TranslatorSingleton.get_ko_en_instance()
  const output = await translator(text, {
    max_new_tokens: 512,
  })
  // @ts-ignore
  return output[0].translation_text
}

export const translate_en_to_ja = async (text: string) => {
  const translator = await TranslatorSingleton.get_en_ja_instance()
  const output = await translator(text, {
    max_new_tokens: 512,
  })
  // @ts-ignore
  return output[0].translation_text
} 