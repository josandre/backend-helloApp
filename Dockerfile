FROM --platform=linux/amd64 node:16.17.1
ENV NODE_ENV = production
ENV PORT 80

COPY ["package.json", "package-lock.json", "./"]
COPY tsconfig.json ./
COPY tsoa.json ./

RUN npm install --production
RUN npm install -g typescript

COPY . .
RUN npm run build
COPY ./dist .

RUN ls -la
EXPOSE 80

CMD ["node", "dist/index.js"]