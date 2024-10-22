# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json to install dependencies first (cache step)
COPY exp-backend/package.json ./ 
COPY exp-backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY exp-backend .

# Build TypeScript files to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "run", "start"]
