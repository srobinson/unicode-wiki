#! /bin/bash

echo HOME $HOME

mkdir -p ~/_uw_data
mkdir -p ~/_uw_esdata
sudo chown -R 999:999 ~/_uw_data
sudo chown -R 1000:1000 ~/_uw_esdata
if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then
  rm -rf "$HOME/google-cloud-sdk"; curl https://sdk.cloud.google.com | bash > /dev/null;
fi
source $HOME/google-cloud-sdk/path.bash.inc
echo $GCLOUD_KEY | base64 --decode > gcloud.p12
export GOOGLE_APPLICATION_CREDENTIALS="gcloud.p12"
gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12
ssh-keygen -f ~/.ssh/google_compute_engine -N ""
gcloud --quiet config set project $GCLOUD_PROJECT
gcloud --quiet config set container/cluster $GCLOUD_CLUSTER
gcloud --quiet config set compute/zone $GCLOUD_ZONE
gcloud --quiet config set container/use_application_default_credentials true
gcloud container clusters get-credentials uw-cluster --zone=$GCLOUD_ZONE
gcloud components install kubectl
gcloud components install docker-credential-gcr
gcloud auth configure-docker
openssl aes-256-cbc -K $encrypted_041d00b18b3a_key -iv $encrypted_041d00b18b3a_iv -in all.gpg.enc -out all.gpg -d
