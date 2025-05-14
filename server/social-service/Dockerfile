# Pick Node.js to run instance of node app
FROM node:23

# Set working directory in the container
WORKDIR /social-app

# Copy dependencies
COPY server/social-service/package.json ./

# Install dependencies
RUN npm install
#RUN npm install -g nodemon

# Copy application code
COPY server/social-service /social-app

# Expose Port
EXPOSE ${SOCIAL_SERVICE_PORT}

# Commands to start nodemon
CMD ["npm", "run", "dev"]





