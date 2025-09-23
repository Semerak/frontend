export const FILTER_CONFIG = {
  coverage: {
    labelKey: 'results.filters.coverage',
    optionKeys: [
      'results.filters.coverageOptions.full',
      'results.filters.coverageOptions.medium',
      'results.filters.coverageOptions.light',
    ] as string[],
  },
  category: {
    labelKey: 'results.filters.category',
    optionKeys: [
      'results.filters.categoryOptions.bb-cream-cc-cream',
      'results.filters.categoryOptions.concealer',
      'results.filters.categoryOptions.foundation',
      'results.filters.categoryOptions.highlighter',
      'results.filters.categoryOptions.powder',
    ] as string[],
  },
  others: {
    labelKey: 'results.filters.other',
    optionKeys: [
      'results.filters.otherOptions.vegan',
      'results.filters.otherOptions.alcohol-free',
      'results.filters.otherOptions.natural',
      'results.filters.otherOptions.available',
    ] as string[],
  },
} as const;
