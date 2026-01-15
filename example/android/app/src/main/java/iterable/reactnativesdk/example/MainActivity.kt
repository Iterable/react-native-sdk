package iterable.reactnativesdk.example

import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.iterable.iterableapi.IterableApi

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ReactNativeSdkExample"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  /**
   * For react-native-screens
   * This being in Kotlin **may** cause issues with react-native-screens
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    IterableApi.setContext(this)
    // Call super.onCreate with null to prevent savedInstanceState restoration issues
    super.onCreate(null)
  }
}
