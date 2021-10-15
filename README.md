## MetaCheck

An API service built with ExpressJs and Puppeteer for fetching the Meta tag information of any website

### Requirement

Node js Server (version ^10)
Yarn Package Manager

### Dependencies

```json
    "express": "^4.17.1"
    "node-fetch": "^2.6.1",
    "nodemon": "^2.0.7",
    "validatorjs": "^3.22.1"
    "puppeteer": "^10.4.0"
```

### Installation

After downloading this package, run the command below to install all dependencies

```bash
yarn install
```

Afterwards run the command below to start the node js server using nodemon

```bash
yarn start
```

### API endpoint

| Endpoint | Request parameter | Data type | Response                                                                            |
| -------- | ----------------- | --------- | ----------------------------------------------------------------------------------- |
| /fetch   | `url`             | `String`  | `success: {"message": "Metadata succesfully searched","pageTitle": "","data": [] }` |
