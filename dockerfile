FROM node:14-alpine
WORKDIR /app
COPY app.js package*.json ./
RUN npm install
COPY . .
EXPOSE 5050
CMD node app.js
