#!/bin/bash

set -ex

if [ ! -e ${HOME}/google-cloud-sdk/bin/gcloud ]; then
   curl https://sdk.cloud.google.com | bash;
   source ${HOME}/google-cloud-sdk/path.bash.inc
fi

openssl aes-256-cbc -K $encrypted_f10587d97a52_key -iv $encrypted_f10587d97a52_iv -in .travis/myfoobarproject-9a043adac874.json.enc -out myfoobarproject-9a043adac874.json -d

gcloud auth activate-service-account --key-file=myfoobarproject-9a043adac874.json

gcloud auth configure-docker

docker build -t eu.gcr.io/myfoobarproject/kanban-ui:${TRAVIS_TAG} -t eu.gcr.io/myfoobarproject/kanban-ui:latest .

docker push eu.gcr.io/myfoobarproject/kanban-ui:${TRAVIS_TAG}

docker push eu.gcr.io/myfoobarproject/kanban-ui:latest
