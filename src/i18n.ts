import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

const locales = ['fr', 'en'] as const;
const defaultLocale = 'fr';

type Locale = typeof locales[number];

export default getRequestConfig(async () => {
  const cookieStore = cookies();
    const headersMap = headers();
  let locale = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;

  if (!locale || !locales.includes(locale)) {
    // Parse the Accept-Language header
    const acceptLanguage = headersMap.get('Accept-Language');
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage
        .split(',')[0]
        .trim()
        .split('-')[0]
        .toLowerCase() as Locale;

      // Check if the preferred locale is supported
      if (locales.includes(preferredLocale)) {
        locale = preferredLocale;
      }
    }

    // If no matching locale found or not in allowed locales, use default
    if (!locale || !locales.includes(locale)) {
      locale = defaultLocale;
    }

    // Set the locale as a cookie
    // cookieStore.set('NEXT_LOCALE', locale, {
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 365, // 1 year
    // });
  }

    return {
        locale,
        messages: (await import(`../locales/${locale}.json`)).default,
    };
});
