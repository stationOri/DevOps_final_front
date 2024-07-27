FROM node:14
WORKDIR /app
COPY ./devops-final-front/package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]










