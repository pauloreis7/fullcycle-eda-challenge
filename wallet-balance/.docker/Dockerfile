FROM node:18-alpine as deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --chown=node:node package.json package-lock.json* ./

RUN npm ci

FROM node:18-alpine as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npx prisma generate
RUN npx tsc prisma/seed.ts
RUN npm run build

RUN npm ci --omit=dev

FROM node:18-alpine as runner

ENV HOME /app

RUN mkdir -p ${HOME} && chown node:node ${HOME}

WORKDIR ${HOME}

ENV PATH /app/node_modules/.bin:$PATH

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3333
ENV PORT $PORT

RUN apk add dumb-init

USER node

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./
COPY --from=builder /app/prisma ./

EXPOSE $PORT

CMD ["dumb-init", "node", "main.js"]
