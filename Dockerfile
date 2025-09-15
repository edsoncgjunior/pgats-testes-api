
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --only=production || npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
