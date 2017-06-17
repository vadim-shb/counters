#!/usr/bin/env bash
cd "$(dirname "$0")"

sudo docker stop hcs-postgres
sudo docker rm hcs-postgres
sudo docker volume rm hcs-postgres-log
sudo docker volume rm hcs-postgres-lib
#sudo docker rmi hcs/postgres