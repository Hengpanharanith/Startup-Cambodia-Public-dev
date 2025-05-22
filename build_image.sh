#!/bin/bash
registry=registry.gitlab.com/startup-cambodia/web-public
currentDate=`date +"%y%m%d"`
last_gitcommit_hash=`git rev-parse --short HEAD`
tag="latest"
repo="/development"

color_white='\e[0m'
color_green='\e[32m'

echo "\n${color_green}$repo:$tag is building...${color_white}\n"
docker build --pull -t $registry$repo:$tag .

# echo "\n${color_green}$repo:$currentDate is building...${color_white}\n"
# docker build --pull -q -t $registry$repo:$currentDate .

# echo "\n${color_green}Pushing $repo:$tag to registry...${color_white}\n"
# docker push $registry$repo:$tag

# echo "\n${color_green}Pushing $repo:$currentDate to registry...${color_white}\n"
# docker push $registry$repo:$currentDate