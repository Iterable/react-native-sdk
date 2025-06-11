# require "json"

# package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Pod::Spec.new do |s|
#   s.name         = "Iterable-React-Native-SDK"
#   s.version      = package["version"]
#   s.summary      = package["description"]
#   s.homepage     = package["homepage"]
#   s.license      = package["license"]
#   s.authors      = package["author"]

#   s.platforms    = { :ios => min_ios_version_supported }
#   s.source       = { :git => "https://github.com/Iterable/react-native-sdk.git", :tag => "#{s.version}" }

#   s.source_files = "ios/**/*.{h,m,mm,swift}"

#   s.dependency "Iterable-iOS-SDK", "6.5.4"
#   # React Native Core dependency
#   install_modules_dependencies(s)

# end

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  # Default fields for a valid podspec
  s.name            = "Iterable-React-Native-SDK"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms    = { :ios => min_ios_version_supported }
  # s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source       = { :git => "https://github.com/Iterable/react-native-sdk.git", :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"
  s.private_header_files = "ios/**/*.h"

  s.dependency "Iterable-iOS-SDK", "6.5.4"

  # React Native Core dependency
  install_modules_dependencies(s)
end