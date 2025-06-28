# Build stage
FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 

# Copy package.json and package-lock.json (if available) to leverage Docker cache
# This allows Docker to cache the npm install step unless package files change
COPY . .



RUN npm run build && npm run postbuild

EXPOSE 8080
EXPOSE 3001

CMD ["npm", "run", "start:all"]