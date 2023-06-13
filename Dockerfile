FROM --platform=linux/amd64 node:16.17.1 AS build
ENV NODE_ENV = production
ENV PORT 80

COPY ["package.json", "package-lock.json", "./"]
COPY tsconfig.json ./
COPY tsoa.json ./

RUN npm install --production
RUN npm install -g typescript

COPY . .
COPY --from=build dist ./dist

RUN ls -la dist

EXPOSE 80

CMD ["node", "dist/index.js"]