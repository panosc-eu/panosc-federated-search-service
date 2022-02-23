#!/bin/bash
#
# run panosc federated aggragator locally
# only for testing purposes

clear

export API_VERSION="Current git commit"
export DOCKER_IMAGE_VERSION="None"
export HOSTING_FACILITY="Local Host"
export ENVIRONMENT="Local instance with local data providers"
export DEFAULT_LIMIT="10"
#export PROVIDERS="https://icatplus.esrf.fr/api,https://scicat.ess.eu/panosc-api,https://fairdata.ill.fr/fairdata/api"
export PROVIDERS="https://scicat.ess.eu/panosc-api,https://fairdata.ill.fr/fairdata/api"

cd search-api

node .
