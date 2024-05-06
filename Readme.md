# run container using

docker run --name avs_api_c1 -d -p 8080:3000 \
-e MONGODB_CONNECTION_STRING=<add_connection_string_here> \
avs-api:v1