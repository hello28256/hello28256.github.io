# frozen_string_literal: true

source "https://rubygems.org"

# remote_theme 方式加载 Minimal Mistakes（MM 官方推荐用于 GitHub Pages）
gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
gem "jekyll-remote-theme"

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
