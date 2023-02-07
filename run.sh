#!/bin/bash
set -e

if [[ $1 == "local" ]]; then
  docker-compose up --force-recreate --build --remove-orphans monitoring-web-local
elif [[ $1 == "cloud" ]]; then
  docker-compose up --force-recreate --build --remove-orphans monitoring-web-cloud
else
  echo "Invalid argument"
fi
