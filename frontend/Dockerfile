FROM node:21.7.3 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --output-path=/dist

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /dist/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
