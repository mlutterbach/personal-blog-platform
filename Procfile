web: cd blog && bundle install && bundle exec rake assets:precompile && bundle exec puma -C config/puma.rb

client: cd blog-ui && npm install && npm run build && cp -a blog-ui/build/. blog/public/

release: cd blog && bin/rails db:migrate
