//
//  Created by Tapash Majumder on 6/13/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)!
        let rootView = RCTRootView(bridge: bridge, moduleName: "example", initialProperties: nil)
        rootView.backgroundColor = UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
        self.window = UIWindow(frame: UIScreen.main.bounds)
        let rootViewController = UIViewController()
        rootViewController.view = rootView
        self.window?.rootViewController = rootViewController
        self.window?.makeKeyAndVisible()
        
        return true
    }
}

extension AppDelegate: RCTBridgeDelegate {
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        #if DEBUG
        // We can't load from "index.js" from metro packager because it fails in Github Action.
        // Se we load the same way for debug and release with main.jsBundle.
        return Bundle.main.url(forResource: "main", withExtension: "jsBundle")
        #else
        return Bundle.main.url(forResource: "main", withExtension: "jsBundle")
        #endif
    }
}
