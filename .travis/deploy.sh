#!/bin/bash

set -ex

if [ ! -e ${HOME}/google-cloud-sdk/bin/gcloud ]; then
   curl https://sdk.cloud.google.com | bash >> /dev/null;
   source ${HOME}/google-cloud-sdk/path.bash.inc
fi

openssl aes-256-cbc -K $encrypted_e2e5c7918611_key -iv $encrypted_e2e5c7918611_iv -in .travis/myfoobarproject-a26bf00c00af.json.enc -out myfoobarproject-a26bf00c00af.json -d

gcloud auth activate-service-account --key-file=myfoobarproject-a26bf00c00af.json

gcloud auth configure-docker

docker build -t eu.gcr.io/myfoobarproject/kanban-ui:${TRAVIS_TAG} -t eu.gcr.io/myfoobarproject/kanban-ui:latest .

docker push eu.gcr.io/myfoobarproject/kanban-ui:${TRAVIS_TAG}

docker push eu.gcr.io/myfoobarproject/kanban-ui:latest
