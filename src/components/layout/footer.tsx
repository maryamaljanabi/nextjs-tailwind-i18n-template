import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-border border-t bg-background py-4 text-center text-sm text-primary"
      role="contentinfo"
    >
      <div>
        © {currentYear}{" "}
        <Link
          href="https://github.com/maryamaljanabi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors hover:text-foreground focus:outline-none active:text-foreground"
          aria-label={`${t("footer.description")} - Maryam Aljanabi`}
        >
          Maryam Aljanabi
        </Link>{" "}
        {t("footer.rights")}
      </div>
    </footer>
  );
}
