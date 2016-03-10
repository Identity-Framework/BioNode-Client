# Get the ubuntu base image
FROM debian:sid

# Author
MAINTAINER Cory Sabol

# Update the apt refs
RUN apt-get -y update

# Install deps
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y git
RUN apt-get install -y npm 

# Set the working dir
WORKDIR /bionode/

# Install the application deps just in case
CMD npm install

# Start the app
CMD npm start


