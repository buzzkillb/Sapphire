#!/bin/bash

echo 'beginning the in docker build'

# cd './'

echo ls
# touch 'myTestFile.js'
docker stop friendlyhello || true && docker rm friendlyhello || true

docker build --tag=friendlyhello .

docker run -p 4000:80 --name friendlyhello2 --privileged -d friendlyhello

echo "try $(docker ps -q --filter=NAME=friendlyhello2)"

# cd './network/'
touch 'myTestFile.js'

echo ls

echo here we are

echo it should be running
