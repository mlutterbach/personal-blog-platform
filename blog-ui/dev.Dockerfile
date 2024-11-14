FROM node:21.7.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
