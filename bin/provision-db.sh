#!/bin/bash
set -e

SERVER="nest-starter"
PW="root"
DB="exampledb"
USER="postgres_visitor"
USER_PW="visitor_password" 
OWNER="postgres_owner"
OWNER_PW="owner_password"
AUTHENTICATOR="postgres_authenticator"
AUTHENTICATOR_PW="AUTHENTICATOR_password"

echo "Stopping and removing old docker [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  echo "Starting new fresh instance of [$SERVER]" && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# Wait for PostgreSQL to start
echo "Waiting for pg-server [$SERVER] to start"
sleep 5  # Increased sleep time for PostgreSQL to be ready

# drop schema public

echo "DROP database IF EXISTS $DB;" | docker exec -i $SERVER psql -U postgres
echo "DROP SCHEMA IF EXISTS public CASCADE;" | docker exec -i $SERVER psql -U postgres

echo "revoke all on schema public from public"| docker exec -i $SERVER psql -U postgres

# Create the database using the postgres user

# Create the new user
echo "Creating user $USER"
echo "CREATE USER $USER WITH PASSWORD '$USER_PW';" | docker exec -i $SERVER psql -U postgres
echo "CREATE USER $OWNER WITH PASSWORD '$OWNER_PW' SUPERUSER;" | docker exec -i $SERVER psql -U postgres
echo "CREATE USER $AUTHENTICATOR WITH PASSWORD '$AUTHENTICATOR_PW' NOINHERIT;" | docker exec -i $SERVER psql -U postgres

# granting all the access to visitor
echo "create schema public;" | docker exec -i $SERVER psql -U postgres
echo "grant usage on schema public to $USER;" | docker exec -i $SERVER psql -U postgres
echo "GRANT USAGE, CREATE ON SCHEMA public TO $USER;"|docker exec -i $SERVER psql -U postgres
echo "GRANT $USER TO $AUTHENTICATOR;"|docker exec -i $SERVER psql -U postgres
echo "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $USER;"|docker exec -i $SERVER psql -U postgres
echo "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $USER;"|docker exec -i $SERVER psql -U postgres
echo "GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO $USER;"|docker exec -i $SERVER psql -U postgres
echo "GRANT CREATE ON DATABASE $DB TO $USER;"|docker exec -i $SERVER psql -U postgres


echo "Creating database $DB with encoding 'UTF-8'"
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres