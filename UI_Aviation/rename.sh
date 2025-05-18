CONTAINER_ID=93e477205335

docker start $CONTAINER_ID
BLUEBOOK_IP=$(hostname -I | awk '{print $1}')
echo "$CONTAINER_ID started"
echo "$BLUEBOOK_IP address configurating ..."
sleep 5s # Waits 5 seconds.
# docker exec -it 6762b250ed71 bin/sh
# find /usr/share/nginx/html -type f -exec sed -i "s|localhost|$BLUEBOOK_IP|g" '{}' +
docker exec -it $CONTAINER_ID bin/sh -c 'find /usr/share/nginx/html -type f -exec sed -i "s|localhost|'"$BLUEBOOK_IP"'|g" {} +'
echo "Blue-Book Up ..."
