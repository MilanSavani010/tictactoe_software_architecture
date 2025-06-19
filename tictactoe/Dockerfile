FROM node:22-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use nginx for serving static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]