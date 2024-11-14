FROM ruby:3.2.5

# Install dependencies for building native extensions
RUN apt-get update && apt-get install -y postgresql-client \
  && rm -rf /var/lib/apt/lists/*

# Set up work directory
WORKDIR /rails
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-dev-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

# Set up the command to run the app
CMD ["rails", "server", "-b", "0.0.0.0"]
