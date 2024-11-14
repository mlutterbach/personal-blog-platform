# Stage 1: Build React frontend
FROM node:21.7.2 AS frontend-build

# Set working directory and copy dependencies for React app
WORKDIR /app
COPY blog-ui/package*.json ./
RUN npm install

# Copy React app code and build it
COPY blog-ui/ .
RUN npm run build

# Stage 2: Setup Ruby and install dependencies for Rails backend
ARG RUBY_VERSION=3.2.5
FROM ruby:$RUBY_VERSION-slim AS base

# Rails app working directory
WORKDIR /rails

# Install necessary packages
RUN apt-get update -qq && \
    apt-get install -y postgresql-client libpq-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development test"

# Throw-away build stage to reduce size of final image
FROM base AS rails-build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install application gems
COPY blog/Gemfile blog/Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy Rails application code
COPY blog/ .

# Copy the built React assets from Stage 1 into Rails `public` directory
COPY --from=frontend-build /app/build /rails/public

# Precompile Rails assets
RUN SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

# Final stage for the application image
FROM base

# Copy built artifacts: gems and application code
COPY --from=rails-build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=rails-build /rails /rails

# Setup runtime user and permissions
RUN groupadd --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp

USER rails:rails

# Entrypoint to handle database setup
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Expose Rails server port
EXPOSE 3000

# Default start command to run the Rails server
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]
