IMAGE_NAME=blue-book-ui
IMAGE_TAG=v1.3
PORT=8090

docker build -t $IMAGE_NAME:$IMAGE_TAG .
sleep 3
docker run -itd  -p $PORT:80 $IMAGE_NAME:$IMAGE_TAG