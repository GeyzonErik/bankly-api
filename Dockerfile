FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine AS production

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/dist/register-aliases.js ./

EXPOSE 3000

ENV NODE_ENV=production
ENV SERVER_PORT=3000

CMD ["node", "dist/app.js"]