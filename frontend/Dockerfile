# Use an official node runtime as a parent image
FROM node:16-alpine

# Set work directory, we can name it whatever we want
WORKDIR /frontend/code/

# Copy the package.json file into work directory & install dependencies
COPY package*.json /frontend/code/
RUN npm install

# Add rest of the client code
COPY . /frontend/code/
RUN chown -R node:node /frontend/code/node_modules
EXPOSE 3000

CMD npm start
