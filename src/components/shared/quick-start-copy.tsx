"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface QuickStartCopyProps {
  repoUrl: string;
  quickStartText: string;
}

export function QuickStartCopy({
  repoUrl,
  quickStartText,
}: QuickStartCopyProps) {
  const t = useTranslations();
  const cloneCommand = `git clone ${repoUrl}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    toast.success(t("homePage.copied"));
  };

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-lg text-left max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{quickStartText}</span>
        <Button
          size="sm"
          variant="ghost"
          className="text-gray-400 hover:text-white h-6 px-2"
          onClick={handleCopy}
          aria-label={t("homePage.copyCommand")}
        >
          <Copy size={14} />
        </Button>
      </div>
      <code className="text-gray-100 font-mono text-sm">{cloneCommand}</code>
    </div>
  );
}
