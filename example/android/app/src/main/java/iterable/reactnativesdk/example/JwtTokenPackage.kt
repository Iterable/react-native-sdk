package iterable.reactnativesdk.example

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class JwtTokenPackage : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == JwtTokenModule.NAME) {
            JwtTokenModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            moduleInfos[JwtTokenModule.NAME] = ReactModuleInfo(
                JwtTokenModule.NAME,
                JwtTokenModule.NAME,
                false,  // canOverrideExistingModule
                false,  // needsEagerInit
                true,   // hasConstants
                false   // isCxxModule
            )
            moduleInfos
        }
    }
}

