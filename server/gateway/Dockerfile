# Pick Node.js to run instance of node app
FROM node:20

# Set working directory in the container
WORKDIR /gateway-app

# Copy dependencies
COPY server/gateway/package.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY server/gateway /gateway-app

# Expose Port
EXPOSE ${GATEWAY_PORT}

# Comamands to start nodemon
CMD ["npm", "run", "dev"]
