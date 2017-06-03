#!/usr/bin/env bash

sudo docker build -t hcs/postgres .
sudo docker run --name hcs-postgres -t -d \
            -p 5433:5432 \
            -v hcs-postgres-log:/var/log/postgresql \
            -v hcs-postgres-lib:/var/lib/postgresql \
            hcs/postgres