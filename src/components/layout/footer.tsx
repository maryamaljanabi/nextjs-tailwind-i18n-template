import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-border border-t bg-white py-4 text-center text-sm text-gray-600"
      role="contentinfo"
    >
      <div>
        © {currentYear}{" "}
        <Link
          href="https://github.com/maryamaljanabi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 transition-colors hover:text-gray-900 focus:outline-none active:text-gray-900"
          aria-label={`${t("footer.description")} - Maryam Aljanabi`}
        >
          Maryam Aljanabi
        </Link>{" "}
        {t("footer.rights")}
      </div>
    </footer>
  );
}
