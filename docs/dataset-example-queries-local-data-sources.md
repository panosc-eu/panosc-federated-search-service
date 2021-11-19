# Dataset queries for testing environment with local data sources

## Endpoint
`GET /datasets`


## Contents
1. [Query datasets acquired using X-Ray Absorption](#1-query-datasets-acquired-using-x-ray-absorption)
2. [Query datasets where the photon energy range is 880-990 eV](#2-query-datasets-where-the-photon-energy-range-is-880-990-ev)
3. [Query datasets with a solid sample containing copper](#3-query-datasets-with-a-solid-sample-containing-copper)
4. [Query datasets where temperature is below 80°C](#4-query-datasets-where-temperature-is-below-80c)
5. [Query datasets with files matching a string using full text search](#5-query-datasets-with-files-matching-a-string-using-full-text-search)


## Examples with local data sources

### 1. Query datasets acquired using X-Ray Absorption

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "techniques",
            "scope": {
                "where": {
                    "name": "x-ray absorption"
                }
            }
        }
    ]
}
```

Compacted
```json
{"include": [{"relation": "techniques","scope":{"where": {"name": "x-ray absorption"}}}]}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22x-rayabsorption%22%7D%7D%7D%5D%7D'
```

#### Response
```json
[
    {
        "pid": "20.500.12269/panosc-dataset3",
        "title": "PaNOSC Test Dataset 3",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document2",
        "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1",
        "techniques": [
            {
                "pid": "20.500.12269/panosc-tech2",
                "name": "x-ray absorption"
            }
        ]
    },
    {
        "pid": "20.500.12269/panosc-dataset4",
        "title": "PaNOSC Test Dataset 4",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document2",
        "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e",
        "techniques": [
            {
                "pid": "20.500.12269/panosc-tech2",
                "name": "x-ray absorption"
            }
        ]
    }
]
```

### 2. Query datasets where the photon energy range is 880-990 eV

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "and": [
                        {
                            "name": "photon_energy"
                        },
                        {
                            "value": {
                                "between": [880, 990]
                            }
                        },
                        {
                            "unit": "eV"
                        }
                    ]
                }
            }
        }
    ]
}
```

Compacted
```json
{"include": [{"relation":"parameters","scope":{"where":{"and":[{"name": "photon_energy"},{"value": {"between": [880, 990]}},{"unit": "eV"}]}}}]}
```


#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22parameters%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22photon_energy%22%7D%2C%7B%22value%22%3A%7B%22between%22%3A%5B880%2C990%5D%7D%7D%2C%7B%22unit%22%3A%22eV%22%7D%5D%7D%7D%7D%5D%7D'
```

#### Response
```json
[
    {
        "pid": "20.500.12269/panosc-dataset2",
        "title": "PaNOSC Test Dataset 2",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269",
        "parameters": [
            {
                "id": 3,
                "name": "photon_energy",
                "value": 930,
                "unit": "eV",
                "datasetId": "20.500.12269/panosc-dataset2"
            }
        ]
    }
]
```

### 3. Query datasets with a solid sample containing copper

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "or": [
                        {
                            "and": [
                                {
                                    "name": "sample_state"
                                },
                                {
                                    "value": "solid"
                                }
                            ]
                        },
                        {
                            "and": [
                                {
                                    "name": "chemical_formula"
                                },
                                {
                                    "value": "Cu"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    ]
}
```

Compacted
```json
{"include": [{"relation": "parameters","scope": {"where": {"or": [{"and": [{"name": "sample_state"},{"value": "solid"}]},{"and": [{"name": "chemical_formula"},{"value": "Cu"}]}]}}}]}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22parameters%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22and%22%3A%5B%7B%22name%22%3A%22sample_state%22%7D%2C%7B%22value%22%3A%22solid%22%7D%5D%7D%2C%7B%22and%22%3A%5B%7B%22name%22%3A%22chemical_formula%22%7D%2C%7B%22value%22%3A%22Cu%22%7D%5D%7D%5D%7D%7D%7D%5D'
```

#### Response
```json
[
    {
        "pid": "20.500.12269/panosc-dataset1",
        "title": "PaNOSC Test Dataset 1",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "parameters": [
            {
                "id": 1,
                "name": "chemical_formula",
                "value": "Cu",
                "unit": "",
                "datasetId": "20.500.12269/panosc-dataset1"
            },
            {
                "id": 2,
                "name": "sample_state",
                "value": "solid",
                "unit": "",
                "datasetId": "20.500.12269/panosc-dataset1"
            }
        ]
    }
]
```

### 4. Query datasets where temperature is below 80°C

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "and": [
                        {
                            "name": "temperature"
                        },
                        {
                            "value": {
                                "lt": 80
                            }
                        },
                        {
                            "unit": "celsius"
                        }
                    ]
                }
            }
        }
    ]
}
```

Compcated
```json
{"include": [{"relation": "parameters","scope": {"where": {"and": [{"name": "temperature"},{"value": {"lt": 80}},{"unit": "celsius"}]}}}]}
```


#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22parameters%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22temperature%22%7D%2C%7B%22value%22%3A%7B%22lt%22%3A80%7D%7D%2C%7B%22unit%22%3A%22celsius%22%7D%5D%7D%7D%7D%5D%7D'
```

#### Response
```json
[
    {
        "pid": "20.500.12269/panosc-dataset3",
        "title": "PaNOSC Test Dataset 3",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document2",
        "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1",
        "parameters": [
            {
                "id": 4,
                "name": "temperature",
                "value": 20,
                "unit": "celsius",
                "datasetId": "20.500.12269/panosc-dataset3"
            }
        ]
    }
]
```

### 5. Query datasets with files matching a string using full text search

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "files",
            "scope": {
                "where": {
                    "text": "file1"
                }
            }
        }
    ]
}
```

Compcated
```json
{"include": [{"relation": "files","scope": {"where": {"text": "file1"}}}]}
```


#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22files%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22text%22%3A%22file1%22%7D%7D%7D%5D%7D'
```


#### Response
```json
[
    {
        "pid": "20.500.12269/panosc-dataset1",
        "title": "PaNOSC Test Dataset 1",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "files": [
            {
                "id": 1,
                "name": "panosc-file1.hdf",
                "datasetId": "20.500.12269/panosc-dataset1"
            }
        ]
    }
]
```
