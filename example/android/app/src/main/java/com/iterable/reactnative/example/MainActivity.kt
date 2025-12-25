package com.iterable.reactnative.example

import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent
import android.net.Uri
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
    super.onCreate(null)
    handleIntent(intent)
}

  override fun onNewIntent(intent: Intent?) {
      super.onNewIntent(intent)
      intent?.let {
          handleIntent(it)
      }
  }

  private fun handleIntent(intent: Intent?) {
      if (intent?.action == Intent.ACTION_VIEW && intent.data != null) {
          IterableApi.getInstance().handleAppLink(intent.dataString!!) // Add !! to assert non-null
          // Overwrite the intent to make sure we don't open the deep link
          // again when the user opens our app later from the task manager
          setIntent(Intent(Intent.ACTION_MAIN))
      }
  }
}
