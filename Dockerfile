# FROM circleci/node:latest-browsers

# WORKDIR /usr/src/app/
# USER root
# COPY package.json ./
# RUN yarn

# COPY ./ ./

# RUN npm run test:all

# RUN npm run fetch:blocks

# CMD ["npm", "run", "build"]

# Dev build is currently added to production build also
FROM node:14.18.0

WORKDIR /usr/src/app/

COPY package.json ./

RUN yarn cache clean

RUN yarn

COPY ./ ./

CMD ["yarn", "start"]
