"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ChevronDown, Globe } from "lucide-react";
import { getDir, LANGUAGE_CODES, LanguageCode } from "@/i18n/utils";
import { setUserLocale } from "@/i18n/actions";

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dir = getDir(locale as LanguageCode);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = async (lang: LanguageCode) => {
    await setUserLocale(lang);
    setIsOpen(false);
    router.refresh();
  };

  const getCurrentLanguageText = () => {
    return locale === "en" ? "EN" : "AR";
  };

  return (
    <div
      className="relative"
      ref={menuRef}
      role="navigation"
      aria-label={t("language.english") + " / " + t("language.arabic")}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-muted focus:outline-none"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-label={`${t(`language.${locale}`)} - ${t("language.english")} / ${t("language.arabic")}`}
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{getCurrentLanguageText()}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-32 overflow-hidden rounded-md bg-background shadow-lg ring-1 ring-muted focus:outline-none ${dir === "ltr" ? "right-0" : "left-0"}`}
          role="menu"
          id="language-menu"
          aria-orientation="vertical"
          aria-labelledby="language-button"
        >
          {LANGUAGE_CODES.map((lang, index) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                locale === lang ? "bg-secondary text-primary" : "text-primary"
              } ${
                index === 0
                  ? "rounded-b-none"
                  : index === LANGUAGE_CODES.length - 1
                    ? "rounded-t-none"
                    : "rounded-none"
              }`}
              role="menuitem"
              aria-current={locale === lang}
            >
              {t(`language.${lang}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
