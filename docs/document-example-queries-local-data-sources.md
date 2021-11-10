# Document example queries for test environment with local data sources

## Endpoint
`GET /documents`

## Contents
1. [Query documents of type proposal containing my own data](#query-documents-of-type-proposal-containing-my-own-data)
2. [Query documents where wavelength is 1000-1100 nm](#query-documents-where-wavelength-is-1000-1100-nm)
3. [Query documents containing datasets where wavelength is 1000-1100 nm](#query-documents-containing-datasets-where-wavelength-is-1000-1100-nm)
4. [Query documents investigating a particular sample using a certain technique](#query-documents-investigating-a-particular-sample-using-a-certain-technique)

## Examples

### 1. Query documents of type proposal containing my own data

#### Filter
Prettyfied
```json
{
    "where": {
        "type": "proposal"
    },
    "include": [
        {
            "relation": "datasets"
        },
        {
            "relation": "members",
            "scope": {
                "where": {
                    "role": "principal investigator"
                },
                "include": [
                    {
                        "relation": "person",
                        "scope": {
                            "where": {
                                "fullName": "James Chadwick"
                            }
                        }
                    }
                ]
            }
        }
    ]
}
```

Compacted
```json
{"where": {"type": "proposal"},"include": [{"relation": "datasets"},{"relation": "members","scope":{"where": {"role": "principal investigator"},"include": [{"relation": "person","scope": {"where": {"fullName": "James Chadwick"}}}]}}]}
```


#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents?filter=%7B%22where%22%3A%7B%22type%22%3A%22proposal%22%7D%2C%22include%22%3A%5B%7B%22relation%22%3A%22datasets%22%7D%2C%7B%22relation%22%3A%22members%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22role%22%3A%22principal%20investigator%22%7D%2C%22include%22%3A%5B%7B%22relation%22%3A%22person%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22fullName%22%3A%22James%20Chadwick%22%7D%7D%7D%5D%7D%7D%5D%7D'
```


#### Response
```json
[
    {
        "pid": "10.5072/panosc-document2",
        "isPublic": true,
        "type": "proposal",
        "title": "PaNOSC Test Proposal",
        "score": 0,
        "datasets": [
            {
                "pid": "20.500.12269/panosc-dataset3",
                "title": "PaNOSC Test Dataset 3",
                "isPublic": true,
                "creationDate": "2020-05-05T15:01:02.341Z",
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1"
            },
            {
                "pid": "20.500.12269/panosc-dataset4",
                "title": "PaNOSC Test Dataset 4",
                "isPublic": true,
                "creationDate": "2020-05-05T15:01:02.341Z",
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e"
            }
        ],
        "members": [
            {
                "id": 3,
                "role": "principal investigator",
                "documentId": "10.5072/panosc-document2",
                "affiliationId": 1,
                "personId": "panosc-person2",
                "person": {
                    "id": "panosc-person2",
                    "fullName": "James Chadwick"
                }
            }
        ]
    }
]
```

### 2. Query documents where wavelength is 1000-1100 nm

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
                            "name":"wavelength"
                        },
                        {
                            "value": {
                                "between": [1000, 1100]
                            }
                        },
                        {
                            "unit": "nm"
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
{"include": [{"relation": "parameters","scope": {"where": {"and": [{"name":"wavelength"},{"value": {"between": [1000, 1100]}},{"unit": "nm"}]}}}]}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22parameters%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22wavelength%22%7D%2C%7B%22value%22%3A%7B%22between%22%3A%5B1000%2C1100%5D%7D%7D%2C%7B%22unit%22%3A%22nm%22%7D%5D%7D%7D%7D%5D%7D'
```

#### Response
```json
[
    {
        "pid": "10.5072/panosc-document1",
        "isPublic": true,
        "type": "publication",
        "title": "PaNOSC Test Publication",
        "score": 0,
        "parameters": [
            {
                "id": 6,
                "name": "wavelength",
                "value": 1064,
                "unit": "nm",
                "documentId": "10.5072/panosc-document1"
            }
        ]
    }
]
```

### 3. Query documents containing datasets where wavelength is 1000-1100 nm

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "datasets",
            "scope": {
                "include": [
                    {
                        "relation": "parameters",
                        "scope": {
                            "where": {
                                "and": [
                                    {
                                        "name": "wavelength"
                                    },
                                    {
                                        "value": {
                                            "between": [1000,1100]
                                        }
                                    },
                                    {
                                        "unit": "nm"
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ]
}
```

Compacted
```json
{"include": [{"relation": "datasets","scope": {"include": [{"relation": "parameters","scope": {"where": {"and": [{"name": "wavelength"},{"value": {"between": [1000,1100]}},{"unit": "nm"}]}}}]}}]}
```

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22datasets%22%2C%22scope%22%3A%7B%22include%22%3A%5B%7B%22relation%22%3A%22parameters%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%22wavelength%22%7D%2C%7B%22value%22%3A%7B%22between%22%3A%5B1000%2C1100%5D%7D%7D%2C%7B%22unit%22%3A%22nm%22%7D%5D%7D%7D%7D%5D%7D%7D%5D%7D'
```

#### Response
```json
[
    {
        "pid": "10.5072/panosc-document2",
        "type": "proposal",
        "isPublic": true,
        "title": "PaNOSC Test Proposal",
        "score": 0,
        "datasets": [
            {
                "pid": "20.500.12269/panosc-dataset4",
                "title": "PaNOSC Test Dataset 4",
                "isPublic": true,
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e",
                "parameters": [
                    {
                        "id": 5,
                        "name": "wavelength",
                        "value": 1064,
                        "unit": "nm",
                        "datasetId": "20.500.12269/panosc-dataset4"
                    }
                ]
            }
        ]
    }
]
```

### 4. Query documents investigating a particular sample using a certain technique

#### Filter
Prettyfied
```json
{
    "include": [
        {
            "relation": "datasets",
            "scope": {
                "include": [
                    {
                        "relation": "samples",
                        "scope": {
                            "where": {
                                "name": "solid copper cylinder"
                            }
                        }
                    },
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
        }
    ]
}
```

Prettyfied
```json
{"include": [{"relation": "datasets","scope": {"include": [{"relation": "samples","scope": {"where": {"name": "solid copper cylinder"}}},{"relation": "techniques","scope": {"where": {"name": "x-ray absorption"}}}]}}]}
```


#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents?filter=%7B%22include%22%3A%5B%7B%22relation%22%3A%22datasets%22%2C%22scope%22%3A%7B%22include%22%3A%5B%7B%22relation%22%3A%22samples%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22solid%20copper%20cylinder%22%7D%7D%7D%2C%7B%22relation%22%3A%22techniques%22%2C%22scope%22%3A%7B%22where%22%3A%7B%22name%22%3A%22x-ray%20absorption%22%7D%7D%7D%5D%7D%7D%5D%7D'
```

#### Response
```json
[
    {
        "pid": "10.5072/panosc-document2",
        "isPublic": true,
        "type": "proposal",
        "title": "PaNOSC Test Proposal",
        "score": 0,
        "datasets": [
            {
                "pid": "20.500.12269/panosc-dataset3",
                "title": "PaNOSC Test Dataset 3",
                "isPublic": true,
                "creationDate": "2020-05-05T15:01:02.341Z",
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1",
                "samples": [
                    {
                        "pid": "20.500.12269/panosc-sample1",
                        "name": "solid copper cylinder"
                    }
                ],
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
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e",
                "samples": [
                    {
                        "pid": "20.500.12269/panosc-sample1",
                        "name": "solid copper cylinder"
                    }
                ],
                "techniques": [
                    {
                        "pid": "20.500.12269/panosc-tech2",
                        "name": "x-ray absorption"
                    }
                ]
            }
        ]
    }
]
```
