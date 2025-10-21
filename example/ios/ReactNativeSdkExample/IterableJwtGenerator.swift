//
//  IterableJwtGenerator.swift
//  ReactNativeSdkExample
//
//  Utility class to generate JWTs for use with the Iterable API
//

import CryptoKit
import Foundation

class IterableJwtGenerator {

  private static let algorithm = "HS256"
  private static let maxTokenLifetimeMs: Int64 = 365 * 24 * 60 * 60 * 1000  // 1 year in milliseconds

  private static func millisToSeconds(_ millis: Int64) -> Int64 {
    return millis / 1000
  }

  /// Base64 URL encode without padding
  private static func base64UrlEncode(_ data: Data) -> String {
    let base64 = data.base64EncodedString()
    return
      base64
      .replacingOccurrences(of: "+", with: "-")
      .replacingOccurrences(of: "/", with: "_")
      .replacingOccurrences(of: "=", with: "")
  }

  private static let encodedHeader: String = {
    let header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}"
    let headerData = header.data(using: .utf8)!
    return base64UrlEncode(headerData)
  }()

  /// Generates a JWT from the provided secret and payload
  /// - Parameters:
  ///   - secret: Your organization's shared secret with Iterable
  ///   - payload: The JSON payload
  /// - Returns: A signed JWT
  static func generateToken(secret: String, payload: String) throws -> String {
    guard let payloadData = payload.data(using: .utf8) else {
      throw NSError(
        domain: "JWTGenerator", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid payload"])
    }

    let encodedPayload = base64UrlEncode(payloadData)
    let encodedHeaderAndPayload = "\(encodedHeader).\(encodedPayload)"

    guard let secretData = secret.data(using: .utf8),
      let messageData = encodedHeaderAndPayload.data(using: .utf8)
    else {
      throw NSError(
        domain: "JWTGenerator", code: 2,
        userInfo: [NSLocalizedDescriptionKey: "Invalid secret or message"])
    }

    // HMAC-SHA256 signature
    let key = SymmetricKey(data: secretData)
    let signature = HMAC<SHA256>.authenticationCode(for: messageData, using: key)
    let signatureData = Data(signature)
    let encodedSignature = base64UrlEncode(signatureData)

    return "\(encodedHeaderAndPayload).\(encodedSignature)"
  }

  /// Generates a JWT (issued now, expires after the provided duration)
  /// - Parameters:
  ///   - secret: Your organization's shared secret with Iterable
  ///   - durationMs: The token's expiration time in milliseconds. Up to one year.
  ///   - email: The email to include in the token, or nil
  ///   - userId: The userId to include in the token, or nil
  /// - Returns: A JWT string
  static func generateToken(secret: String, durationMs: Int64, email: String?, userId: String?)
    throws -> String
  {
    guard durationMs <= maxTokenLifetimeMs else {
      throw NSError(
        domain: "JWTGenerator", code: 3,
        userInfo: [NSLocalizedDescriptionKey: "Duration must be one year or less."])
    }

    let hasEmail = email != nil && !email!.isEmpty
    let hasUserId = userId != nil && !userId!.isEmpty

    guard (hasEmail && !hasUserId) || (!hasEmail && hasUserId) else {
      throw NSError(
        domain: "JWTGenerator", code: 4,
        userInfo: [
          NSLocalizedDescriptionKey: "The token must include a userId or email, but not both."
        ])
    }

    let now = millisToSeconds(Int64(Date().timeIntervalSince1970 * 1000))
    let exp = now + millisToSeconds(durationMs)

    var payloadDict: [String: Any] = [
      "iat": now,
      "exp": exp,
    ]

    if let userId = userId {
      payloadDict["userId"] = userId
    } else if let email = email {
      payloadDict["email"] = email
    }

    guard let payloadData = try? JSONSerialization.data(withJSONObject: payloadDict, options: []),
      let payload = String(data: payloadData, encoding: .utf8)
    else {
      throw NSError(
        domain: "JWTGenerator", code: 5,
        userInfo: [NSLocalizedDescriptionKey: "Failed to serialize payload"])
    }

    return try generateToken(secret: secret, payload: payload)
  }
}
