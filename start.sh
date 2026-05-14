#!/bin/bash

mkdir -p /home/runner/workspace/data/db

# Start MongoDB if not already running
if ! pgrep -x mongod > /dev/null; then
  mongod --dbpath /home/runner/workspace/data/db --bind_ip 127.0.0.1 --port 27017 --fork --logpath /home/runner/workspace/data/mongod.log
  echo "MongoDB started"
else
  echo "MongoDB already running"
fi

# Start API server in background
(cd /home/runner/workspace/API && npx nodemon --exec babel-node app.js) &
echo "API server starting on port 3001"

# Start frontend (blocks)
cd /home/runner/workspace/UI && PORT=5000 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start
