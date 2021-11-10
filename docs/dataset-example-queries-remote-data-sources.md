# Dataset example queries for test environment with remote data sources
This examples can be used to test the production deployment of PaNOSC federated search that can be found at [httsp://federated.scicat.ess.eu/api](httsp://federated.scicat.ess.eu/api)

## Endpoint
`GET /datasets`


## Contents
1. [Query datasets where title contains the word data, retrieve 10](#query-datasets-where-title-contains-the-word-data-retrieve-10)
2. [Query datasets relevant to "data beam", retrieve only 10 best results](#query-datasets-relevant-to-data-beam-retrieve-only-10-best-results)
3. [Query datasets relevant to "temperature beam", retrieve only 10 best results](#query-datasets-relevant-to-temperature-beam-retrieve-only-10-best-results)


## Examples with remote data sources

### 1. Query datasets where title contains the word data, retrieve 10
This query search for all the datasets where the title contains the word *data*, order the results alphabetically and than returns the first 10

#### Filter
Prettyfied
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
curl -X GET --header 'Accept: application/json' 'https://localhost:3000/api/Datasets?filter=%7B%22limit%22%3A10%2C%22where%22%3A%7B%22title%22%3A%7B%22like%22%3A%22data%22%7D%7D%7D'
```

#### Response
```json
[
  {
    "pid": "20.500.12269/00fd159a-0fe7-46d2-855d-a5dfa3d4dc13",
    "title": "V20 data",
    "isPublic": true,
    "size": 0,
    "creationDate": "2019-05-31T17:56:48.000Z",
    "score": 0,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "20.500.12269/026fe366-b469-41b7-9e5e-b5cf8b91e992",
    "title": "V20 data",
    "isPublic": true,
    "size": 0,
    "creationDate": "2019-06-01T09:36:43.000Z",
    "score": 0,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "20.500.12269/0311fead-04fb-45bd-b848-4a471fb50481",
    "title": "V20 data",
    "isPublic": true,
    "size": 0,
    "creationDate": "2019-06-01T16:00:45.000Z",
    "score": 0,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  ...
]
```

### 2. Query datasets relevant to "data beam", retrieve only 10 best results
This query search for all the datasets that are relevant to the keywords *data* and *beam*, orders them by the relevancy score and returns only the best 10.

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
curl -X GET --header 'Accept: application/json' 'https://localhost:3000/api/Datasets?filter=%7B%22limit%22%3A10%2C%22query%22%3A%22data%20beam%22%7D'
```

#### Response
```json
[
  {
    "pid": "20.500.12269/BRIGHTNESS/MB0033",
    "title": "Sample Data from multiblade 33",
    "isPublic": true,
    "size": 5380741,
    "creationDate": "2017-10-05T18:34:04.000Z",
    "score": 0.8508791135281516,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "20.500.12269/BRIGHTNESS/MG0031",
    "title": "Sample Data from multigrid 31",
    "isPublic": true,
    "size": 250398080,
    "creationDate": "2018-09-04T16:46:41.000Z",
    "score": 0.8508791135281516,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "20.500.12269/BRIGHTNESS/MG0023",
    "title": "Sample Data from multigrid 23",
    "isPublic": true,
    "size": 23050232,
    "creationDate": "2018-09-04T16:44:34.000Z",
    "score": 0.8508791135281516,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  ...
]
```

### 3. Query datasets relevant to "temperature beam", retrieve only 10 best results
This query search for all the datasets that are relevant to the keywords *temperature* and *beam*, orders them by the relevancy score and returns only the best 10.

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
{"limit":10,"query":"data beam"}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'https://localhost:3000/api/Datasets?filter=%7B%22limit%22%3A10%2C%22query%22%3A%22temperature%20beam%22%7D'
```

#### Response
```json
[
  {
    "pid": "20.500.12269/3f96e58e-fc9b-11e9-b693-64006a47d649Open_beam-4-94cm_to_detector-SP.hdf",
    "title": "OB-4-94cm_to_detector-SP",
    "isPublic": true,
    "size": 0,
    "creationDate": "2019-10-17T22:33:15.000Z",
    "score": 0.8685875164121688,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "20.500.12269/962ca040-c6b0-48cb-b95d-992d69f4e140nicos_00000480.hdf",
    "title": "Open beam WFM Slits 0.2x25",
    "isPublic": true,
    "size": 185843326,
    "creationDate": "2019-08-02T11:50:43.000Z",
    "score": 0.7963838039187,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  {
    "pid": "20.500.12269/76a55e29-21f1-4919-81c8-fbdb12ef5eacnicos_00000509.hdf",
    "title": "open beam,  WFM Slits 0.2x50",
    "isPublic": true,
    "size": 9913385,
    "creationDate": "2019-09-02T16:18:48.000Z",
    "score": 0.7963838039187,
    "provider": "https://scicat.ess.eu/panosc-api"
  },
  ...
]
```
