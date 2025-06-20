import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';

import NixSerialCommunication from '~/utils/nix-communication';

// Define the color data type
interface ColorData {
  l: number;
  a: number;
  b: number;
}

// Define the color sensor context type
interface ColorSensorContextType {
  scanColor: () => Promise<ColorData | null>;
  isConnected: boolean;
  isScanning: boolean;
  error: string | null;
}

// Define the scan color hook return type
interface UseScanColorReturn {
  trigger: () => void;
  data: ColorData | null;
  isPending: boolean;
  error: string | null;
}

const ColorSensorContext = createContext<ColorSensorContextType | undefined>(
  undefined,
);

export const ColorSensorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nixRef = useRef<NixSerialCommunication | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitializingRef = useRef(false);

  // Initialize connection on first render
  useEffect(() => {
    const initializeConnection = async () => {
      // Prevent multiple initialization attempts (React Strict Mode)
      if (isInitializingRef.current || nixRef.current) {
        console.log('🔄 Skipping duplicate initialization attempt');
        return;
      }

      isInitializingRef.current = true;

      try {
        console.log('🔌 Initializing Nix color sensor connection...');
        nixRef.current = new NixSerialCommunication(true);
        await connectToDevice();
      } catch (err) {
        console.error('❌ Failed to initialize Nix connection:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to initialize connection',
        );
      } finally {
        isInitializingRef.current = false;
      }
    };

    initializeConnection();

    // Cleanup on unmount
    return () => {
      if (nixRef.current) {
        nixRef.current.disconnect().catch(console.error);
        nixRef.current = null;
      }
      isInitializingRef.current = false;
    };
  }, []); // Empty dependency array ensures this only runs once

  const connectToDevice = async (): Promise<boolean> => {
    if (!nixRef.current) {
      throw new Error('Nix communication not initialized');
    }

    try {
      console.log('🔍 Looking for connected Nix devices...');
      const ports = await nixRef.current.getConnectedPorts();
      const nixPorts = ports.filter((p) => p.vendorId === 0x2af6);

      if (nixPorts.length > 0) {
        console.log(`📱 Found ${nixPorts.length} Nix device(s), connecting...`);
        await nixRef.current.connect(nixPorts[0].port);
        setIsConnected(true);
        setError(null);
        console.log('✅ Successfully connected to Nix device');
        return true;
      } else {
        throw new Error('No Nix devices found');
      }
    } catch (err) {
      console.error('❌ Connection failed:', err);
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Connection failed');
      return false;
    }
  };

  const scanColor = async (): Promise<ColorData | null> => {
    if (!nixRef.current) {
      setError('Nix communication not initialized');
      return null;
    }

    setIsScanning(true);
    setError(null);

    try {
      // Check if connected, if not, try to reconnect
      if (!isConnected) {
        console.log('🔄 Device not connected, attempting to reconnect...');
        const connected = await connectToDevice();
        if (!connected) {
          throw new Error('Failed to connect to device');
        }
      }

      console.log('🎯 Starting color scan...');
      // const [l, a, b] = await nixRef.current.scanAndPrint();
      const [l, a, b] = await nixRef.current.getCIELAB();

      console.log(`✅ Scan successful! L*a*b* values: L=${l}, a=${a}, b=${b}`);

      return { l, a, b };
    } catch (err) {
      console.error('❌ Color scan failed:', err);
      setError(err instanceof Error ? err.message : 'Scan failed');
      setIsConnected(false); // Mark as disconnected on error
      return null;
    } finally {
      setIsScanning(false);
    }
  };

  const contextValue: ColorSensorContextType = {
    scanColor,
    isConnected,
    isScanning,
    error,
  };

  return (
    <ColorSensorContext.Provider value={contextValue}>
      {children}
    </ColorSensorContext.Provider>
  );
};

export function useColorSensor() {
  const context = useContext(ColorSensorContext);
  if (!context) {
    throw new Error('useColorSensor must be used within a ColorSensorProvider');
  }
  return context;
}

// New hook for scan color with trigger, data, and isPending
export function useScanColor(): UseScanColorReturn {
  const { scanColor } = useColorSensor();
  const [data, setData] = useState<ColorData | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trigger = useCallback(async () => {
    setIsPending(true);
    setError(null);

    try {
      const result = await scanColor();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
      setData(null);
    } finally {
      setIsPending(false);
    }
  }, [scanColor]);

  return {
    trigger,
    data,
    isPending,
    error,
  };
}
