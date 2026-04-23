export enum Language {
    English = 'en',
    Japanese = 'ja',
    Chinese = 'zh',
    Korean = 'ko',
    Spanish = 'es',
    Portuguese = 'pt',
}

export const LANGUAGE_DISPLAY_NAMES: Record<Language, string> = {
    [Language.English]: 'English',
    [Language.Japanese]: '日本語',
    [Language.Chinese]: '中文',
    [Language.Korean]: '한국어',
    [Language.Spanish]: 'Español',
    [Language.Portuguese]: 'Português',
} as const;
