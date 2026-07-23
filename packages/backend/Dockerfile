FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=prisma/schema.prisma
RUN npx prisma generate --schema=prisma-mongodb/schema.prisma
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma-mongodb ./prisma-mongodb

RUN mkdir -p uploads

CMD ["node", "dist/server.js"]
