//
//  Created by Tapash Majumder on 3/19/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation

import IterableSDK;

struct SerializationUtil {
    static func dateToInt(date: Date) -> Int {
        Int(date.timeIntervalSince1970 * 1000)
    }
    
    static func intToDate(int: Int) -> Date {
        let seconds = Double(int) / 1000.0 // ms -> seconds
        
        return Date(timeIntervalSince1970: seconds)
    }
    
    static func encodableToDictionary<T>(encodable: T) -> [String: Any]? where T: Encodable {
        guard let data = try? JSONEncoder().encode(encodable) else {
            return nil
        }
        
        return try? JSONSerialization.jsonObject(with: data, options: [.allowFragments]) as? [String: Any]
    }
    
    static func dictionaryToDecodable<T>(dict: [AnyHashable: Any]) -> T? where T: Decodable {
        guard let data = try? JSONSerialization.data(withJSONObject: dict, options: []) else {
            return nil
        }
        
        return try? JSONDecoder().decode(T.self, from: data)
    }

    static func inAppContentToDict(content: IterableInAppContent) -> [AnyHashable: Any] {
        guard let htmlInAppContent = content as? IterableHtmlInAppContent else {
            return [:]
        }

        var dict = [AnyHashable: Any]()
        dict["type"] = htmlInAppContent.type.rawValue
        dict["edgeInsets"] = htmlInAppContent.edgeInsets.toDict()
        dict["backgroundAlpha"] = htmlInAppContent.backgroundAlpha
        dict["html"] = htmlInAppContent.html
        return dict
    }
}

extension IterableConfig {
    static func from(dict: [AnyHashable: Any]?) -> IterableConfig {
        let config = IterableConfig()
        guard let dict = dict else {
            return config
        }
        
        if let pushIntegrationName = dict["pushIntegrationName"] as? String {
            config.pushIntegrationName = pushIntegrationName
        }
        if let sandboxPushIntegrationName = dict["sandboxPushIntegrationName"] as? String {
            config.sandboxPushIntegrationName = sandboxPushIntegrationName
        }
        if let intValue = dict["pushPlatform"] as? Int, let pushPlatform = PushServicePlatform(rawValue: intValue) {
            config.pushPlatform = pushPlatform
        }
        if let autoPushRegistration = dict["autoPushRegistration"] as? Bool {
            config.autoPushRegistration = autoPushRegistration
        }
        if let checkForDeferredDeeplink = dict["checkForDeferredDeeplink"] as? Bool {
            config.checkForDeferredDeeplink = checkForDeferredDeeplink
        }
        if let inAppDisplayInterval = dict["inAppDisplayInterval"] as? Double {
            config.inAppDisplayInterval = inAppDisplayInterval
        }

        return config
    }
}

extension CommerceItem {
    static func from(dict: [AnyHashable: Any]) -> CommerceItem? {
        guard let id = dict["id"] as? String else {
            return nil
        }
        guard let name = dict["name"] as? String else {
            return nil
        }
        guard let price = dict["price"] as? NSNumber else {
            return nil
        }
        guard let quantity = dict["quantity"] as? UInt else {
            return nil
        }

        return CommerceItem(id: id, name: name, price: price, quantity: quantity)
    }
}

extension IterableInAppTrigger {
    func toDict() -> [AnyHashable: Any] {
        var dict = [AnyHashable: Any]()
        dict["type"] = self.type.rawValue
        return dict
    }
}

extension UIEdgeInsets {
    func toDict() -> [AnyHashable: Any] {
        var dict = [AnyHashable: Any]()
        dict["top"] = top
        dict["left"] = left
        dict["bottom"] = bottom
        dict["right"] = right
        return dict
    }
}

extension IterableInboxMetadata {
    func toDict() -> [AnyHashable: Any]? {
        var dict = [AnyHashable: Any]()
        dict["title"] = title
        dict["subtitle"] = subtitle
        dict["icon"] = icon
        return dict
    }
}

extension IterableInAppMessage {
    func toDict() -> [AnyHashable: Any] {
        var dict = [AnyHashable: Any]()
        dict["messageId"] = messageId
        dict["campaignId"] = campaignId
        dict["trigger"] = trigger.toDict()
        dict["createdAt"] = createdAt.map (SerializationUtil.dateToInt(date:))
        dict["expiresAt"] = expiresAt.map (SerializationUtil.dateToInt(date:))
        dict["saveToInbox"] = saveToInbox
        dict["inboxMetadata"] = inboxMetadata?.toDict() ?? nil
        dict["customPayload"] = customPayload
        dict["read"] = read
        return dict
    }
}

extension InAppLocation {
    static func from(number: NSNumber) -> InAppLocation {
        if let value = number as? Int {
            return InAppLocation(rawValue: value) ?? .inApp
        } else {
            return .inApp
        }
    }
}

extension InAppCloseSource {
    static func from(number: NSNumber) -> InAppCloseSource? {
        guard let value = number as? Int else {
            return nil
        }
        return InAppCloseSource(rawValue: value)
    }
}

extension InAppShowResponse {
    static func from(number: NSNumber) -> InAppShowResponse {
        if let value = number as? Int {
            return InAppShowResponse(rawValue: value) ?? .show
        } else {
            return .show
        }
    }
}
