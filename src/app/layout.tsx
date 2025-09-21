import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/layout/footer";
import { getDir, LanguageCode } from "@/i18n/utils";
import { Navbar } from "@/components/layout/navbar";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");

  return {
    title: {
      template: `%s | ${t("metadata.siteName")}`,
      default: t("metadata.siteName"),
    },
    description: t("metadata.siteDescription"),
    keywords: t("metadata.siteKeywords"),
    openGraph: {
      type: "website",
      siteName: t("metadata.siteName"),
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  if (!routing.locales.includes(locale as LanguageCode)) {
    notFound();
  }
  const messages = await getMessages();
  const dir = getDir(locale as LanguageCode);

  return (
    <html lang={locale} dir={dir}>
      <body className={`${openSans.variable} overflow-x-hidden antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Toaster closeButton />
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
          <Navbar />
          <main
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-justify"
            role="main"
          >
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
