"use client";

import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    toast.success(t("homePage.copied"));
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="mt-8 p-4 bg-primary rounded-lg text-left max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-secondary/60 text-sm">{quickStartText}</span>
        <Button
          size="sm"
          variant="ghost"
          className={`text-secondary/60 hover:text-secondary h-6 px-2 transition-colors duration-300 ${copied ? "text-success hover:text-success" : ""}`}
          onClick={handleCopy}
          aria-label={t("homePage.copyCommand")}
        >
          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
        </Button>
      </div>
      <code className="text-secondary font-mono text-sm">{cloneCommand}</code>
    </div>
  );
}
