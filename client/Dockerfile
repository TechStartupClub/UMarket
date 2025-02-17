FROM node:20

WORKDIR /react-app

COPY client/package.json client/package-lock.json client/vite.config.ts ./

RUN npm install

COPY client ./

EXPOSE 5173

CMD ["npm", "run", "dev"]