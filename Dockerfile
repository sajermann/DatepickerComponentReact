FROM node:16.5.0 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
RUN npm install

COPY . ./
RUN npm install -g typescript
RUN npm install -g eslint


RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
RUN ls
ECHO ls
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
