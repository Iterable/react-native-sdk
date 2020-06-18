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

    func testSendInApp() throws {
        app.button(withText: "Send In-App").tap()
        app.link(withText: "Buy Now!").waitToAppear().tap()
    }
}
