import React, { createContext, useContext, useState, useEffect } from 'react';

import { getBrowserInfo } from '~/utils/browser-info';

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
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;

    const defaultConfig = {
      store_name: 'dm',
      store_location: 'D522',
      language: 'de',
      browser_name: getBrowserInfo()?.browser.name || 'unknown',
    };

    const tryFetchConfig = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_LOCAL_URL}/get_config`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }

        const fetchedConfig = await response.json();

        if (mounted) {
          setConfig(fetchedConfig);
          setError(null);
        }
      } catch (err) {
        console.warn('Failed to fetch config, using defaults:', err);
        if (mounted) {
          setConfig(defaultConfig);
          setError(err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    tryFetchConfig();

    return () => {
      mounted = false;
    };
  }, []);

  const defaultConfig = {
    store_name: 'dm',
    store_location: 'D522',
    language: 'de',
  };

  return (
    <ConfigContext.Provider
      value={{ config: config || defaultConfig, isLoading, error }}
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
