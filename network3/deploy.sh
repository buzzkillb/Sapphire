#!/bin/bash

cd './'

docker stop myshellbox || true && docker rm myshellbox || true
# touch 'myTestFile.js'
docker build --tag=shellbox .
# docker run -p 22:22 shellbox
echo going to try it
# docker run shellbox

docker run -p 4100:4000 --name myshellbox --privileged -d shellbox

echo "try $(docker ps -q --filter=NAME=myshellbox)"

TEST_IT=$(docker exec myshellbox echo "Hello from container!")
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox ls '/~/network/')
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox docker -v)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox //bin//sh || docker exec myshellbox bash)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox pwd)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox bash cd /~/network/)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox sudo sed -i -e 's/\r$//' ./deploy.sh)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox sudo service docker start)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox sudo './deploy.sh')
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox sudo docker container ls)
echo ${TEST_IT}

echo the container id should be

TEST_IT=$(docker exec myshellbox sudo docker ps -q --filter=NAME=friendlyhello2)
echo ${TEST_IT}


TEST_IT1=$(docker exec myshellbox sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker exec myshellbox sudo docker ps -q --filter=NAME=friendlyhello2))
echo ${TEST_IT1}
# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id

TEST_IT2=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' myshellbox)
echo ${TEST_IT2}

TEST_IT=$(docker exec myshellbox curl http://${TEST_IT2}:4000)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox curl http://${TEST_IT1}:4000)
echo ${TEST_IT}

TEST_IT=$(docker exec myshellbox ls)
echo ${TEST_IT}

# TEST_IT=$(docker exec myshellbox dockerd)
# echo ${TEST_IT}

# this will become some ssh stuff I think
# cd '/c/osoese/Sapphire/network3/'
touch 'myTestFile.js'

echo it should be running

# cd 'network'
# ./deploy.sh
