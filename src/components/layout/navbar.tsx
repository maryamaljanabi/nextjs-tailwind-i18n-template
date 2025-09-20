import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "../shared/language-switcher";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations();

  return (
    <header
      className="sticky top-0 z-40 w-full border-border border-b bg-background"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label={t("navbar.home")}
          >
            <Image
              src="/logo.svg"
              alt={t("navbar.home")}
              width={32}
              height={32}
            />
          </Link>
        </div>

        <nav className="flex items-center space-x-4" role="navigation">
          <Link
            href="/contact"
            className="px-3 py-2 text-sm font-medium text-primary transition-colors hover:text-foreground focus:outline-none active:text-foreground"
            aria-label={t("navbar.contactUs")}
          >
            {t("navbar.contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
