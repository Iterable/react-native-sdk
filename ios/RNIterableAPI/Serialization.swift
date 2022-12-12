//
//  Created by Tapash Majumder on 3/19/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

import Foundation

import IterableSDK

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
}

extension IterableConfig {
    static func from(dict: [AnyHashable: Any]?) -> IterableConfig {
        let config = IterableConfig()
        
        guard let dict = dict else {
            return config
        }
        
        if let allowedProtocols = dict["allowedProtocols"] as? [String] {
            config.allowedProtocols = allowedProtocols
        }
        
        if let pushIntegrationName = dict["pushIntegrationName"] as? String {
            config.pushIntegrationName = pushIntegrationName
        }
        
        if let autoPushRegistration = dict["autoPushRegistration"] as? Bool {
            config.autoPushRegistration = autoPushRegistration
        }
        
        if let inAppDisplayInterval = dict["inAppDisplayInterval"] as? Double {
            config.inAppDisplayInterval = inAppDisplayInterval
        }
        
        if let logLevelNumber = dict["logLevel"] as? NSNumber {
            config.logDelegate = createLogDelegate(logLevelNumber: logLevelNumber)
        }
        
        if let useInMemoryStorageForInApp = dict["useInMemoryStorageForInApps"] as? Bool {
            config.useInMemoryStorageForInApps = useInMemoryStorageForInApp
        }
        
        return config
    }
    
    private static func createLogDelegate(logLevelNumber: NSNumber) -> IterableLogDelegate {
        DefaultLogDelegate(minLogLevel: LogLevel.from(number: logLevelNumber))
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
        
        let sku = dict["sku"] as? String
        let description = dict["description"] as? String
        let url = dict["url"] as? String
        let imageUrl = dict["imageUrl"] as? String
        let categories = dict["categories"] as? [String]
        let dataFields = dict["dataFields"] as? [AnyHashable: Any]
        
        return CommerceItem(id: id,
                            name: name,
                            price: price,
                            quantity: quantity,
                            sku: sku,
                            description: description,
                            url: url,
                            imageUrl: imageUrl,
                            categories: categories,
                            dataFields: dataFields)
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
        dict["priorityLevel"] = priorityLevel
        return dict
    }
}

extension IterableHtmlInAppContent {
    func toDict() -> [AnyHashable: Any] {
        var dict = [AnyHashable: Any]()
        dict["type"] = type.rawValue
        dict["edgeInsets"] = edgeInsets.toDict()
        dict["html"] = html
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

extension InAppDeleteSource {
    static func from(number: NSNumber) -> InAppDeleteSource? {
        guard let value = number as? Int else {
            return nil
        }
        
        return InAppDeleteSource(rawValue: value)
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

extension LogLevel {
    static func from(number: NSNumber) -> LogLevel {
        if let value = number as? Int {
            return LogLevel(rawValue: value) ?? .info
        } else {
            return .info
        }
    }
}

extension InboxImpressionTracker.RowInfo {
    static func from(dict: [AnyHashable: Any]) -> InboxImpressionTracker.RowInfo? {
        guard let messageId = dict["messageId"] as? String else {
            return nil
        }
        
        guard let silentInbox = dict["silentInbox"] as? Bool else {
            return nil
        }
        
        let rowInfo = InboxImpressionTracker.RowInfo(messageId: messageId, silentInbox: silentInbox)
        
        return rowInfo
    }
    
    static func rowInfos(from rows: [[AnyHashable: Any]]) -> [InboxImpressionTracker.RowInfo] {
        return rows.compactMap(InboxImpressionTracker.RowInfo.from(dict:))
    }
}
