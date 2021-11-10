#!/usr/bin/env bash
#
# script filename
SCRIPT_NAME=$(basename $BASH_SOURCE)
echo ""
echo ""

#
# check that we got two arguments in input
if [ "$#" -ne 1 ] && [ "$#" -ne 2 ]; then
    echo "Usage ${SCRIPT_NAME} <account> (<tag>)"
    echo ""
    echo " prepare a docker image and push it to the dockerhub repo in the repository <account>/panosc-federated-search"
    echo ""
    echo " arguments:"
    echo " - account = account on docker hub"
    echo " - tag     = git tag or commit we would like to use to create the image"
    echo "             if not specified the tag ysed will be the branch name followed by the latest commit, separted by dash"
    echo "             Example:"
    echo "             - 5d5f42af1ca6816a13b6db60b4778388dc4bf431-develop"
    echo ""
    exit 1
fi

# extract input argument
account=$1
gitTag=$2

# code repository and branch
# these are not needed anymore as we assume that this script will only be run from within the repo
# after it has been cloned from github.
#
# I leave them here as a reference as they change as of 2021/11/09
# githut repository = https://github.com/panosc-eu/panosc-federated-search-service.git
# available branches
# - master,
# - develop

# docker repository
dockerRepo=${account}/panosc-federated-search

# check if the user provided a tag or not
if [ "-${gitTag}-" == "--" ]; then
    # not git tag from the user
    # define git tag as <branch>-<latest commit>
    gitTag="$(git branch --show-current)-$(git rev-parse HEAD)"
else
    git checkout ${gitTag}
fi


# docker image tag
dockerTag="${gitTag}"
dockerImage="${dockerRepo}:${dockerTag}"

#
# gives some feedback to the user
echo "Account          : ${account}"
echo "Git commit tag   : ${gitTag}"
echo "Docker image tag : ${dockerTag}"
echo "Docker image     : ${dockerImage}"
echo ""

#
# create docker image
# if it is already present, remove old image
if [[ "$(docker images -q ${dockerImage} 2> /dev/null)" != "" ]]; then
    echo "Image already present. Removing it and recreating it"
    docker rmi ${dockerImage}
    echo ""
fi
echo "Creating image"
docker build -t ${dockerImage} -f ./search-api/Dockerfile ./search-api
echo ""

# push image on docker hub repository
docker push ${dockerImage}
echo ""
echo "Done"
echo ""


