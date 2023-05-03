FROM node:16.16.0

WORKDIR /app

COPY package.json .

COPY . /app/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]