package iterable.reactnativesdk.example

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.iterable.IterableJwtGenerator
import java.time.Duration

class JwtTokenModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun generateJwtToken(
        secret: String,
        durationMs: Double,
        email: String?,
        userId: String?,
        promise: Promise
    ) {
        try {
            val duration = Duration.ofMillis(durationMs.toLong())
            val token = IterableJwtGenerator.generateToken(secret, duration, email, userId)
            promise.resolve(token)
        } catch (e: Exception) {
            promise.reject("JWT_GENERATION_ERROR", e.message, e)
        }
    }

    companion object {
        const val NAME = "JwtTokenModule"
    }
}

