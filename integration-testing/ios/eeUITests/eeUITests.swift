//
//  eeUITests.swift
//  eeUITests
//
//  Created by Tapash Majumder on 6/18/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import XCTest

class eeUITests: XCTestCase {
    lazy var app: XCUIApplication! = UITestsGlobal.application

    func testLogin() throws {
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
}
