# Federated Photon and Neutron Search Service
Repository for the federated PaNOSC search service, unified interface for searching all open datasets available at all participating facilities.


## Prerequisites
- npm >= 6
- node >= 8
- docker environment

Latest test environment:
- npm = v6.14.15
- node = v14.18.1
- docker = v20.10.10, build b485636
- docker compose = v1.29.2

## Production environment
As of February 2024, the production environment is accessible at the following URL:
- https://federated.panosc.ess.eu/
   - Explorer interface: https://federated.panosc.ess.eu/explorer/
   - Api : https://federated.panosc.ess.eu/api/

## Configuration
PaNOSC federated search can be configured by setting environmental variables.
Following is the list of the available configurations, their meaning and default value:
-   API_VERSION  
    API version used in the running instance.   
    _Default_: unknown  

-   DOCKER_IMAGE_VERSION  
    tag of the docker image used for the running instance, if any.  
    _Default_: unknown  
 
-   HOSTING_FACILITY  
    name of the hosting facility for the running instance.  
    _Default_: unknown  

-   ENVIRONMENT   
    string identifying the environemnt where the instance is running.  
    _Example_: develop, test, or production.  
    _Default_: unknown  

-   PROVIDERS  
    comma separated list of facilities PaNOSC local search apis that are used when running queries. 
    Please check the current version of .env file for the update list of data providers
    _Example_: "https://icatplus.esrf.fr/api,https://scicat.ess.eu/panosc-api,https://fairdata.ill.fr/fairdata/api"  
    _Default_: unknown  

-   DEFAULT_LIMIT  
    number of results returned from each facility if no limit is provided in filter.  
    _Example_: if set to 10. When no limit is provided in filter, the federated search will return 10 results from each facility.  
    _Default_: 100  

-   PROVIDER_TIMEOUT  
    timeout in ms when waiting for results from each individual data provider.  
    _Default_: 5000  

-   LOGGING
    where to send the logs.
    _Default_: console.
    _Accepted values_: console, graylog

-   LOGGING_SERVER
    If LOGGING is set to _graylog_, the ip address or hostname of the graylog server
    _Default_: none

-   LOGGIN_PORT
    If LOGGING is set to _graylog_, the port where graylog is listening on the server specified in LOGGING_SERVER
    _Default_: none

-   LOGGING_ENVIRONMENT
    If LOGGING is set to _graylog_, the environment string that will be used in graylog
    _Default_: none

-   LOGGING_SERVICE
    if LOGGING is set to _graylog_, the services string that will be used in graylog
    _Default_: none
  
   
All of this values can be verified by connecting to the base URL of the PaNOSC federated search instance that we would like to check.
For example, the ESS PaNOSC federated search instance returns the following values:

```
> curl https://federated.panosc.ess.eu/
{
   "uptime_seconds"        : 4403250.860398721,
   "uptime"                : "1223:07:30",
   "api_version"           : "v2.21",
   "docker_image_version"  : "v2.21",
   "hosting_facility"      : "ESS",
   "environment"           : "production",
   "data_providers"        : [
     "https://searchapi.maxiv.lu.se/api",
     "https://icatplus.esrf.fr/api",
     "https://search.panosc.ess.eu/api",
     "https://dacat.psi.ch/panosc-api",
     "https://data.ceric-eric.eu/search-api",
     "https://in.xfel.eu/metadata/api/panosc/v1",
     "https://fairdata.ill.fr/fairdata/api",
     "https://data.cells.es/iws/panosc/search-api"
   ],
   "provider_timeout_ms"   : 10000,
   "default_limit"         : 100,
   "filter_invalid_scores" : true,
   "logging"               : "GRAYLOG"
}
```

## Example queries

Try out the API using the example queries included in the pages below.
The example queries were run on the production system listed above.
The queries can be run through the explorer interface or directly on the API pasting the URL listed in the address bar of the browser of your choice or in the terminal using the Curl command.

   - Dataset Example Queries
     - [Local data sources](./docs/dataset-example-queries-local-data-sources.md)
     - [Remote data sources](./docs/dataset-example-queries-remote-data-sources.md)
   - Document Example Queries
     - [Local data source](./docs/document-example-queries-local-data-sources.md)
     - [Remote data source](./docs/document-example-queries-remote-data-sources.md)
   - [Instrument Example Queries](./docs/instrument-example-queries.md)

