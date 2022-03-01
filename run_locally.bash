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

export API_VERSION="Current git commit"
export DOCKER_IMAGE_VERSION="None"
export HOSTING_FACILITY="Local Host"
export ENVIRONMENT="Local instance with official endpoints"
export DEFAULT_LIMIT="10"
export PROVIDERS="https://icatplus.esrf.fr/api,https://scicat.ess.eu/panosc-api,https://fairdata.ill.fr/fairdata/api,https://searchapi.maxiv.lu.se/api"

cd search-api

node .
