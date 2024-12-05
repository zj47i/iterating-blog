#!/bin/bash

# local, dev, stage, prod
STAGE="$1"
if [[ "$STAGE" != "local" && "$STAGE" != "dev" && "$STAGE" != "stage" && "$STAGE" != "prod" ]]; then
    echo "Invalid stage. Please provide one of the following: local, dev, stage, prod"
    exit 1
fi

export $(grep -v '^#' .env.frontend.$STAGE | xargs)

pnpm --prefix frontend build