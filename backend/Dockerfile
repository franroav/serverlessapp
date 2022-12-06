FROM node:alpine
# Create app directory
WORKDIR /usr/src/app


#Install app dependencies
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install -g @nestjs/cli
RUN npm install --save aws-serverless-express
RUN npm install --save aws-lambda
RUN npm install --save-dev serverless-plugin-typescript
RUN npm install --save-dev serverless-plugin-optimize
RUN npm install --save-dev serverless-offline plugin
# npm continuous integration 
RUN npm ci
# Bundle app source 
COPY . .
RUN npm run build
EXPOSE 3000 5000
# Run npm Istall 
# CMD ["npm", "run", "start:dev"]
CMD ["sls", "offline", "start"]
  
#CMD ["node", "dist/main"]
