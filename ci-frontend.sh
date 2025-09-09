#!/bin/bash

SERVICE_NAME="iterating-blog"

# local, dev, stage, prod
STAGE="$1"
if [[ "$STAGE" != "local" && "$STAGE" != "dev" && "$STAGE" != "stage" && "$STAGE" != "prod" ]]; then
    echo "Invalid stage. Please provide one of the following: local, dev, stage, prod"
    exit 1
fi

# Docker build, tag, and push commands
export DOCKER_HOST="tcp://user@192.168.0.3:2375"
docker build --build-arg VITE_BACKEND_BASE_URL="https://backend.iterating.io" -t $SERVICE_NAME-$STAGE:latest -f dockerfile.frontend .