## Create docker image

Please use the script *docker-image-release.sh* to create a docker image and upload it to the docker repository.

To create a docker image for the **latest release**, make sure that master is properly tagged with the release tag vX.Y, and than run the following script in the main folder of this repo:

```bash
docker-image-release <your-docker-account> vX.Y
```

In this configuration the script will make sure to checkout the tag vX.Y, build the docker image and push it to the repository.
In the docker repo, a new image tagged *vX.Y* will be in your repository.

Make sure to login into your docker account prior to run the command. Use the following command to login into docker:

```bash
docker login
```
More informations can be found on the [docker login command page](https://docs.docker.com/engine/reference/commandline/login/)

If you want to create the docker image for a specific commit, run the following syntax:

```bash
docker-image-relesase.sh <your-docker-account> 5d5f42af1ca6816a13b6db60b4778388dc4bf431
```

This command will create a docker image with the software at commit 5d5f42af1ca6816a13b6db60b4778388dc4bf431.
The docker image will be tagged with 5d5f42af1ca6816a13b6db60b4778388dc4bf431

If you want to create a docker image with the most recent commit present in your repo as it is now, you can run the following command (No tag specified):

```bash
docker-image-relesase.sh <your-docker-account>
```

Assuming that you are currently in branch develop and on commit 5d5f42af1ca6816a13b6db60b4778388dc4bf431, a docker image with tag *develop-5d5f42af1ca6816a13b6db60b4778388dc4bf431* will be pushed on the docker repository.

### Docker images repository
The current repository for the docker images is: ***https://github.com/panosc-eu/panosc-federated-search-service/pkgs/container/panosc-federated-search-service***.


## How to test the PaNOSC federated search api
You can test the PaNOSC federated search service by running locally on your machine.
It can be tested locally with local data providers or with remote data provider.
Please follow the steps listed below and, on step 2, select which configuration you would like to test

1. Clone the repository

   ```bash
   git clone -b master https://github.com/panosc-eu/panosc-federated-search-service.git
   ```

2. Start docker stack

   - *Test with local data providers:*

      ```bash
      docker-compose -f ./test/docker-compose-local-data-provider-test.yaml up --build
      ```

   - *Test with remote live data providers:*


      ```bash
      docker-compose -f ./test/docker-compose-live-data-provider-test.yaml up --build
      ```

3. Try out the API using the example queries provided in the documents listed above in the section *Example queries*, either through http://localhost:3000/explorer or Curl.
   For the impatients, please check the few quick curl commands listed below.
   **IMPORTANT**: at the moment, the query keyword in filter provides meaningful results only on the test with live data providers.

   - Get all of Datasets

      ```bash
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets"
      ```

   - Get all of Datasets where the title contains "provider 1"
     Filter: {"where":{"title":{"like":"provider 1"}}}

      ```bash
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets?filter=%7B%22where%22%3A%7B%22title%22%3A%7B%22like%22%3A%22Provider%201%22%7D%7D%7D"
      ```

   - Get the Dataset with pid equal to 20.500.12269/panosc-dataset3

      ```bash
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets/20.500.12269%2Fpanosc-dataset3"
      ```

   - Get the count of Datasets

      ```bash
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets/count"
      ```

   - Get the count of Datasets where the title contains "provider 1"
     Filter:  {"title":{"like":"provider 1"}}) (Like in example #2)

      ```bash
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets/count?where=%7B%22title%22%3A%7B%22like%22%3A%22Provider%201%22%7D%7D"
      ```

   - Retrieve the 10 Datasets most relevant to the keywords "temperature" and "beam"
     Filter: {"limit": 10, "query": "temperature beam"}

     ```bash
     curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Documents?filter=%7B%22limit%22%3A10%2C%22query%22%3A%22temperature%20beam%22%7D"
     ```

