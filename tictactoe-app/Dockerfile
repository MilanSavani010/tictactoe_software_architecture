# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json (if available) to leverage Docker cache
# This allows Docker to cache the npm install step unless package files change
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 8080

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]