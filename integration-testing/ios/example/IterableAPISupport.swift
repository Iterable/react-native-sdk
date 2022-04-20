//
//  Created by Tapash Majumder on 6/17/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation

@testable import IterableSDK

struct IterableAPISupport {
    enum Const {
        static let apiEndpoint = "https://api.iterable.com/api/"
        enum Path {
            static let sendInApp = "inApp/target"
            static let getInApps = "inApp/getMessages"
            static let consumeInApp = "events/inAppConsume"
        }
        
        enum Key {
            static let campaignId = "campaignId"
            static let recipientEmail = "recipientEmail"
        }
    }
    
    static func clearAllInAppMessages(apiKey: String,
                                      email: String) {
        // Issue consume requests
        getInAppMessages(apiKey: apiKey, email: email).flatMap {
            chainCallConsume(apiKey: apiKey, email: email, messages: $0)
        }.wait()

        // Now check that messages are gone
        getInAppMessages(apiKey: apiKey, email: email).flatMap {
            checkMessagesDone(apiKey: apiKey, email: email, messages: $0, attemptsRemaining: 5)
        }
        .onError(block: { error in
            fatalError("\(error.localizedDescription)")
        })
        .wait()
    }
    
    static func sendInApp(to email: String, withCampaignId campaignId: Int) -> Pending<SendRequestValue, SendRequestError> {
        let body: [String: Any] = [
            Const.Key.recipientEmail: email,
            Const.Key.campaignId: campaignId,
        ]
        let iterablePostRequest = PostRequest(path: Const.Path.sendInApp,
                                              args: nil,
                                              body: body)
        guard let urlRequest = createPostRequest(iterablePostRequest: iterablePostRequest) else {
            return SendRequestError.createErroredFuture(reason: "could not create post request")
        }
        
        return RequestSender.sendRequest(urlRequest, usingSession: urlSession)
    }
    
//    static func sendInApp(apiKey: String, to email: String, withCampaignId campaignId: Int) -> Pending<SendRequestValue, SendRequestError> {
//        let body: [String: Any] = [
//            Const.Key.recipientEmail: email,
//            Const.Key.campaignId: campaignId
//        ]
//
//        guard let request = IterableRequestUtil.createPostRequest(forApiEndPoint: Const.apiEndpoint,
//                                                                  path: Const.Path.sendInApp,
//                                                                  headers: createIterableHeaders(apiKey: apiKey),
//                                                                  body: body) else {
//                                                                    return SendRequestError.createErroredFuture(reason: "Could not create in-app consume request")
//        }
//
//        return RequestSender.sendRequest(request, usingSession: urlSession)
//    }

    private static let urlSession: URLSession = {
        return URLSession(configuration: URLSessionConfiguration.default)
    } ()

    private static let maxMessages = 100
    
    private static func getInAppMessages(apiKey: String,
                                         email: String) -> Pending<[IterableInAppMessage], SendRequestError> {
        var args: [String: String] = [
            JsonKey.email: email,
            JsonKey.InApp.count: maxMessages.description,
            JsonKey.platform: JsonValue.iOS,
            JsonKey.InApp.sdkVersion: IterableAPI.sdkVersion,
        ]
        
        if let packageName = Bundle.main.appPackageName {
            args[JsonKey.InApp.packageName] = packageName
        }
        
        guard let request = IterableRequestUtil.createGetRequest(forApiEndPoint: Const.apiEndpoint,
                                                                 path: Const.Path.getInApps,
                                                                 headers: createIterableHeaders(apiKey: apiKey),
                                                                 args: args) else {
                                                                    return SendRequestError.createErroredFuture(reason: "could not create get in-app request")
        }
        
        return RequestSender.sendRequest(request, usingSession: urlSession).map { inAppMessages(fromPayload: $0) }
    }
    
    private static func createIterableHeaders(apiKey: String) -> [String: String] {
        let headers = [JsonKey.contentType: JsonValue.applicationJson,
                       JsonKey.Header.sdkPlatform: JsonValue.iOS,
                       JsonKey.Header.sdkVersion: IterableAPI.sdkVersion,
                       JsonKey.Header.apiKey: apiKey]
        
        return headers
    }

    
    private static func inAppMessages(fromPayload payload: [AnyHashable: Any]) -> [IterableInAppMessage] {
        InAppMessageParser.parse(payload: payload).compactMap(parseResultToOptionalMessage)
    }
    
    private static func parseResultToOptionalMessage(result: Result<IterableInAppMessage, InAppMessageParser.ParseError>) -> IterableInAppMessage? {
        switch result {
        case .failure:
            return nil
        case let .success(message):
            return message
        }
    }

    private static func checkMessagesDone(apiKey: String, email: String, messages: [IterableInAppMessage], attemptsRemaining: Int) -> Pending<[IterableInAppMessage], SendRequestError> {
        ITBInfo("attemptsRemaining: \(attemptsRemaining), waiting or 1 s...")
        guard messages.count > 0 else {
            return Fulfill<[IterableInAppMessage], SendRequestError>(value: [])
        }
        guard attemptsRemaining > 0 else {
            return SendRequestError.createErroredFuture(reason: "Number of attempts exceeded")
        }
        
        Thread.sleep(forTimeInterval: 1.0)
        return getInAppMessages(apiKey: apiKey, email: email).flatMap { messages in
            return checkMessagesDone(apiKey: apiKey, email: email, messages: messages, attemptsRemaining: attemptsRemaining - 1)
        }
    }
    
    // Call consume one after the other
    private static func chainCallConsume(apiKey: String, email: String, messages: [IterableInAppMessage]) -> Pending<SendRequestValue, SendRequestError> {
        guard messages.count > 0 else {
            return Fulfill<SendRequestValue, SendRequestError>(value: [:])
        }
        
        let result = Fulfill<SendRequestValue, SendRequestError>(value: [:])
        
        return messages.reduce(result) { (partialResult, message) -> Pending<SendRequestValue, SendRequestError> in
            partialResult.flatMap { _ in
                consumeInAppMessage(apiKey: apiKey, email: email, messageId: message.messageId)
            }
        }
    }
    
    private static func consumeInAppMessage(apiKey: String, email: String, messageId: String) -> Pending<SendRequestValue, SendRequestError> {
        var body = [AnyHashable: Any]()
        
        body.setValue(for: JsonKey.messageId, value: messageId)
        body.setValue(for: JsonKey.email, value: email)

        guard let request = IterableRequestUtil.createPostRequest(forApiEndPoint: Const.apiEndpoint,
                                                                  path: Const.Path.consumeInApp,
                                                                  headers: createIterableHeaders(apiKey: apiKey),
                                                                  body: body) else {
                                                                    return SendRequestError.createErroredFuture(reason: "Could not create in-app consume request")
        }
        
        return RequestSender.sendRequest(request, usingSession: urlSession)
    }
}
