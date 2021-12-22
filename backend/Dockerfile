FROM node:16.10.0

WORKDIR /usr/src/millioner-api

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

COPY  src /usr/src/millioner-api/src

RUN ls -a

RUN npm install

RUN npm run build

EXPOSE 3000