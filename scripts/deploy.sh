#!/bin/bash

cd /home/ubuntu/some_web

npm install

pkill node || true

nohub node server.js & output.log 2>&1 &