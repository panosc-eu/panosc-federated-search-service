#!/bin/bash
#
# run panosc federated aggregator locally
# with official data providers
#
# Used for testing only purposes
#
# It can be adapted to run production if necessary
#

clear

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

export API_VERSION="Current git commit"
export DOCKER_IMAGE_VERSION="None"
export HOSTING_FACILITY="Local Host"
export ENVIRONMENT="Local instance with official endpoints"
export DEFAULT_LIMIT="10"

cd search-api

node .
