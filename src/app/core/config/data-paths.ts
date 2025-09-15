export type LangCode = 'pt-BR' | 'en';

export const DATA_PATHS = {
  shared: '/shared.json',
  byLang: {
    'pt-BR': '/data.pt-BR.json',
    en: '/data.en.json',
  },
} as const;
