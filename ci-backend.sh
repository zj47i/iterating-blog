#!/bin/bash

SERVICE_NAME="iterating-blog"

# local, dev, stage, prod
STAGE="$1"
if [[ "$STAGE" != "local" && "$STAGE" != "dev" && "$STAGE" != "stage" && "$STAGE" != "prod" ]]; then
    echo "Invalid stage. Please provide one of the following: local, dev, stage, prod"
    exit 1
fi

# Docker build, tag, and push commands
export DOCKER_HOST="tcp://user@192.168.0.5:2375"
docker build -t $SERVICE_NAME-backend-$STAGE:latest -f dockerfile.backend .
