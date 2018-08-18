set -ex

if [ ! -d ${HOME}/google-cloud-sdk ]; then
   curl https://sdk.cloud.google.com | bash;
fi

gcloud auth activate-service-account --key-file=myfoobarproject-9a043adac874.json

gcloud auth configure-docker

docker build -t eu.gcr.io/myfoobarproject/kanban-ui:${TRAVIS_TAG} -t eu.gcr.io/myfoobarproject/kanban-ui:latest .

docker push eu.gcr.io/myfoobarproject/kanban-ui:${TRAVIS_TAG}

docker push eu.gcr.io/myfoobarproject/kanban-ui:latest
