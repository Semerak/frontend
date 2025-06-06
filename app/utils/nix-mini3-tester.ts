/**
 * Simple Nix Mini 3 Connection Test
 * Run this script to test the new WebSerial communication features
 */

import { NixSerialCommunication } from './nix-communication';

// Declare SerialPort type locally
interface SerialPort {
  readable: ReadableStream<Uint8Array> | null;
  writable: WritableStream<Uint8Array> | null;
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  getInfo(): { usbVendorId?: number; usbProductId?: number };
}

export class NixMini3Tester {
  private nix: NixSerialCommunication;

  constructor() {
    this.nix = new NixSerialCommunication(true); // Enable debug logging
  }
  /**
   * Quick test for Nix Mini 3 connection
   * This is the main test you should run first
   */
  async testNixMini3Connection(): Promise<boolean> {
    console.log('🎨 Nix Mini 3 Connection Test Starting...');
    console.log('='.repeat(50));

    try {
      // Step 1: Check browser support
      if (!this.nix.isWebSerialSupported()) {
        console.error('❌ Web Serial API not supported in this browser');
        console.log('💡 Try using Chrome 89+ or Edge 89+');
        return false;
      }
      console.log('✅ Web Serial API supported');

      // Step 2: Check for existing connected devices
      console.log('\n📱 Checking for previously connected serial ports...');
      const existingPorts = await this.nix.getConnectedPorts();
      const nixPorts = existingPorts.filter((p) => p.vendorId === 0x2af6);

      if (nixPorts.length > 0) {
        console.log(
          `✅ Found ${nixPorts.length} Nix device(s) already granted access`,
        );

        // Try to connect to existing device first
        for (const nixPort of nixPorts) {
          console.log(`\n🔌 Attempting connection to existing Nix device...`);
          if (await this.attemptConnection(nixPort.port)) {
            return true;
          }
        }
      } else {
        console.log('📝 No previously connected Nix devices found');
      } // Step 3: Request new device access
      console.log(
        '\n🔍 Requesting device access (browser dialog will appear)...',
      );
      console.log('💡 Select your Nix Mini 3 device in the browser dialog');

      const portInfo = await this.nix.requestNixDevice();

      console.log(`✅ Device selected: Nix Device (Serial)`);
      console.log(
        `   Vendor ID: 0x${(portInfo.vendorId || 0).toString(16).padStart(4, '0')}`,
      );
      console.log(
        `   Product ID: 0x${(portInfo.productId || 0).toString(16).padStart(4, '0')}`,
      );

      // Step 4: Attempt connection with all strategies
      return await this.attemptConnection(portInfo.port);
    } catch (error) {
      console.error('❌ Test failed:', error);
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Make sure Nix Mini 3 is connected via USB');
      console.log('2. Close any other applications using the device');
      console.log('3. Try disconnecting and reconnecting the USB cable');
      console.log('4. Refresh the page and try again');
      return false;
    }
  }
  /**
   * Attempt connection using WebSerial API
   */
  private async attemptConnection(port: SerialPort): Promise<boolean> {
    console.log('\n🚀 Testing Serial Connection...');

    try {
      // Connect to the serial port
      await this.nix.connect(port);

      if (this.nix.isConnected()) {
        console.log('🎉 SUCCESS! Connected to Nix Mini 3 via Serial');

        // Run quick diagnostics - test basic communication
        console.log('\n🔍 Running device diagnostics...');

        try {
          // Test device name
          const name = await this.nix.getName();
          console.log(`✅ Device Name: ${name}`);

          // Test version
          const version = await this.nix.getVersion();
          console.log(`✅ Device Version: ${version}`);

          // Test scan functionality
          console.log('🔬 Testing scan functionality...');
          const scanResult = await this.nix.scanAndPrint();
          console.log('✅ Scan test completed'); // Test CIELAB reading
          const cielabData = await this.nix.getCIELAB();
          console.log(
            `✅ CIELAB Values: L=${cielabData[0]}, a=${cielabData[1]}, b=${cielabData[2]}`,
          );
        } catch (diagError) {
          console.warn('⚠️ Some diagnostic tests failed:', diagError);
        }

        // Clean disconnect
        await this.nix.disconnect();
        console.log('✅ Disconnected cleanly');

        console.log(
          '\n🎊 TEST PASSED! Your Nix Mini 3 serial connection is working!',
        );
        console.log(
          '📝 Next: Device is ready for color measurement operations',
        );

        return true;
      } else {
        console.error('❌ Connection established but device not ready');
        return false;
      }
    } catch (error) {
      console.error('❌ Serial connection failed:', error);

      // Provide specific troubleshooting for serial connection issues
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (
        errorMessage.includes('Access denied') ||
        errorMessage.includes('Failed to open')
      ) {
        console.log('\n🔧 Serial Port Access Issues Detected:');
        console.log(
          'This suggests the device may be in use by another application.',
        );
        console.log('Try these steps:');
        console.log(
          '1. Close any Nix software or serial terminal applications',
        );
        console.log('2. Disconnect and reconnect the USB cable');
        console.log('3. Try a different USB port');
        console.log('4. Restart your browser');
        console.log(
          '5. Check if the device appears as a COM port in Device Manager',
        );
      }

      return false;
    }
  }
  /**
   * Quick device scan - useful for debugging
   */
  async scanForNixDevices(): Promise<void> {
    console.log('🔍 Scanning for Nix serial devices...');

    try {
      const ports = await this.nix.getConnectedPorts();
      const nixPorts = ports.filter((p) => p.vendorId === 0x2af6);

      if (nixPorts.length === 0) {
        console.log('📝 No Nix devices found in granted serial ports');
        console.log('💡 You may need to grant access via browser dialog first');

        // Also check vendor IDs to help debug
        const vendorIds = await this.nix.listVendorIds();
        if (vendorIds.length > 0) {
          console.log(
            '🔍 Available vendor IDs:',
            vendorIds.map((id) => `0x${id.toString(16).padStart(4, '0')}`),
          );
        }
      } else {
        console.log(`✅ Found ${nixPorts.length} Nix device(s):`);
        nixPorts.forEach((port, index) => {
          console.log(`  ${index + 1}. Nix Serial Device`);
          console.log(
            `     Vendor: 0x${(port.vendorId || 0).toString(16).padStart(4, '0')}`,
          );
          console.log(
            `     Product: 0x${(port.productId || 0).toString(16).padStart(4, '0')}`,
          );
        });
      }
    } catch (error) {
      console.error('❌ Scan failed:', error);
    }
  }

