#!/bin/bash
cd /home/ubuntu/some_web
docker-compose down
docker-compose build
docker-compose up -d
npm install
