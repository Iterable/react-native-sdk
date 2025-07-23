//
//  AppDelegate.swift
//  ReactNativeSdkExample
//
//  Created by Loren Posen on 6/11/25.
//

import IterableSDK
import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import UIKit
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  public func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "ReactNativeSdkExample",
      in: window,
      launchOptions: launchOptions
    )

    UNUserNotificationCenter.current().delegate = self

    /**
    * Request permissions for push notifications.
    * @see Step 3.5.5 of https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#step-3-5-set-up-support-for-push-notifications
    */
    requestPushPermissions()

    return true
  }

  /**
    * Add support for in-app messages
    * @see Step 3.6 of https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#step-3-6-add-support-for-in-app-messages
    */
  public func application(
    _ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
  ) {
    IterableAppIntegration.application(
      application, didReceiveRemoteNotification: userInfo,
      fetchCompletionHandler: completionHandler
    )
    NSLog("didReceiveRemoteNotification: \(userInfo)")
  }

  public func application(
    _ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    /**
     * Register the device token with Iterable.
     * @see Step 3.5.4 of https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#step-3-5-set-up-support-for-push-notifications
     */
    IterableAPI.register(token: deviceToken)
    NSLog("didRegisterForRemoteNotificationsWithDeviceToken: \(deviceToken)")
  }

  /**
   * Add support for deep links
   * @see Step 3.7 of https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#step-3-7-add-support-for-deep-links
   */
  public func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    return RCTLinkingManager.application(
      application,
      continue: userActivity,
      restorationHandler: restorationHandler
    )
  }

  /**
    * Add support for deep links
    * @see Step 3.7 of https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#step-3-7-add-support-for-deep-links
    */
  public func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    RCTLinkingManager.application(app, open: url, options: options)
  }

  public func requestPushPermissions() {
    UNUserNotificationCenter.current().getNotificationSettings { (settings) in
      if settings.authorizationStatus != .authorized {
        NSLog("Not authorized")
        // not authorized, ask for permission
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) {
          (success, error) in
          NSLog("auth: \(success)")
        }
      } else {
        // already authorized
        NSLog("Already authorized")
      }
    }
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}

/// * Handle incoming push notifications and enable push notification tracking.
/// * @see Step 3.5.5 of https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK#step-3-5-set-up-support-for-push-notifications
extension AppDelegate: UNUserNotificationCenterDelegate {
  public func userNotificationCenter(
    _: UNUserNotificationCenter, willPresent _: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    completionHandler([.badge, .banner, .list, .sound])
    NSLog("willPresent")
  }

  public func userNotificationCenter(
    _ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    IterableAppIntegration.userNotificationCenter(
      center, didReceive: response, withCompletionHandler: completionHandler)
    NSLog("didReceive")
  }
}
