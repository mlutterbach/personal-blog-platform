ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)
port = ENV['PORT'] || 3000

website_url = ENV['WEBSITE_URL']

require "bundler/setup" # Set up gems listed in the Gemfile.
require "bootsnap/setup" # Speed up boot time by caching expensive operations.
