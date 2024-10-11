# Use the official Node.js image.
FROM node:14

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the backend port (5000) that the application will run on.
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]
