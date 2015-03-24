require './lib/bem-constructor'

Gem::Specification.new do |s|
  # Release Specific Information
  s.version = QuantityQueries::VERSION
  s.date = QuantityQueries::DATE

  # Gem Details
  s.name = "bem-constructor"
  s.rubyforge_project = "bem-constructor"
  s.description = %q{A Sass library for building immutable and namespaced BEM-style CSS objects}
  s.summary = %q{BEM Constructor is a Sass library for building immutable and namespaced BEM-style CSS objects. By enforcing a consistent and programatic way of defining objects (blocks, elements and modifiers) it ensures a more structured, robust and secure object codebase that is easy to understand and maintain. Objects defined using the constructor are impossible to modify and reassign by mistake or omission.}
  s.authors = ["Daniel Guillan"]
  s.email = ["daniel.guillan@gmail.com"]
  s.homepage = "https://github.com/danielguillan/bem-constructor"

  # LICENSE file
  s.licenses = ['MIT']

  # README file
  s.files = ["README.md"]

  # CHANGELOG
  s.files += ["CHANGELOG.md"]

  # Library Files
  s.files += Dir.glob("lib/**/*.*")

  # Sass Files
  s.files += Dir.glob("stylesheets/**/*.*")

  # Gem Bookkeeping
  s.required_rubygems_version = ">= 1.3.6"
  s.rubygems_version = %q{1.3.6}

  # Gems Dependencies
  s.add_dependency("sass",      ["~> 3.4"])
  s.add_dependency("compass",   ["~> 1.0"])
end
