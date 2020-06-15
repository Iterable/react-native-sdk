//
//  AppDelegate.swift
//  example
//
//  Created by Tapash Majumder on 6/13/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let jsCodeLocation = RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index", fallbackResource: nil)!
        let rootView = RCTRootView(bundleURL: jsCodeLocation!, moduleName: "example", initialProperties: nil, launchOptions: launchOptions)
        rootView.backgroundColor = UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
        self.window = UIWindow(frame: UIScreen.main.bounds)
        let rootViewController = UIViewController()
        rootViewController.view = rootView
        self.window?.rootViewController = rootViewController
        self.window?.makeKeyAndVisible()
        
        
        return true
    }
}

