import { IterableApi } from './IterableApi';

export class IterableUserManager {
  /**
   * Get the current user's email.
   *
   * @returns The current user's email.
   *
   * @example
   * ```typescript
   * Iterable.user.getEmail().then((email) => {
   *  // Do something with the email
   * });
   * ```
   */
  static getEmail(): Promise<string | null> {
    return IterableApi.getEmail();
  }
  /**
   * Associate the current user with the passed in email parameter.
   *
   * Note: specify a user by calling `Iterable.setEmail` or
   * `Iterable.user.setUserId`, but **NOT** both
   *
   * @remarks
   * Iterable's React Native SDK persists the user across app sessions and
   * restarts, until you manually change the user using `Iterable.setEmail` or
   * `Iterable.user.setUserId`.
   *
   * ## User profile creation:
   *
   * If your Iterable project does not have a user with the passed in email,
   * `setEmail` creates one and adds the email address to the user's Iterable
   * profile.
   *
   * ## Registering device token:
   *
   * If `IterableConfig.autoPushRegistration` is set to true, calling
   * `setEmail` automatically registers the device for push notifications and
   * sends the deviceId and token to Iterable.
   *
   * ## Optional JWT token parameter:
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race
   * conditions.  The SDK uses this JWT to authenticate API requests for this
   * user.
   *
   * ## Signing out a user from the SDK:
   *
   * To tell the SDK to sign out the current user, pass null into
   * `Iterable.user.setEmail`.  If IterableConfig.autoPushRegistration is set to
   * true, calling `Iterable.user.setEmail`(null) prevents Iterable from sending
   * further push notifications to that user, for that app, on that device.  On
   * the user's Iterable profile, `endpointEnabled` is set to false for the
   * device.
   *
   * @param email - Email address to associate with
   * the current user
   * @param authToken - Valid, pre-fetched JWT the SDK
   * can use to authenticate API requests, optional - If null/undefined, no JWT
   * related action will be taken
   *
   *  @example
   * ```typescript
   * Iterable.user.setEmail('my.user.name@gmail.com');
   * ```
   */
  static setEmail(
    email: string | null,
    authToken?: string | null
  ): Promise<void> {
    return IterableApi.setEmail(email, authToken);
  }

  /**
   * Change the value of the email field on the current user's Iterable profile.
   *
   * If `Iterable.user.setUserId` was used to identify the current user, `Iterable.user.updateEmail` can be called to
   * give the current user a real (non-placeholder) email address.
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
   * The SDK uses this JWT to authenticate API requests for this user.
   *
   * @param email - The new email to set
   * @param authToken - The new auth token (JWT) to set with the new email, optional - If null/undefined, no JWT-related action will be taken
   *
   * @example
   * ```typescript
   * Iterable.user.updateEmail('my.new.email@gmail.com', 'myAuthToken');
   * ```
   */
  static updateEmail(email: string, authToken?: string | null): Promise<void> {
    return IterableApi.updateEmail(email, authToken);
  }

  /**
   * Associate the current user with the passed in `userId` parameter.
   *
   * Note: specify a user by calling `Iterable.setEmail` or
   * `Iterable.user.setUserId`, but **NOT** both.
   *
   * @remarks
   * Iterable's React Native SDK persists the user across app sessions and
   * restarts, until you manually change the user using `Iterable.setEmail` or
   * `Iterable.user.setUserId`.
   *
   * ## User profile creation:
   *
   * If your Iterable project does not have a user with the passed in `UserId`,
   * `setUserId` creates one and adds a placeholder email address to the user's
   * Iterable profile.
   *
   * ## Registering device token:
   *
   * If `IterableConfig.autoPushRegistration` is set to `true`, calling
   * `setUserId` automatically registers the device for push notifications and
   * sends the `deviceId` and token to Iterable.
   *
   * ## Optional JWT token parameter:
   *
   * An optional valid, pre-fetched JWT can be passed in to avoid race
   * conditions.  The SDK uses this JWT to authenticate API requests for this
   * user.
   *
   * ## Signing out a user from the SDK:
   *
   * To tell the SDK to sign out the current user, pass null into
   * `Iterable.user.setUserId`.  If `IterableConfig.autoPushRegistration` is set to
   * true, calling `Iterable.setUserId(null)` prevents Iterable from sending
   * further push notifications to that user, for that app, on that device.  On
   * the user's Iterable profile, endpointEnabled is set to false for the
   * device.
   *
   * @param userId - User ID to associate with the current user
   * @param authToken - Valid, pre-fetched JWT the SDK can use to authenticate
   * API requests, optional - If null/undefined, no JWT related action will be
   * taken
   */
  static setUserId(userId?: string | null, authToken?: string | null) {
    IterableApi.setUserId(userId, authToken);
  }

  /**
   * Get the `userId` associated with the current user.
   *
   * @example
   * ```typescript
   * Iterable.user.getUserId().then((userId) => {
   *  // Do something with the userId
   * });
   * ```
   */
  static getUserId(): Promise<string | null | undefined> {
    return IterableApi.getUserId();
  }

  /**
   * Save data to the current user's Iterable profile.
   *
   * If `mergeNestedObjects` is set to `true`, top-level objects in the passed in dataFields parameter
   * are merged with their counterparts that already exist on the user's profile.
   * Otherwise, they are added.
   *
   * If `mergeNestedObjects` is set to `false`, the top-level objects in the passed in dataFields parameter
   * overwrite their counterparts that already exist on the user's profile.
   * Otherwise, they are added.
   *
   * @param dataFields - Data fields to store in user profile
   * @param mergeNestedObjects - Whether to merge top-level objects included in
   * dataFields with analogous, existing objects on the user profile (if `true`)
   * or overwrite them (if `false`).
   *
   * @example
   * This call adds the `firstName` field and `favorites` object to the current
   * user's Iterable profile. Since `mergeNestedObjects` is `false`, this call will
   * overwrite the existing favorites object (if there is one), replacing it
   * with the value in the call (otherwise, it would have merged the two
   * `favorites` objects).
   *
   * ```typescript
   * Iterable.user.updateUser(
   *   {
   *     "firstName": "Joe",
   *     "favorites": {
   *       "color": "red",
   *       "flavor": "cinnamon"
   *     }
   *   },
   *   false
   * );
   * ```
   *
   * @remarks
   * **IMPORTANT**: `mergeNestedObjects` only works for data that is stored up to one level deep within an object (for example, `{mySettings:{mobile:true}}`). Note that `mergeNestedObjects` applies to objects, not arrays.
   */
  static updateUser(
    dataFields: unknown | undefined,
    mergeNestedObjects: boolean
  ): Promise<void> {
    return IterableApi.updateUser(dataFields, mergeNestedObjects);
  }

  /**
   * Disable the device's token for the current user.  This will disable push notifications for the current user.
   *
   * @example
   * ```typescript
   * Iterable.user.disableDevice();
   * ```
   */
  static disableDevice() {
    IterableApi.disableDeviceForCurrentUser();
  }
}
