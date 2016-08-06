#!/bin/bash

# Check to see if the script is being ran as root
# This can be avoided in the future if the user is a member in the docker group
# Perhaps add an OR to the statement which checks if the user is a memeber of the group
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root."
    exit
fi

# Build the container and launch the app.
# Should check to see if the container is already built or running.
docker build -t bionode-client .
# docker run -v /host/directory:/container/directory -other -options image_name command_to_run
# docker run -it -v /./:/usr/src/app -p 3001:3001 --rm --name bionode-running bionode
docker run  -it -p 3001:3001 --rm --name bionode-client-running bionode-client
