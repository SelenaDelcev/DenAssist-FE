import React from "react";
import TranslationsProvider from "@/lib/TranslationsProvider";
import initTranslations from "@/app/i18n";
import ChatPageClient from "./ChatpageClient";

const i18nNamespaces = ["common"];

export default async function ChatPageServer({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const translatedStrings = {
    userShortcutsTitle: t("userShortcuts"),
    toolsTitle: t("Tools"),
  };

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <ChatPageClient translatedStrings={translatedStrings} locale={locale} />
    </TranslationsProvider>
  );
}
