docker build -t bionode .
docker run -it -p 3001:3001 --rm --name bionode-running bionode
