import { Button } from "@/components/ui/button";
import {
  Github,
  Star,
  Boxes,
  Palette,
  Component,
  Languages,
  Eye,
  Mail,
  Bell,
  Smartphone,
  LineChart,
  FileCode,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { QuickStartCopy } from "@/components/shared/quick-start-copy";

const githubRepo =
  "https://github.com/maryamaljanabi/nextjs-tailwind-i18n-template";

const features = [
  {
    icon: Boxes,
    iconClass: "w-8 h-5 mt-1 text-gray-700",
    titleKey: "Next.js 15 + TypeScript",
    descriptionKey: "homePage.features.nextjs",
  },
  {
    icon: Palette,
    iconClass: "w-5 h-5 mt-1 text-gray-700",
    titleKey: "TailwindCSS v4",
    descriptionKey: "homePage.features.tailwind",
  },
  {
    icon: Component,
    iconClass: "w-5 h-5 mt-1 text-gray-700",
    titleKey: "Shadcn UI",
    descriptionKey: "homePage.features.shadcn",
  },
  {
    icon: Languages,
    iconClass: "w-8 h-5 mt-1 text-gray-700",
    titleKey: "homePage.features.multilanguageStrong",
    descriptionKey: "homePage.features.multilanguage",
  },
  {
    icon: Eye,
    iconClass: "w-9 h-7 text-gray-700",
    titleKey: "homePage.features.accessibilityStrong",
    descriptionKey: "homePage.features.accessibility",
  },
  {
    icon: Mail,
    iconClass: "w-4 h-5 mt-1 text-gray-700",
    titleKey: "homePage.features.contactFormStrong",
    descriptionKey: "homePage.features.contactForm",
  },
  {
    icon: Bell,
    iconClass: "w-5 h-5 mt-1 text-gray-700",
    titleKey: "homePage.features.notificationsStrong",
    descriptionKey: "homePage.features.notifications",
  },
  {
    icon: Smartphone,
    iconClass: "w-4 h-5 mt-1 text-gray-700",
    titleKey: "homePage.features.responsiveStrong",
    descriptionKey: "homePage.features.responsive",
  },
  {
    icon: LineChart,
    iconClass: "w-4 h-5 mt-1 text-gray-700",
    titleKey: "Google Analytics",
    descriptionKey: "homePage.features.analytics",
  },
  {
    icon: FileCode,
    iconClass: "w-4 h-5 mt-1 text-gray-700",
    titleKey: "ESLint and Prettier",
    descriptionKey: "homePage.features.codeQuality",
  },
];

const actionButtons = [
  {
    href: githubRepo,
    icon: Github,
    textKey: "homePage.githubView",
  },
  {
    href: `${githubRepo}/stargazers`,
    icon: Star,
    textKey: "homePage.githubStar",
  },
];

export default function Home() {
  const t = useTranslations();

  return (
    <div className="container py-16 lg:max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-text-gradient-1 to-text-gradient-2 bg-clip-text pb-6 text-4xl font-bold text-transparent md:text-5xl">
          {t("homePage.title")}
        </h1>
        <p className="mb-8 text-lg text-primary md:text-xl">
          {t("homePage.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {actionButtons.map(({ href, icon: Icon, textKey }) => (
            <Button
              key={href}
              size="lg"
              variant="inverse"
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-lg"
            >
              <Icon size={20} />
              {t(textKey)}
            </Button>
          ))}
        </div>

        <QuickStartCopy
          repoUrl={githubRepo}
          quickStartText={t("homePage.quickStart")}
        />
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-primary md:text-3xl">
            {t("homePage.features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-border-hover transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className={feature.iconClass} />
                    <div>
                      <strong>
                        {feature.titleKey.startsWith("homePage.")
                          ? t(feature.titleKey)
                          : feature.titleKey}
                      </strong>
                      <p className="text-primary">
                        {t(feature.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
