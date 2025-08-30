import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale = cookieStore.get("locale")?.value;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  try {
    const messages = (await import(`./translations/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);

    const fallbackMessages = (await import(`./translations/en.json`)).default;
    return {
      locale: routing.defaultLocale,
      messages: fallbackMessages,
    };
  }
});
