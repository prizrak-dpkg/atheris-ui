FROM node:18.15.0-alpine3.16 as build-stage
RUN npm install -g pnpm
WORKDIR /ui
COPY . /ui
RUN pnpm install
RUN pnpm run lint --fix
RUN pnpm run build

FROM nginx:1.23-alpine as production-stage
COPY --from=build-stage /ui/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
