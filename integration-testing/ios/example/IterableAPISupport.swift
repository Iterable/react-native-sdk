//
//  Created by Tapash Majumder on 6/17/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation
import IterableSDK

struct Environment {
    enum Key : String {
        case apiKey
        case email
        case notificationDisabled
    }

    static func get(key: Key) -> String? {
        return ProcessInfo.processInfo.environment[key.rawValue]
    }

    static func getBool(key: Key) -> Bool {
        guard let strValue = get(key: key) else {
            return false
        }
        return Bool(strValue) ?? false
    }
}

struct IterableAPISupport {
    struct Key {
        static let ITBL_ENDPOINT_API = apiHostname + "/api/"
        static let ITBL_KEY_CAMPAIGN_ID = "campaignId"
        static let ITBL_KEY_RECIPIENT_EMAIL = "recipientEmail"
        static let ITBL_PATH_CAMPAIGNS = "campaigns"
        static let ITBL_PATH_PUSH_TARGET = "push/target"
        static let ITBL_PATH_INAPP_TARGET = "inApp/target"
        private static let apiHostname = "https://api.iterable.com"
        static let apiKey = Environment.get(key: .apiKey)!
    }
    
    static var sharedInstance = IterableAPISupport()
    
    func sendPush(toEmail email: String, withCampaignId campaignId: Int, withOnSuccess onSuccess: OnSuccessHandler? = nil, withOnFailure onFailure: OnFailureHandler? = nil) {
        let args: [String: Any] = [
            Key.ITBL_KEY_RECIPIENT_EMAIL: email,
            Key.ITBL_KEY_CAMPAIGN_ID: campaignId
        ]
        if let request = createPostRequest(forPath: Key.ITBL_PATH_PUSH_TARGET, withArgs: args) {
            sendRequest(request, onSuccess: onSuccess, onFailure: onFailure)
        } else {
            onFailure?("couldn't create request", nil)
        }
    }
    
    func sendInApp(toEmail email: String, withCampaignId campaignId: Int, withOnSuccess onSuccess: OnSuccessHandler? = nil, withOnFailure onFailure: OnFailureHandler? = nil) {
        let args: [String: Any] = [
            Key.ITBL_KEY_RECIPIENT_EMAIL: email,
            Key.ITBL_KEY_CAMPAIGN_ID: campaignId
        ]
        if let request = createPostRequest(forPath: Key.ITBL_PATH_INAPP_TARGET, withArgs: args) {
            sendRequest(request, onSuccess: onSuccess, onFailure: onFailure)
        } else {
            onFailure?("couldn't create request", nil)
        }
    }

    private func createPostRequest(forPath path: String, withArgs args: [AnyHashable : Any]) -> URLRequest? {
        guard let url = getUrlComponents(forPath: path)?.url else {
            return nil
        }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        if let data = IterableAPISupport.dictToJsonData(args) {
            request.httpBody = data
        }
        return request
    }

    private func getUrlComponents(forPath path: String) -> URLComponents? {
        guard var components = URLComponents(string: "\(Key.ITBL_ENDPOINT_API)\(path)") else {
            return nil
        }
        components.queryItems = [URLQueryItem(name: "api_key", value: Key.apiKey)]
        return components
    }
    
    static func dictToJsonData(_ dict: [AnyHashable : Any]?) -> Data? {
        guard let dict = dict else {
            return nil
        }
        return try? JSONSerialization.data(withJSONObject: dict, options: [])
    }


    /**
     Executes the given `request`, attaching success and failure handlers.
     
     A request is considered successful as long as it does not meet any of the criteria outlined below:
     - there is no response
     - the server responds with a non-OK status
     - the server responds with a string that can not be parsed into JSON
     - the server responds with a string that can be parsed into JSON, but is not a dictionary
     
     - parameter request:     A `URLRequest` with the request to execute.
     - parameter onSuccess:   A closure to execute if the request is successful. It should accept one argument, an `Dictionary` of the response.
     - parameter onFailure:   A closure to execute if the request fails. It should accept two arguments: an `String` containing the reason this request failed, and an `Data` containing the raw response.
     */
    private func sendRequest(_ request: URLRequest, onSuccess: OnSuccessHandler? = nil, onFailure: OnFailureHandler? = nil) {
        let task = urlSession.dataTask(with: request) { (data, response, error) in
            if let error = error {
                onFailure?("\(error.localizedDescription)", data)
                return
            }
            guard let response = response as? HTTPURLResponse else {
                return
            }
            let responseCode = response.statusCode
            
            
            let json: Any?
            var jsonError: Error? = nil
            
            if let data = data, data.count > 0 {
                do {
                    json = try JSONSerialization.jsonObject(with: data, options: [])
                } catch let error {
                    jsonError = error
                    json = nil
                }
            } else {
                json = nil
            }
            
            if responseCode == 401 {
                onFailure?("Invalid API Key", data)
            } else if responseCode >= 400 {
                var errorMessage = "Invalid Request"
                if let onFailure = onFailure {
                    if let jsonDict = json as? [AnyHashable : Any], let msgFromDict = jsonDict["msg"] as? String {
                        errorMessage = msgFromDict
                    } else if responseCode >= 500 {
                        errorMessage = "Internal Server Error"
                    }
                    onFailure(errorMessage, data)
                }
            } else if responseCode == 200 {
                if let data = data, data.count > 0 {
                    if let jsonError = jsonError {
                        var reason = "Could not parse json, error: \(jsonError.localizedDescription)"
                        if let stringValue = String(data: data, encoding: .utf8) {
                            reason = "Could not parse json: \(stringValue), error: \(jsonError.localizedDescription)"
                        }
                        onFailure?(reason, data)
                    } else if let json = json as? [AnyHashable : Any] {
                        onSuccess?(json)
                    } else {
                        onFailure?("Response is not a dictionary", data)
                    }
                } else {
                    onFailure?("No data received", data)
                }
            } else {
                onFailure?("Received non-200 response: \(responseCode)", data)
            }
        }
        
        task.resume()
    }

    private var urlSession: URLSession = {
        return URLSession(configuration: URLSessionConfiguration.default)
    } ()
    
}
