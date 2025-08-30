import { ContactForm } from "@/components/contact/contact-form";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <div className="container px-4 py-12 lg:max-w-4xl">
      <div className="mb-12 text-center">
        <h1
          className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text pb-6 text-4xl font-bold text-transparent md:text-5xl"
          aria-label={t("contactPage.title")}
        >
          {t("contactPage.title")}
        </h1>
        <p className="text-gray-600">{t("contactPage.subtitle")}</p>
      </div>

      <ContactForm />
    </div>
  );
}
