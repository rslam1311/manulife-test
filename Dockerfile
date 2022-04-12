FROM node

WORKDIR /home/app

COPY ./package.json .

RUN npm i

COPY ./build .

COPY *.html .

CMD ["node", "./main.js"]
