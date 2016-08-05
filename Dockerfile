FROM node

# Author
MAINTAINER Cory Sabol

# Create the app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install gulp for streaming builds
RUN npm install gulp -g

# Install app deps
COPY package.json /usr/src/app
RUN npm install

# COPY gulpfile.js /usr/src/app
# RUN gulp --gulpfile gulpfile.js

# Bundle app source
COPY . /usr/src/app

EXPOSE 3001
# Gulp rebuild port
EXPOSE 35729

# Start the app
CMD ["npm", "start"]
# CMD ["gulp", "--gulpfile", "gulpfile.js"]

