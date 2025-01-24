# Pick Node.js to run instance of node app
FROM node:18

# Set working directory in the container
WORKDIR /auth-app

# Copy dependencies
COPY server/auth-service/package.json server/auth-service/package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY server/auth-service /auth-app

# Expose Port
EXPOSE ${AUTH_SERVICE_PORT}

# Comamands to start nodemon
CMD ["npm", "run", "dev"]





