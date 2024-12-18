#!/bin/bash
set -e

SERVER="nest-starter"
PW="root"
DB="postgres"
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
echo "Creating database $DB with encoding 'UTF-8'"
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "create schema public;" | docker exec -i $SERVER psql -U postgres

echo "Creating user $USER"
echo "CREATE USER $USER WITH PASSWORD '$USER_PW';" | docker exec -i $SERVER psql -U postgres

# Create the new user
echo "CREATE USER $OWNER WITH PASSWORD '$OWNER_PW' SUPERUSER;" | docker exec -i $SERVER psql -U postgres
# echo "CREATE USER $AUTHENTICATOR WITH PASSWORD '$AUTHENTICATOR_PW' NOINHERIT;" | docker exec -i $SERVER psql -U postgres
echo "GRANT CONNECT ON DATABASE $DB TO $USER;" | docker exec -i $SERVER psql -U postgres
# granting all the access to visitor

docker exec -i $SERVER psql -U postgres -d $DB <<EOF
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
EOF

echo "Granting full privileges on schema public to user $USER"
docker exec -i $SERVER psql -U postgres -d $DB <<EOF
GRANT ALL PRIVILEGES ON SCHEMA public TO $USER;
GRANT USAGE, CREATE ON SCHEMA public TO $USER;
EOF

echo "grant usage on schema public to $USER;" | docker exec -i $SERVER psql -U postgres

echo "GRANT CREATE ON DATABASE $DB TO $USER;"|docker exec -i $SERVER psql -U postgres
