FROM node:13-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "/app/index.js"]
