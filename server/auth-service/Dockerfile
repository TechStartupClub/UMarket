# Pick Node.js to run instance of node app
FROM node:23

# Set working directory in the container
WORKDIR /auth-app

# Copy dependencies
COPY server/auth-service/package.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node

# Copy application code
COPY server/auth-service /auth-app

# Expose Port
EXPOSE ${AUTH_SERVICE_PORT}

# Comamands to start nodemon
CMD ["npm", "run", "dev"]





