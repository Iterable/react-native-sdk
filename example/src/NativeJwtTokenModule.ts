import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  generateJwtToken(
    secret: string,
    durationMs: number,
    email: string | null,
    userId: string | null
  ): Promise<string>;
}

let JwtTokenModule: Spec | null = null;

try {
  JwtTokenModule = TurboModuleRegistry.getEnforcing<Spec>('JwtTokenModule');
} catch {
  console.warn('JwtTokenModule native module is not available yet');
}

const createModuleProxy = (): Spec => {
  const handler: ProxyHandler<Spec> = {
    get(_target, prop) {
      if (!JwtTokenModule) {
        throw new Error(
          `JwtTokenModule native module is not available. Make sure the native module is properly linked and the app has been rebuilt.\n\nFor iOS: Add Swift files to Xcode project (see SETUP_GUIDE.md)\nFor Android: Ensure JwtTokenPackage is registered in MainApplication.kt`
        );
      }
      return JwtTokenModule[prop as keyof Spec];
    },
  };
  return new Proxy({} as Spec, handler);
};

export default createModuleProxy();
