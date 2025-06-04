import { NativeModules, Platform } from 'react-native';

export enum ArchitectureFeature {
  IN_APP_MESSAGES = 'inAppMessages',
  INBOX_MESSAGES = 'inboxMessages',
  PUSH_NOTIFICATIONS = 'pushNotifications',
  DEEP_LINKING = 'deepLinking',
  COMMERCE_TRACKING = 'commerceTracking',
  ATTRIBUTION = 'attribution',
  USER_MANAGEMENT = 'userManagement',
  EVENT_TRACKING = 'eventTracking',
}

export class ArchitectureDetector {
  private static instance: ArchitectureDetector;
  private isNewArchitecture: boolean | null = null;
  private isTurboModuleAvailable: boolean | null = null;
  private isFabricAvailable: boolean | null = null;
  private availableFeatures: Set<ArchitectureFeature> = new Set();

  private constructor() {
    this.detectAvailableFeatures();
  }

  static getInstance(): ArchitectureDetector {
    if (!ArchitectureDetector.instance) {
      ArchitectureDetector.instance = new ArchitectureDetector();
    }
    return ArchitectureDetector.instance;
  }

  /**
   * Check if the app is running with the new architecture
   */
  isNewArchitectureEnabled(): boolean {
    if (this.isNewArchitecture === null) {
      this.isNewArchitecture = this.detectNewArchitecture();
    }
    return this.isNewArchitecture;
  }

  /**
   * Check if TurboModules are available (Android)
   */
  isTurboModuleEnabled(): boolean {
    if (this.isTurboModuleAvailable === null) {
      this.isTurboModuleAvailable = this.detectTurboModule();
    }
    return this.isTurboModuleAvailable;
  }

  /**
   * Check if Fabric is available (iOS)
   */
  isFabricEnabled(): boolean {
    if (this.isFabricAvailable === null) {
      this.isFabricAvailable = this.detectFabric();
    }
    return this.isFabricAvailable;
  }

  /**
   * Get the current architecture name
   */
  getArchitectureName(): string {
    if (Platform.OS === 'ios') {
      return this.isFabricEnabled() ? 'Fabric' : 'Paper';
    } else {
      return this.isTurboModuleEnabled() ? 'TurboModule' : 'Paper';
    }
  }

  /**
   * Check if a specific feature is available
   * @param feature - Feature to check
   */
  isFeatureAvailable(feature: ArchitectureFeature): boolean {
    return this.availableFeatures.has(feature);
  }

  /**
   * Get all available features
   */
  getAvailableFeatures(): ArchitectureFeature[] {
    return Array.from(this.availableFeatures);
  }

  /**
   * Get features that are only available in the new architecture
   */
  getNewArchitectureFeatures(): ArchitectureFeature[] {
    if (!this.isNewArchitectureEnabled()) {
      return [];
    }

    return this.getAvailableFeatures().filter((feature) => {
      // Features that are only available in the new architecture
      const newArchOnlyFeatures = [
        ArchitectureFeature.IN_APP_MESSAGES,
        ArchitectureFeature.INBOX_MESSAGES,
        ArchitectureFeature.COMMERCE_TRACKING,
      ];
      return newArchOnlyFeatures.includes(feature);
    });
  }

  private detectNewArchitecture(): boolean {
    if (Platform.OS === 'ios') {
      return this.detectFabric();
    } else {
      return this.detectTurboModule();
    }
  }

  private detectTurboModule(): boolean {
    try {
      const { RNIterableAPI } = NativeModules;
      const hasTurboModule =
        RNIterableAPI &&
        typeof RNIterableAPI === 'object' &&
        'getConstants' in RNIterableAPI;

      if (hasTurboModule) {
        console.log('TurboModule architecture detected');
      }
      return hasTurboModule;
    } catch (error) {
      console.warn('Error detecting TurboModule:', error);
      return false;
    }
  }

  private detectFabric(): boolean {
    try {
      const { RNIterableAPI } = NativeModules;
      const hasFabric =
        RNIterableAPI &&
        typeof RNIterableAPI === 'object' &&
        'getConstants' in RNIterableAPI;

      if (hasFabric) {
        console.log('Fabric architecture detected');
      }
      return hasFabric;
    } catch (error) {
      console.warn('Error detecting Fabric:', error);
      return false;
    }
  }

  private detectAvailableFeatures(): void {
    const { RNIterableAPI } = NativeModules;
    if (!RNIterableAPI) {
      console.warn('RNIterableAPI module not found');
      return;
    }

    // Basic features available in both architectures
    this.availableFeatures.add(ArchitectureFeature.USER_MANAGEMENT);
    this.availableFeatures.add(ArchitectureFeature.EVENT_TRACKING);

    // Check for new architecture features
    if (this.isNewArchitectureEnabled()) {
      // Features available in new architecture
      this.availableFeatures.add(ArchitectureFeature.IN_APP_MESSAGES);
      this.availableFeatures.add(ArchitectureFeature.INBOX_MESSAGES);
      this.availableFeatures.add(ArchitectureFeature.COMMERCE_TRACKING);
      this.availableFeatures.add(ArchitectureFeature.ATTRIBUTION);

      // Platform-specific features
      if (Platform.OS === 'ios') {
        this.availableFeatures.add(ArchitectureFeature.PUSH_NOTIFICATIONS);
        this.availableFeatures.add(ArchitectureFeature.DEEP_LINKING);
      }
    }

    console.log('Available features:', Array.from(this.availableFeatures));
  }
}

export const ArchitectureDetectorInstance = ArchitectureDetector.getInstance();
