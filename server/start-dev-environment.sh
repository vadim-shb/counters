#!/usr/bin/env bash

sudo docker start hcs-postgres
./gradlew build --continuous