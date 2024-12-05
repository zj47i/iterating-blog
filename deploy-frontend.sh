#!/usr/bin/env bash
SERVICE_NAME="iterating"

# backend or frontend
# local, dev, stage, prod
STAGE="$1"
if [[ "$STAGE" != "local" && "$STAGE" != "dev" && "$STAGE" != "stage" && "$STAGE" != "prod" ]]; then
    echo "Invalid stage. Please provide one of the following: local, dev, stage, prod"
    exit 1
fi

scp -r frontend/dist/ rasp-pub:/home/rasp/iterating-$STAGE