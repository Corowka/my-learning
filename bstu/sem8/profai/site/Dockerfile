FROM node:18-alpine AS builder

WORKDIR /site
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /site
COPY --from=builder /site/.next ./.next
COPY --from=builder /site/public ./public
COPY --from=builder /site/package.json ./package.json
COPY --from=builder /site/node_modules ./node_modules
COPY --from=builder /site/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]