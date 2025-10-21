//
//  JwtTokenModule.swift
//  ReactNativeSdkExample
//
//  React Native module to generate JWT tokens
//

import Foundation
import React

@objc(JwtTokenModule)
class JwtTokenModule: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func generateJwtToken(
    _ secret: String,
    durationMs: Double,
    email: String?,
    userId: String?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    do {
      let token = try IterableJwtGenerator.generateToken(
        secret: secret,
        durationMs: Int64(durationMs),
        email: email,
        userId: userId
      )
      resolve(token)
    } catch {
      reject("JWT_GENERATION_ERROR", error.localizedDescription, error)
    }
  }
}
