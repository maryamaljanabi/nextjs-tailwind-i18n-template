import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Github,
  Star,
  Boxes,
  Code2,
  Palette,
  Component,
  Languages,
  Eye,
  Mail,
  Bell,
  Smartphone,
  LineChart,
  Frame,
  FileCode,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { QuickStartCopy } from "@/components/shared/quick-start-copy";

export default function Home() {
  const t = useTranslations();

  const githubRepo =
    "https://github.com/maryamaljanabi/nextjs-tailwind-i18n-template";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-justify">
      <div className="container py-16 lg:max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-gray-500 to-gray-900 bg-clip-text pb-6 text-4xl font-bold text-transparent md:text-5xl">
            {t("homePage.title")}
          </h1>
          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            {t("homePage.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-3 text-lg"
            >
              <Link
                href={githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github size={20} />
                {t("homePage.githubView")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-3 text-lg"
            >
              <Link
                href={`${githubRepo}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Star size={20} />
                {t("homePage.githubStar")}
              </Link>
            </Button>
          </div>

          <QuickStartCopy
            repoUrl={githubRepo}
            quickStartText={t("homePage.quickStart")}
          />
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl">
              {t("homePage.features.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Boxes className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>Next.js 15</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.nextjs")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>TypeScript</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.typescript")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>TailwindCSS v4</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.tailwind")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Component className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>Shadcn UI</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.shadcn")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Languages className="w-8 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>
                      {t("homePage.features.multilanguageStrong")}
                    </strong>
                    <p className="text-gray-700">
                      {t("homePage.features.multilanguage")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Eye className="w-10 h-5 text-gray-700" />
                  <div>
                    <strong>
                      {t("homePage.features.accessibilityStrong")}
                    </strong>
                    <p className="text-gray-700">
                      {t("homePage.features.accessibility")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>{t("homePage.features.contactFormStrong")}</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.contactForm")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>
                      {t("homePage.features.notificationsStrong")}
                    </strong>
                    <p className="text-gray-700">
                      {t("homePage.features.notifications")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>{t("homePage.features.responsiveStrong")}</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.responsive")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <LineChart className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>Google Analytics</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.analytics")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Frame className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>Framer Motion</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.framerMotion")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-3">
                  <FileCode className="w-5 h-5 mt-1 text-gray-700" />
                  <div>
                    <strong>ESLint and Prettier</strong>
                    <p className="text-gray-700">
                      {t("homePage.features.codeQuality")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
