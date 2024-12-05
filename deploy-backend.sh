#!/usr/bin/env bash
SERVICE_NAME="iterating"

# backend or frontend
# local, dev, stage, prod
STAGE="$1"
if [[ "$STAGE" != "local" && "$STAGE" != "dev" && "$STAGE" != "stage" && "$STAGE" != "prod" ]]; then
    echo "Invalid stage. Please provide one of the following: local, dev, stage, prod"
    exit 1
fi

# 컨테이너 이름 설정
CONTAINER_NAME="$SERVICE_NAME-backend-$STAGE"
echo $CONTAINER_NAME

export $(grep -v '^#' .env.backend.$STAGE | xargs)

# 원격 서버에서 도커 이미지 풀 및 새로운 컨테이너 실행
ssh rasp-priv << EOF
mkdir -p ~/$SERVICE_NAME-backend-$STAGE && cd ~/$SERVICE_NAME-backend-$STAGE
docker pull 192.168.0.15:4358/$SERVICE_NAME-backend-$STAGE:latest
CONTAINER_NAME="$CONTAINER_NAME"
RUNNING_CONTAINER=\$(docker ps -q --filter "name=\$CONTAINER_NAME")
if [ -n "\$RUNNING_CONTAINER" ]; then
    echo "실행 중인 컨테이너가 발견되었습니다. 컨테이너를 중지하고 제거합니다."
    docker stop \$RUNNING_CONTAINER
    docker rm \$RUNNING_CONTAINER
else
    echo "실행 중인 컨테이너가 없습니다."
fi
docker run -d --name \$CONTAINER_NAME -p 8534:3000 --restart always -e DATABASE_URL=$DATABASE_URL -e JWT_SECRET=$JWT_SECRET 192.168.0.15:4358/$SERVICE_NAME-backend-$STAGE:latest
EOF