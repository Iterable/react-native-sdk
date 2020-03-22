export class Iterable {
    static initialize(apiKey: string): void
    static setEmail(email: string): void
    static getEmail(): Promise<String | null>
    static setUserId(userId: string): void
    static getUserId(): Promise<String | null>
    static getInAppMessages(): void
}

export enum PushServicePlatform {
    sandbox = 0,
    production = 1,
    auto = 2
}

export class IterableConfig {
    pushIntegrationName?: String
    sandboxPushIntegrationName?: String
    pushPlatform: PushServicePlatform
    autoPushRegistration: Boolean
    checkForDeferredDeeplink: Boolean
    inAppDisplayInterval: number
}
