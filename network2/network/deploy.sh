#!/bin/bash

echo 'beginning the in docker build'

cd './'

echo ls
# touch 'myTestFile.js'
docker build --tag=friendlyhello .
docker run -p 4000:80 friendlyhello


# cd './network/'
touch 'myTestFile.js'

echo it should be running
