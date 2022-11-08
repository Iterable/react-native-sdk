require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'Iterable-React-Native-SDK'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'git+https://github.com/Iterable/react-native-sdk.git', :tag => s.version }

  s.requires_arc   = true
  s.platform       = :ios, '10.0'

  s.preserve_paths = 'LICENSE.md', 'README.md', 'package.json', 'index.js'
  s.source_files   = 'ios/**/*.{h,m,swift}'

  s.pod_target_xcconfig = {
    'SWIFT_VERSION' => '5.3'
  }

  s.swift_version = '5.3'

  s.dependency 'Iterable-iOS-SDK', '~> 6.4.9'
  s.dependency 'React-Core'
end
