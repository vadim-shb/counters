#!/usr/bin/env bash

docker build -t hr-postgres .
docker run --name hr-postgres -t -d --net=host hr-postgres