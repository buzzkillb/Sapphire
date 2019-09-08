#!/bin/bash


cd './'
# touch 'myTestFile.js'
docker build --tag=friendlyhello .
docker run -p 4000:80 friendlyhello


cd '/c/osoese/Sapphire/network/'
touch 'myTestFile.js'

echo it should be running
