# frozen_string_literal: true

source "https://rubygems.org"

# 不引 github-pages 元 gem —— 它会把 jekyll 锁到 3.10，
# 3.x 的 collections 处理与 _site_template ERB 冲突。
# 这里显式用 jekyll 4 + jekyll-remote-theme，让 GH Actions 与本地一致。

gem "jekyll", "~> 4.4"
gem "jekyll-remote-theme"
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
