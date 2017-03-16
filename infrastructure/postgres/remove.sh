#!/usr/bin/env bash

docker stop hr-postgres
docker rm hr-postgres
docker rmi hr-postgres