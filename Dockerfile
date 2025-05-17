FROM node:23.11.1-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma/ ./prisma/

COPY . .
EXPOSE 3000
RUN npm install --omit=dev

CMD ["npm", "run", "dev"]
