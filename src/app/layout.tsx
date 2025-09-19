import { Open_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getDir, LanguageCode } from "@/i18n/utils";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${openSans.variable} ${robotoMono.variable} overflow-x-hidden antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster closeButton />
          <main
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-justify"
            role="main"
          >
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
