import { useState, useMemo } from 'react';

export interface FilterState {
  coverage: string[];
  category: string[];
  others: string[];
}

export function useFilters(initialState?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>({
    coverage: [],
    category: [],
    others: [],
    ...initialState,
  });

  const clearAllFilters = () => {
    setFilters({ coverage: [], category: [], others: [] });
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
  };
}
