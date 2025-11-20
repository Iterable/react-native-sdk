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

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    NSLog("DID FINISH LAUNCHING WITH OPTIONS")
    ITBInfo()

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

    setupUserNotificationCenter()

    return true
  }

  func application(
    _ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    NSLog("DID REGISTER FOR REMOTE NOTIFICATIONS")
    ITBInfo()
    IterableAPI.register(token: deviceToken)
  }

  func application(
    _ application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: Error
  ) {
    NSLog("FAILED TO REGISTER FOR REMOTE NOTIFICATIONS")
    ITBInfo("error: \(error)")
  }

  func application(
    _ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
  ) {
    NSLog("DID RECEIVE REMOTE NOTIFICATION")
    ITBInfo()
    IterableAppIntegration.application(
      application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler
    )
  }

  func application(
    _ application: UIApplication, continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    NSLog("CONTINUE USER ACTIVITY")
    ITBInfo()
    guard let url = userActivity.webpageURL else {
      return false
    }

    return IterableAPI.handle(universalLink: url)
  }

  func application(
    _ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    NSLog("OPEN URL")
    ITBInfo()
    return RCTLinkingManager.application(app, open: url, options: options)
  }

  private func setupUserNotificationCenter() {
    UNUserNotificationCenter.current().delegate = self
    UNUserNotificationCenter.current().getNotificationSettings { settings in
      if settings.authorizationStatus != .authorized {
        ITBInfo("Not authorized")
        // not authorized, ask for permission
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) {
          success, _ in
          ITBInfo("auth: \(success)")
          if success {
            DispatchQueue.main.async {
              UIApplication.shared.registerForRemoteNotifications()
            }
          }
          // TODO: Handle error etc.
        }
      } else {
        // already authorized
        ITBInfo("Already authorized")
        DispatchQueue.main.async {
          UIApplication.shared.registerForRemoteNotifications()
        }
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

extension AppDelegate: UNUserNotificationCenterDelegate {
  // App is running in the foreground
  public func userNotificationCenter(
    _ center: UNUserNotificationCenter, willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    NSLog("WILL PRESENT NOTIFICATION")
    completionHandler([.badge, .banner, .list, .sound])
  }

  // The method will be called on the delegate when the user responded to the notification by opening the application, dismissing the notification or choosing a UNNotificationAction. The delegate must be set before the application returns from applicationDidFinishLaunching:.
  public func userNotificationCenter(
    _ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    NSLog("DID RECEIVE NOTIFICATION RESPONSE")
    IterableAppIntegration.userNotificationCenter(
      center, didReceive: response, withCompletionHandler: completionHandler)
  }
}
