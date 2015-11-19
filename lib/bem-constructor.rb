require 'compass'
extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
Compass::Frameworks.register('bem-constructor', :path => extension_path)

module BEMConstructor
  VERSION = "0.9.0"
  DATE = "2015-03-26"
end
