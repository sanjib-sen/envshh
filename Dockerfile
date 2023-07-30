# Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

FROM node:alpine as builder
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node . .
RUN npm install && \
    npm run build && \
    rm -rf node_modules && \
    npm ci --omit=dev

FROM node:alpine as production
ENV NODE_ENV production
WORKDIR /app
USER node
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist .

CMD ["node", "src/index.js"]