$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "handy_location_inputs/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "handy_location_inputs"
  spec.version     = HandyLocationInputs::VERSION
  spec.authors     = ["handofthecode"]
  spec.email       = ["deartovi@gmail.com"]
  spec.homepage    = "https://github.com/handofthecode/handy_location_inputs"
  spec.summary     = "HandyLocationInputs auto suggests locations as the user types. It prevents them from continuing until a valid location is selected. Subordinate input possibilities are requested from the server via ajax as soon as approved locations are entered. Cases are fixed."
  spec.description = "HandyLocationInputs is a great way to get uniform location input from a user without resorting to the use of unwieldly select boxes."
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 5.2.3"

  # spec.add_development_dependency "sqlite3"
end
