#!/bin/bash

cd './'

docker stop myshellbox || true && docker rm myshellbox || true
# touch 'myTestFile.js'
docker build --tag=shellbox .
# docker run -p 22:22 shellbox
echo going to try it
# docker run shellbox

docker run --name myshellbox --privileged -d shellbox

echo "try $(docker ps -q --filter=NAME=myshellbox)"

TEST_IT=$(docker exec myshellbox echo "Hello from container!")
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox ls '/~/network/')
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox docker -v)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox //bin//sh)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox dockerd)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox dockerd)
echo ${TEST_IT}


TEST_IT=$(docker exec myshellbox './deploy.sh')
echo ${TEST_IT}

# this will become some ssh stuff I think
cd '/c/osoese/Sapphire/network2/'
touch 'myTestFile.js'

echo it should be running

# cd 'network'
# ./deploy.sh
