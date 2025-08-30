import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from "./utils";

export const routing = defineRouting({
  locales: LANGUAGE_CODES,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: "never",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
