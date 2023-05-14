FROM node:18.15.0-alpine3.16 as build-stage
RUN npm install -g pnpm
WORKDIR /ui
COPY package*.json /ui
RUN pnpm install
COPY . /ui
RUN pnpm run lint --fix
RUN npm i --save-dev @types/node
RUN pnpm run build

FROM nginx:1.23-alpine as production-stage
COPY --from=build-stage /ui/prod.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /ui/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]