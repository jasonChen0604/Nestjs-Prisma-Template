FROM node:18.16.1 as builder

ARG PROJECT_PATH=.
ARG ENV=.env
LABEL maintainer jason.chen.develop@gmail.com

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN corepack enable

COPY ${PROJECT_PATH}/package.json ${PROJECT_PATH}/pnpm-lock.yaml ./
# COPY ./prisma ./prisma
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ${PROJECT_PATH} .
COPY ./${ENV} .env
RUN pnpm prisma

RUN pnpm build 

# ---

FROM keymetrics/pm2:18-alpine

ARG ENV=.env
LABEL maintainer jason.chen.develop@gmail.com
ENV NODE_ENV production
RUN corepack enable

RUN apk add --no-cache curl

USER node
WORKDIR /app

RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:dateFormat YYYY_MM_DD
RUN pm2 set pm2-logrotate:rotateInterval '0 0 * * *'

COPY ./${ENV} .env
COPY ./prisma /app/prisma
COPY ./statics /app/statics
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/
COPY --from=builder --chown=node:node /app/ecosystem.config.js ./

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]