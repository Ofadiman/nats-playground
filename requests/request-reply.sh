#!/usr/bin/env bash

curl -X POST -d 'items[]=1' -d 'items[]=2' -d 'items[]=3' http://localhost:3000/request-reply
