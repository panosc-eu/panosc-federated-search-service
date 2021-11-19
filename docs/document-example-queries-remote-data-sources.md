# Document example queries for test environment with remote data sources
This examples can be used to test the production deployment of PaNOSC federated search that can be found at [httsp://federated.scicat.ess.eu/api](httsp://federated.scicat.ess.eu/api)

## Endpoint
`GET /documents`

## Contents
1. [Query documents where title contains the word data, retrieve 10](#1-query-documents-where-title-contains-the-word-data-retrieve-10)
2. [Query documents relevant to "data beam", retrieve only 10 best results](#2-query-documents-relevant-to-data-beam-retrieve-only-10-best-results)
3. [Query documents relevant to "temperature beam", retrieve only 10 best results](#3-query-documents-relevant-to-temperature-beam-retrieve-only-10-best-results)

## Examples with remote data sources

### 1. Query datasets where title contains the word data, retrieve 10
This query search for all the datasets where the title contains the word *data*, order the results alphabetically and than returns the first 10

#### Filter
```json
{
    "limit": 10,
    "where" : {
        "title" : {
            "like" : "data"
        }
    }
}
```

Compacted
```json
{"limit": 10,"where" : {"title" : {"like" : "data"}}}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents?filter=%7B%22limit%22%3A10%2C%22query%22%3A%22data%20beam%22%7D'
```

#### Response
```json
[
  {
    "pid": "10.17199/NXMV08.DSC0001",
    "isPublic": true,
    "type": "publication",
    "title": "Differential scanning calorimetry (DSC) data for breast cancer cells",
    "summary": "Datasets from differential scanning calorimetry (DSC) data for breast cancer cells",
    "doi": "10.17199/NXMV08.DSC0001",
    "score": 0,
    "provider": "https://scicat.ess.eu/panosc-api"
  }
]
```

### 2. Query documents relevant to "data beam", retrieve only 10 best results
This query search for all the documents that are relevant to the keywords *data* and *beam*, orders them by the relevancy score and returns only the best 10.

#### Filter
Prettyfied
```json
{
    "limit":10,
    "query":"data beam"
}
```

Compacted
```json
{"limit":10,"query":"data beam"}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'https://localhost:3000/api/Documents?filter=%7B%22limit%22%3A10%2C%22query%22%3A%22data%20beam%22%7D'
```

#### Response
```json
[
  {
    "pid": "10.17199/BRIGHTNESS/BeamInstrumentation0003",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from BeamInstrumentation",
    "summary": "This data was collected as part of the beam instrumentation program",
    "doi": "10.17199/BRIGHTNESS/BeamInstrumentation0003",
    "score": 0.8702721928571248,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "10.17199/BRIGHTNESS/BeamInstrumentation0002",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from BeamInstrumentation",
    "summary": "This data was collected as part of the beam instrumentation program",
    "doi": "10.17199/BRIGHTNESS/BeamInstrumentation0002",
    "score": 0.8702721928571248,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "10.17199/BRIGHTNESS/BeamInstrumentation0001",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from BeamInstrumentation",
    "summary": "This data was collected as part of the beam instrumentation program",
    "doi": "10.17199/BRIGHTNESS/BeamInstrumentation0001",
    "score": 0.8702721928571248,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "10.17199/BRIGHTNESS/MG0026",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from multigrid",
    "summary": "This data was collected as part of BrightnESS, funded by the European Union                         Framework Programme for Research and Innovation Horizon 2020, under grant                         agreement 676548. It consists of test data for the detector.",
    "doi": "10.17199/BRIGHTNESS/MG0026",
    "score": 0.7071067811865475,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  ...
]
```

### 3. Query documents relevant to "temperature beam", retrieve only 10 best results
This query search for all the documents that are relevant to the keywords *temperature* and *beam*, orders them by the relevancy score and returns only the best 10.

#### Filter
Prettyfied
```json
{
    "limit":10,
    "query":"temperature beam"
}
```

Compacted
```json
{"limit":10,"query":"temperature beam"}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'https://localhost:3000/api/Documents?filter=%7B%22limit%22%3A10%2C%22query%22%3A%22temperature%20beam%22%7D'
```

#### Response
```json
[
  [
  {
    "pid": "10.17199/BRIGHTNESS/BeamInstrumentation0003",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from BeamInstrumentation",
    "summary": "This data was collected as part of the beam instrumentation program",
    "doi": "10.17199/BRIGHTNESS/BeamInstrumentation0003",
    "score": 0.7071067811865475,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "10.17199/BRIGHTNESS/BeamInstrumentation0002",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from BeamInstrumentation",
    "summary": "This data was collected as part of the beam instrumentation program",
    "doi": "10.17199/BRIGHTNESS/BeamInstrumentation0002",
    "score": 0.7071067811865475,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "10.17199/BRIGHTNESS/BeamInstrumentation0001",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from BeamInstrumentation",
    "summary": "This data was collected as part of the beam instrumentation program",
    "doi": "10.17199/BRIGHTNESS/BeamInstrumentation0001",
    "score": 0.7071067811865475,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "10.17199/BRIGHTNESS/MG0026",
    "isPublic": true,
    "type": "publication",
    "title": "Sample Data from multigrid",
    "summary": "This data was collected as part of BrightnESS, funded by the European Union                         Framework Programme for Research and Innovation Horizon 2020, under grant                         agreement 676548. It consists of test data for the detector.",
    "doi": "10.17199/BRIGHTNESS/MG0026",
    "score": 0,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "186715647",
    "isPublic": true,
    "type": "proposal",
    "title": "PUB-0001",
    "summary": "ESRF Upgrade Programme",
    "doi": " ",
    "startDate": "2019-03-19T14:36:46.000Z",
    "endDate": "2019-03-19T16:09:09.000Z",
    "releaseDate": "2019-03-18T14:39:35.000Z",
    "license": "CC-BY-4.0",
    "score": 0,
    "provider": "https://icatplus.esrf.fr/api",
    "id": "186715647"
  },
  ...
]
```
