#!/bin/bash
if [ "$APP_MODE" == "prod" ]
then
    # Start server
    echo "Starting server"
    npm run start
else
    echo "In development mode"
fi
