# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Build the SPA using Parcel
RUN npm run build

# Serve the SPA using a simple HTTP server, e.g., serve
# You might need to install 'serve' or another HTTP server if you prefer
RUN npm install -g http-server
WORKDIR /usr/src/app/dist

# Expose port 5000 (the default for serve) for the container
EXPOSE 3000

# Run the SPA
CMD ["http-server", "-p", "3000"]
