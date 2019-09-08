from phusion/passenger-nodejs

RUN apt-get update && \
apt-get -y install sudo; apt-get -y install curl; useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo; \
sudo apt-get update; sudo apt-get remove docker docker-engine docker.io; sudo apt -y install docker.io; \
sudo apt-get -y install systemd; sudo systemctl start docker; sudo systemctl enable docker; \
sudo service docker start

# Set the working directory to /app
WORKDIR /~/network

COPY ./network /~/network

# Make port 4000 available to the world outside this container
EXPOSE 4000
