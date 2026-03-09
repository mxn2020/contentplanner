// i18n configuration for ContentPlanner
const translations = {
    en: { appName: 'ContentPlanner', description: 'Social media strategist with content pillars' },
    de: { appName: 'ContentPlanner', description: 'Social media strategist with content pillars (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
