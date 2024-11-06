#!/bin/bash

echo "Stopping cnhrms database..."
docker stop cnhrms
if [ $? -eq 0 ]; then
  echo "Database stopped."
else
  echo "There was a problem stopping the database."
fi
