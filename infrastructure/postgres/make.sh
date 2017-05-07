#!/usr/bin/env bash

sudo docker build -t hr-postgres .
sudo docker run --name hr-postgres -t -d --net=host hr-postgres