FROM node

# Author
MAINTAINER Cory Sabol

# Create the app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app deps
COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3001

# Start the app
CMD ["npm", "start"]

