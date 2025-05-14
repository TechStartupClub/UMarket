# Pick Node.js to run instance of node app
FROM node:23

# Set working directory in the container
WORKDIR /market-app

# Copy dependencies
COPY server/market-service/package.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node

# Copy application code
COPY server/market-service /market-app

# Expose Port
EXPOSE ${MARKET_SERVICE_PORT}

# Comamands to start nodemon
CMD ["npm", "run", "dev"]



