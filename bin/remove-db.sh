#!/bin/bash

echo "Removing postgres docker container..."
docker rm nest-starter
if [ $? -eq 0 ]; then
  echo "Database removed."
else
  echo "There was a problem removing the database."
fi
