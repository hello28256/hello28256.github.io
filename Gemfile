# frozen_string_literal: true

source "https://rubygems.org"

# fork/direct-copy 路线（README 第三种安装方式）：
# 我们把 mm 的 _layouts / _includes / _sass / _data / assets 直接 fork 进了
# 仓库，theme gem 仍装用来给 _layouts / _includes 提供 fallback，
# 不依赖 jekyll-remote-theme。

gem "jekyll", "~> 4.4"
gem "minimal-mistakes-jekyll"
gem "jekyll-include-cache", group: :jekyll_plugins
gem "jekyll-paginate"
gem "jekyll-sitemap"
gem "jekyll-gist"
gem "jekyll-feed"

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
