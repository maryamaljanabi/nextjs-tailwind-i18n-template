import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

interface LocalizedMetadataParams {
  namespace?: string;
  titleKey: string;
  descriptionKey?: string;
}

export async function generateLocalizedMetadata({
  namespace = "",
  titleKey,
  descriptionKey,
}: LocalizedMetadataParams): Promise<Metadata> {
  const t = await getTranslations();

  const title = `${t(`${namespace}.metadata.${titleKey}`)}`;
  const description = descriptionKey
    ? t(`${namespace}.metadata.${descriptionKey}`)
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
