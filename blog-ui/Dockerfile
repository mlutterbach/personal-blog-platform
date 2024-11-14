FROM node:21.7.2 AS build

# Set working directory and copy dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the app code and build it
COPY . .
RUN npm run build

# Use a lightweight server to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
