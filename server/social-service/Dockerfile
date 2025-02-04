# Pick Node.js to run instance of node app
FROM node:20

# Set working directory in the container
WORKDIR /social-app

# Copy dependencies
COPY server/social-service/package.json server/social-service/package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY server/social-service /social-app

# Expose Port
EXPOSE ${SOCIAL_SERVICE_PORT}

# Commands to start nodemon
CMD ["npm", "run", "dev"]





