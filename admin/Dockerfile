FROM node:14-alpine as ui-builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @vue/cli
COPY . /usr/src/app

ARG VUE_APP_API
ENV VUE_APP_API $VUE_APP_API
ARG VUE_APP_VER
ENV VUE_APP_VER $VUE_APP_VER
RUN npm run build --prod

FROM nginx
COPY  --from=ui-builder /usr/src/app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]