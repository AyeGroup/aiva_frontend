FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]
