export type LangCode = 'pt-BR' | 'en';

export const DATA_PATHS = {
  shared: '/assets/data/shared.json',
  byLang: {
    'pt-BR': '/assets/data/data.pt-BR.json',
    en: '/assets/data/data.en.json',
  },
} as const;
