FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
# required for docker desktop port mapping

CMD ["npm", "start"]