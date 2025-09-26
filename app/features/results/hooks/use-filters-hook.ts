import { useEffect, useMemo, useState } from 'react';

export interface FilterState {
  coverage: string[];
  category: string[];
  others: string[];
}

const FILTERS_KEY = 'app_filters';

export function useFilters(initialState?: Partial<FilterState>) {
  const [filters, setFiltersState] = useState<FilterState>(() => {
    try {
      const saved = localStorage.getItem(FILTERS_KEY);
      if (saved) return JSON.parse(saved) as FilterState;
    } catch (e) {
      console.warn('Failed to parse saved filters:', e);
    }
    return {
      coverage: [],
      category: [],
      others: ['Available'],
      ...initialState,
    };
  });

  useEffect(() => {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  }, [filters]);

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    const cleared = { coverage: [], category: [], others: [] };
    setFiltersState(cleared);
    localStorage.removeItem(FILTERS_KEY);
  };

  const clearCache = () => {
    localStorage.removeItem(FILTERS_KEY);
  };

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((arr) => arr.length > 0),
    [filters],
  );

  return {
    filters,
    setFilters,
    clearAllFilters,
    hasActiveFilters,
    clearCache,
  };
}
