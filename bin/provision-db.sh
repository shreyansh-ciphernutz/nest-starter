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
[l[]H9ty
]]gy84-gl]
# Wait for PostgreSQL to start
echo "Waiting for pg-server [$SERVER] to start"
sleep 5  # Increased sleep time for PostgreSQL to be ready

# Create the database using the postgres user
echo "Creating database $DB with encoding 'UTF-8'"
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres

# Create the new user
echo "Creating user $USER"
echo "CREATE USER $USER WITH PASSWORD '$USER_PW';" | docker exec -i $SERVER psql -U postgres
echo "CREATE USER $OWNER WITH PASSWORD '$OWNER_PW' SUPERUSER;" | docker exec -i $SERVER psql -U postgres
echo "CREATE USER $AUTHENTICATOR WITH PASSWORD '$AUTHENTICATOR_PW' NOINHERIT;" | docker exec -i $SERVER psql -U postgres
echo "GRANT ${USER} TO ${AUTHENTICATOR};"

echo "list of all created users of pg admin"
# Grant privileges to the new user on the database
echo "Granting ALL privileges on database $DB to user $USER"
echo "GRANT ALL PRIVILEGES ON DATABASE $DB TO $USER;" | docker exec -i $SERVER psql -U postgres

# Grant USAGE and CREATE privileges on the public schema to the new user
echo "Granting USAGE and CREATE privileges on public schema to user $USER"
echo "GRANT USAGE, CREATE ON SCHEMA public TO $USER;" | docker exec -i $SERVER psql -U postgres

# Ensure the user has the necessary privileges on sequences and functions
echo "Setting default privileges for user $USER"
echo "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO $USER;" | docker exec -i $SERVER psql -U postgres
echo "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO $USER;" | docker exec -i $SERVER psql -U postgres

# Confirm permissions for the user
echo "Confirming permissions for user $USER"
docker exec -i $SERVER psql -U postgres -d $DB -c "\dn+ public"
docker exec -i $SERVER psql -U postgres -d $DB -c "\dp"

# List databases to confirm
echo "Listing databases"
echo "\l" | docker exec -i $SERVER psql -U postgres

echo "Database and user created successfully."
