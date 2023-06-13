FROM --platform=linux/amd64 node:16.17.1
ENV NODE_ENV = production
ENV PORT 80

COPY ["package.json", "package-lock.json", "./"]
COPY tsconfig.json ./

RUN npm install --production

COPY . .
EXPOSE 80

CMD ["node", "dist/index.js"]