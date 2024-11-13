web: cd blog && bundle install && bundle exec rake assets:precompile && bundle exec puma -C config/puma.rb
release: cd blog && bin/rails db:migrate
postdeploy: cd blog-ui && npm install && npm run build
