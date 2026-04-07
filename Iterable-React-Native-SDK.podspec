require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "Iterable-React-Native-SDK"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/Iterable/react-native-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"
  s.private_header_files = "ios/**/*.h"

  s.swift_version = '5.9'

  # Load Iterables iOS SDK as a dependency
  s.dependency "Iterable-iOS-SDK", "6.6.7"

  # Basic Swift support
  s.pod_target_xcconfig = {
    'DEFINES_MODULE'      => 'YES',
    'CLANG_ENABLE_MODULES' => 'YES',
    'SWIFT_VERSION'       => '5.9',
    'SWIFT_OBJC_INTERFACE_HEADER_NAME' => 'Iterable_React_Native_SDK-Swift.h',
    "CLANG_CXX_LANGUAGE_STANDARD" => rct_cxx_language_standard(),
    'ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES' => '$(inherited)',
  }

  install_modules_dependencies(s)

end
