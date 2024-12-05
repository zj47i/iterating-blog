#!/bin/bash

SERVICE_NAME="iterating"

# local, dev, stage, prod
STAGE="$1"
if [[ "$STAGE" != "local" && "$STAGE" != "dev" && "$STAGE" != "stage" && "$STAGE" != "prod" ]]; then
    echo "Invalid stage. Please provide one of the following: local, dev, stage, prod"
    exit 1
fi

# Docker build, tag, and push commands
docker build --rm --platform linux/arm64 -t 192.168.0.15:4358/$SERVICE_NAME-backend-$STAGE:latest -f dockerfile.backend .
docker tag 192.168.0.15:4358/$SERVICE_NAME-backend-$STAGE:latest 192.168.0.15:4358/$SERVICE_NAME-backend-$STAGE:latest
docker push 192.168.0.15:4358/$SERVICE_NAME-backend-$STAGE:latest
