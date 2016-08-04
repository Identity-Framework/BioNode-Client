
# Check to see if the script is being ran as root
# This can be avoided in the future if the user is a member in the docker group
if ["$EUID" -ne 0]; then 
    echo "Please run as root."
    exit
fi

# Build the container and launch the app.
# Should check to see if the container is already built or running.
docker build -t bionode .
docker run -it -p 3001:3001 --rm --name bionode-running bionode
