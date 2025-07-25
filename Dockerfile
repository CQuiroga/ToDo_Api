FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]