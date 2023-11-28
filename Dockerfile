# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.18.2

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app
COPY package*.json ./
# Expose the desired port for your Nest.js application
EXPOSE 3000

FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .

CMD [ "npm", "run", "start:dev" ]

FROM dev AS test
ENV NODE_ENV=test
CMD [ "npm", "run", "test" ]

FROM test AS test-cov
CMD [ "npm", "run", "test:cov" ]

FROM dev AS test-watch
ENV GIT_WORK_TREE=/app GIT_DIR=/app/.git
RUN apt add git
CMD [ "npm", "run", "test:watch" ]

FROM base as prod
ENV NODE_ENV=production
RUN npm install

# Copy the package.json and package-lock.json files to the working directory
COPY . .

RUN npm install -g @nestjs/cli
RUN npm run build

# Start the Nest.js application
CMD [ "npm", "run", "start:prod" ]