export const locales = ["en", "kh"] as const;
export type Locale = (typeof locales)[number];

export async function getMessages(locale: Locale) {
  const { translations } = await import(`./translations`);
  return translations[locale];
}
export type Messages = Awaited<ReturnType<typeof getMessages>>;
