#!/usr/bin/env bash
# exit on error
set -o errexit

rm -rf public
npm install --prefix blog-ui && npm run build --prefix blog-ui
cp -a blog-ui/build/. public/

bundle install
bundle exec rails assets:precompile
bundle exec rails assets:clean
bundle exec rake db:migrate
