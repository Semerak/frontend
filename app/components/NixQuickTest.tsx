/**
 * Simple Nix Mini 3 Test Component
 * Drop this component into any page to quickly test USB connection
 */

import React, { useState } from 'react';
import { nixTester } from '../utils/nix-mini3-tester';

export default function NixQuickTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);

  const runQuickTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    setTestSuccess(null);

    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const logs: string[] = [];

    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push('ERROR: ' + args.join(' '));
      originalError(...args);
    };

    try {
      const success = await nixTester.testNixMini3Connection();
      setTestSuccess(success);
      setTestResult(logs.join('\n'));
    } catch (error) {
      setTestSuccess(false);
      setTestResult(logs.join('\n') + '\nUnexpected error: ' + error);
    } finally {
      // Restore console
      console.log = originalLog;
      console.error = originalError;
      setIsLoading(false);
    }
  };
  const scanDevices = async () => {
    setIsLoading(true);
    setTestResult(null);
    setTestSuccess(null);

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push('ERROR: ' + args.join(' '));
      originalError(...args);
    };
    try {
      const scanResult = await nixTester.testScanSequence();
      setTestSuccess(scanResult);
      setTestResult(logs.join('\n'));
    } catch (error) {
      setTestSuccess(false);
      setTestResult(logs.join('\n') + '\nScan error: ' + error);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setIsLoading(false);
    }
  };
  const testDebugScan = async () => {
    setIsLoading(true);
    setTestResult(null);
    setTestSuccess(null);

    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push('ERROR: ' + args.join(' '));
      originalError(...args);
    };

    try {
      const debugResult = await nixTester.runDebugScanSequence();
      setTestSuccess(debugResult);
      setTestResult(logs.join('\n'));
    } catch (error) {
      setTestSuccess(false);
      setTestResult(logs.join('\n') + '\nDebug scan error: ' + error);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setIsLoading(false);
    }
  };

  const scanForDevices = async () => {
    setIsLoading(true);
    setTestResult(null);
    setTestSuccess(null);

    const originalLog = console.log;
    const logs: string[] = [];
    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };

    try {
      await nixTester.scanForNixDevices();
      setTestResult(logs.join('\n'));
    } catch (error) {
      setTestResult(logs.join('\n') + '\nScan error: ' + error);
    } finally {
      console.log = originalLog;
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        margin: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ color: '#333', marginTop: 0 }}>🎨 Nix Mini 3 Quick Test</h2>{' '}
      <div style={{ marginBottom: '20px' }}>
        <p>
          <strong>Test the new WebSerial communication features:</strong>
        </p>
        <ul>
          <li>Serial port connection via virtual COM port</li>
          <li>Device unlock and initialization</li>
          <li>Color measurement and CIELAB data retrieval</li>
          <li>Python-equivalent communication protocol</li>
        </ul>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={runQuickTest}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor:
              testSuccess === true
                ? '#4CAF50'
                : testSuccess === false
                  ? '#f44336'
                  : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '10px',
          }}
        >
          {isLoading ? '🔄 Testing...' : '🚀 Test Serial Connection'}
        </button>{' '}
        <button
          onClick={scanForDevices}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '10px',
          }}
        >
          {isLoading ? '🔄 Scanning...' : '🔍 Scan Serial Ports'}
        </button>{' '}
        <button
          onClick={testDebugScan}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#9C27B0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginRight: '10px',
          }}
        >
          {isLoading ? '🔄 Debugging...' : '🐞 Debug Scan Sequence'}
        </button>
        <button
          onClick={async () => {
            setIsLoading(true);
            setTestResult(null);
            setTestSuccess(null);

            const logs: string[] = [];
            const originalLog = console.log;
            const originalError = console.error;

            console.log = (...args) => {
              logs.push(args.join(' '));
              originalLog(...args);
            };

            console.error = (...args) => {
              logs.push('ERROR: ' + args.join(' '));
              originalError(...args);
            };

            try {
              const scanResult = await nixTester.testScanSequence();
              setTestSuccess(scanResult);
              setTestResult(logs.join('\n'));
            } catch (error) {
              setTestSuccess(false);
              setTestResult(logs.join('\n') + '\nColor scan error: ' + error);
            } finally {
              console.log = originalLog;
              console.error = originalError;
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? '🔄 Scanning...' : '🎨 Test Color Scan'}
        </button>
      </div>
      {testResult && (
        <div>
          <h3>Test Results:</h3>
          <pre
            style={{
              backgroundColor:
                testSuccess === true
                  ? '#e8f5e8'
                  : testSuccess === false
                    ? '#ffeaea'
                    : '#f0f0f0',
              padding: '15px',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px',
              fontSize: '12px',
              border: `2px solid ${testSuccess === true ? '#4CAF50' : testSuccess === false ? '#f44336' : '#ddd'}`,
            }}
          >
            {testResult}
          </pre>
        </div>
      )}
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>
          <strong>Requirements:</strong>
        </p>{' '}
        <ul>
          <li>Chrome 89+ or Edge 89+ browser (WebSerial API support)</li>
          <li>HTTPS connection (required for WebSerial API)</li>
          <li>Nix Mini 3 device connected via USB (appears as COM port)</li>
        </ul>
        <p>
          <strong>Expected behavior:</strong>
        </p>
        <ol>
          <li>Browser will show serial port selection dialog</li>
          <li>Select your Nix Mini 3 device (COM port)</li>
          <li>System will establish serial connection at 115200 baud</li>
          <li>Device will be unlocked and tested for color measurement</li>
          <li>Success message will show CIELAB color values</li>
        </ol>
      </div>
    </div>
  );
}
