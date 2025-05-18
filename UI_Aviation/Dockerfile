FROM node:20-alpine as build

WORKDIR /app
COPY . .
COPY package*.json ./

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

# ARG BLUEBOOK_IP=localhost
# RUN find /usr/share/nginx/html/static/js -type f -exec sed -i "s|localhost|$BLUEBOOK_IP|g" '{}' +
CMD ["nginx", "-g", "daemon off;"]
