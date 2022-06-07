//
//  Created by Tapash Majumder on 6/18/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import XCTest

class eeUITests: XCTestCase {
    lazy var app: XCUIApplication! = UITestsGlobal.application

    // override func setUp() {
    //     app.button(withText: "resetBtn").waitToAppear().tap()
    // }

    override func tearDown() {
        app.button(withText: "resetBtn").waitToAppear().tap()
    }
    
    // this must be called first
    func test_aa_clearAllInAppMessages() throws {
        app.button(withText: "clearAllInApps").waitToAppear().tap()
        app.label(withText: "Cleared all in-apps").waitToAppear()
    }
    
    // this must be called second
    func test_aa_Login() throws {
        if app.button(withText: "Logout").exists {
            app.button(withText: "Logout").tap()
        }
        app.button(withText: "Login").waitToAppear()
        app.textFields["loginText"].tap()
        app.textFields["loginText"].typeText("user@example.com")
        app.button(withText: "Login").waitToAppear().doubleTap()
        app.button(withText: "Logout").waitToAppear()
    }

    func testSendInApp() throws {
        app.button(withText: "Send In-App").tap()
        app.link(withText: "Later").waitToAppear().tap()
    }

    func testSkipInApp() throws {
        app.button(withText: "Skip In-App").tap()
        app.label(withText: "Skipping in-app").waitToAppear()
    }

    func testCustomAction() throws {
        app.button(withText: "customActionBtn").tap()
        app.link(withText: "Custom Action").waitToAppear().tap()
        app.label(withText: "Custom Action: 'ActionJackson'").waitToAppear()
    }

    func testUrlDelegateOpenDeeplink() throws {
        app.button(withText: "openDeepLinkBtn").tap()
        app.link(withText: "Buy Now!").waitToAppear().tap()
        app.label(withText: "Opening coffee page: 'cappuccino'").waitToAppear()
    }

    func testUrlDelegateOpenSafari() throws {
        app.button(withText: "openSafariBtn").tap()
        app.link(withText: "Open Safari").waitToAppear().tap()
        
        // Give some time to open
        sleep(1)

        // Assert that safari is active
        let safariApp = XCUIApplication(bundleIdentifier: "com.apple.mobilesafari")
        XCTAssertEqual(safariApp.state, .runningForeground, "Safari is not active")

        // launch this app again for other tests
        app.launch()
    }
}
