import { Open_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
  return (
    <html>
      <body
        className={`${openSans.variable} ${robotoMono.variable} overflow-x-hidden antialiased`}
      >
        <Toaster closeButton />
        <main
          className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-justify"
          role="main"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
