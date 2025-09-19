// this file contains any server actions required for i18n purposes
"use server";

import { cookies } from "next/headers";
import { LanguageCode, LOCALE_COOKIE_NAME } from "./utils";

export async function setUserLocale(locale: LanguageCode) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale);
}
