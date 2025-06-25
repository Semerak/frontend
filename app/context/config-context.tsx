import React, { createContext, useContext } from 'react';

import { useConfigQuery } from '~/features/config-load/hooks/use-config';

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

  const defaultConfig = {
    store_name: 'dm',
    store_location: 'D522',
    language: 'de',
  };

  return (
    <ConfigContext.Provider
      value={{ config: error ? defaultConfig : config, isLoading, error }}
    >
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
