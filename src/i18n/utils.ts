export type LanguageCode = "en" | "ar";
export const LANGUAGE_CODES: readonly LanguageCode[] = ["en", "ar"];
export const LOCALE_COOKIE_NAME = "locale";
// Add more RTL languages as needed
export const RTL_LANGUAGES: readonly LanguageCode[] = ["ar"];
export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const getDir = (locale: LanguageCode) =>
  RTL_LANGUAGES.includes(locale) ? "rtl" : "ltr";
