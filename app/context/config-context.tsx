import React, { createContext, useContext } from 'react';

import { useConfigQuery } from '../features/config-load/config-api';

// Define the config context type
interface ConfigContextType {
  config: any;
  isLoading: boolean;
  error: unknown;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: config, isLoading, error } = useConfigQuery();

  return (
    <ConfigContext.Provider value={{ config, isLoading, error }}>
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
