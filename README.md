# Photon and Neutron Search Api

## Documentation

* [Data Model](https://github.com/panosc-eu/search-api/wiki/Data-Model)
* [API Calls](./doc/api-calls.md)
* [Querying](./doc/query.md)
* [Units and Prefixes](./doc/units-and-prefixes.md)

## How to use the Photon and Neutron search api

1. Clone the repository

  ```bash
  git clone git@github.com:panosc-eu/search-api.git
  ```

2. Install node packages

  ```bash
  npm install
  ```

3. Start the server

```bash
npm start
```

4. To search for e.g. all datasets where temperature is greater than 0 C and pressure is greater than 7000000 Pa

```bash
npx ts-node ./exampleQuery.ts
```


## Acceptance and integration tests

```bash
npm test
```
