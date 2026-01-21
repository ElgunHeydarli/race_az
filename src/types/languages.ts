export type Language = {
    code: string
    label: string
}

export const languages: Language[] = [
    { code: "az", label: "Azərbaycan" },
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
]

export const LANG_STORAGE_KEY = "langKey" as const;
export const VALID_LANGUAGES = languages.map(lang => lang.code);
    