  /**
   * Test scan sequence - focused test for color measurement
   */
  async testScanSequence(): Promise<boolean> {
    console.log('🎨 Testing Nix Mini 3 scan sequence...');

    try {
      if (!this.nix.isConnected()) {
        console.log('🔌 No active connection, attempting to connect...');
        const connected = await this.testNixMini3Connection();
        if (!connected) {
          console.log('❌ Could not establish connection for scan test');
          return false;
        }
      }

      console.log('\n🔍 Testing color scan functionality...');

      // Enable debug mode for detailed logging
      this.nix = new NixSerialCommunication(true);

      // Reconnect with debug enabled
      const ports = await this.nix.getConnectedPorts();
      const nixPorts = ports.filter((p) => p.vendorId === 0x2af6);

      if (nixPorts.length > 0) {
        await this.nix.connect(nixPorts[0].port);

        console.log('🎯 Attempting color scan...');
        const [l, a, b] = await this.nix.scanAndPrint();

        console.log(
          `✅ Scan successful! L*a*b* values: L=${l}, a=${a}, b=${b}`,
        );

        await this.nix.disconnect();
        return true;
      } else {
        console.log('❌ No Nix devices found for scan test');
        return false;
      }
    } catch (error) {
      console.error('❌ Scan sequence test failed:', error);
      try {
        await this.nix.disconnect();
      } catch (disconnectError) {
        // Ignore disconnect errors
      }
      return false;
    }
  }

  /**
   * Run debug scan sequence - step by step debugging
   */
  async runDebugScanSequence(): Promise<boolean> {
    console.log('🐞 Running debug scan sequence...');

    try {
      if (!this.nix.isConnected()) {
        console.log('🔌 No active connection, attempting to connect...');
        const connected = await this.testNixMini3Connection();
        if (!connected) {
          console.log('❌ Could not establish connection for debug scan');
          return false;
        }
      }

      console.log('\n🔍 Starting step-by-step scan debugging...');

      // Enable debug mode for detailed logging
      this.nix = new NixSerialCommunication(true);

      // Reconnect with debug enabled
      const ports = await this.nix.getConnectedPorts();
      const nixPorts = ports.filter((p) => p.vendorId === 0x2af6);

      if (nixPorts.length > 0) {
        await this.nix.connect(nixPorts[0].port);

        console.log('🎯 Running debug scan sequence...');
        await this.nix.debugScanSequence();

        await this.nix.disconnect();
        return true;
      } else {
        console.log('❌ No Nix devices found for debug scan');
        return false;
      }
    } catch (error) {
      console.error('❌ Debug scan sequence failed:', error);
      try {
        await this.nix.disconnect();
      } catch (disconnectError) {
        // Ignore disconnect errors
      }
      return false;
    }
  }
}

// Create a global instance for easy testing
export const nixTester = new NixMini3Tester();

// Console-friendly test functions
(window as any).testNix = async () => {
  return await nixTester.testNixMini3Connection();
};

(window as any).scanNix = async () => {
  return await nixTester.scanForNixDevices();
};

(window as any).testScan = async () => {
  return await nixTester.testScanSequence();
};

(window as any).debugScan = async () => {
  return await nixTester.runDebugScanSequence();
};

console.log('🎨 Nix Mini 3 Tester Loaded!');
console.log('Run these commands in console:');
console.log('  testNix()    - Full connection test');
console.log('  scanNix()    - Scan for Nix devices');
console.log('  testScan()   - Test color scanning');
console.log('  debugScan()  - Debug scan sequence');
console.log('');
console.log('🔧 Improved WebSerial communication with timeout fixes');
