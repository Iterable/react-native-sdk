//
//  IterableJwtGenerator.swift
//  ReactNativeSdkExample
//
//  Utility class to generate JWTs for use with the Iterable API
//

import CryptoKit
import Foundation

@objcMembers public final class IterableJwtGenerator: NSObject {

  private struct Header: Encodable {
    let alg = "HS256"
    let typ = "JWT"
  }

  /// Base64 URL encode without padding (URL-safe base64 encoding for JWT)
  private static func urlEncodedBase64(_ data: Data) -> String {
    let base64 = data.base64EncodedString()
    return
      base64
      .replacingOccurrences(of: "+", with: "-")
      .replacingOccurrences(of: "/", with: "_")
      .replacingOccurrences(of: "=", with: "")
  }

  /// Generic JWT generation helper that works with any Encodable payload
  private static func generateJwt<T: Encodable>(secret: String, payload: T) -> String {
    let headerJsonData = try! JSONEncoder().encode(Header())
    let headerBase64 = urlEncodedBase64(headerJsonData)

    let payloadJsonData = try! JSONEncoder().encode(payload)
    let payloadBase64 = urlEncodedBase64(payloadJsonData)

    let toSign = Data((headerBase64 + "." + payloadBase64).utf8)

    if #available(iOS 13.0, *) {
      let privateKey = SymmetricKey(data: Data(secret.utf8))
      let signature = HMAC<SHA256>.authenticationCode(for: toSign, using: privateKey)
      let signatureBase64 = urlEncodedBase64(Data(signature))

      let token = [headerBase64, payloadBase64, signatureBase64].joined(separator: ".")

      return token
    }
    return ""
  }

  public static func generateJwtForEmail(secret: String, iat: Int, exp: Int, email: String)
    -> String
  {
    struct Payload: Encodable {
      var email: String
      var iat: Int
      var exp: Int
    }

    return generateJwt(secret: secret, payload: Payload(email: email, iat: iat, exp: exp))
  }

  public static func generateJwtForUserId(secret: String, iat: Int, exp: Int, userId: String)
    -> String
  {
    struct Payload: Encodable {
      var userId: String
      var iat: Int
      var exp: Int
    }

    return generateJwt(secret: secret, payload: Payload(userId: userId, iat: iat, exp: exp))
  }

  public static func generateToken(
    secret: String, durationMs: Int64, email: String?, userId: String?
  ) throws -> String {
    // Convert durationMs from milliseconds to seconds
    let durationSeconds = Double(durationMs) / 1000.0
    let currentTime = Date().timeIntervalSince1970

    if userId != nil {
      return generateJwtForUserId(
        secret: secret, iat: Int(currentTime),
        exp: Int(currentTime + durationSeconds), userId: userId!)
    } else if email != nil {
      return generateJwtForEmail(
        secret: secret, iat: Int(currentTime),
        exp: Int(currentTime + durationSeconds), email: email!)
    } else {
      throw NSError(
        domain: "JWTGenerator", code: 6,
        userInfo: [NSLocalizedDescriptionKey: "No email or userId provided"])
    }
  }
}
