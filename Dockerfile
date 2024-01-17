FROM node:18-alpine
ENV PROD=true

EXPOSE 8080

WORKDIR /home/node/app

COPY package.json ./
RUN npm install

USER node

COPY --chown=node:node . .
RUN npm run test

CMD [ "node", "app.js" ]