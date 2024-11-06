#!/bin/bash

echo "Starting cnhrms database..."
docker start cnhrms
if [ $? -eq 0 ]; then
  echo "Database running."
else
  echo "There was a problem starting the database."
fi
