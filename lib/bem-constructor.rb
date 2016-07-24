require 'compass'
extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
Compass::Frameworks.register('bem-constructor', :path => extension_path)

module BEMConstructor
  VERSION = "1.1.0"
  DATE = "2016-02-07"
end
