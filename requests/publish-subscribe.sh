#!/usr/bin/env bash

curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "szymon"}' \
    http://localhost:3000/publish-subscribe
