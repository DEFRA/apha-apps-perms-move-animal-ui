# apha-apps-perms-move-animal-ui

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_apha-apps-perms-move-animal-ui&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=DEFRA_apha-apps-perms-move-animal-ui)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_apha-apps-perms-move-animal-ui&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=DEFRA_apha-apps-perms-move-animal-ui)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_apha-apps-perms-move-animal-ui&metric=coverage)](https://sonarcloud.io/summary/new_code?id=DEFRA_apha-apps-perms-move-animal-ui)
[![Publish Workflow Status](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/publish.yml/badge.svg)](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/publish.yml)
[![Run Tests Browserstack (core) Status](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/run-tests-browserstack-core.yaml/badge.svg)](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/run-tests-browserstack-core.yaml)
[![Run Tests Browserstack (desktop) Status](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/run-tests-browserstack-desktop.yaml/badge.svg)](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/run-tests-browserstack-desktop.yaml)
[![Run Tests Browserstack (mobile) Status](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/run-tests-browserstack-mobile.yaml/badge.svg)](https://github.com/DEFRA/apha-apps-perms-move-animal-ui/actions/workflows/run-tests-browserstack-mobile.yaml)

Frontend to the 'Get permission to move animals under disease controls' service. It's purpose is to allow applicants to apply for licences to move animals, when such movements may be restricted due to disease outbreaks.

- [apha-apps-perms-move-animal-ui](#apha-apps-perms-move-animal-ui)
  - [Architecture Diagram](#architecture-diagram)
  - [Requirements](#requirements)
    - [Node.js](#nodejs)
  - [Server-side Caching](#server-side-caching)
  - [Redis](#redis)
  - [Local Development](#local-development)
    - [Setup](#setup)
    - [Development](#development)
    - [Production](#production)
    - [Npm scripts](#npm-scripts)
    - [Update dependencies](#update-dependencies)
    - [Formatting](#formatting)
      - [Windows prettier issue](#windows-prettier-issue)
  - [Docker](#docker)
    - [Development image](#development-image)
    - [Production image](#production-image)
    - [Docker Compose](#docker-compose)
    - [Dependabot](#dependabot)
    - [SonarCloud](#sonarcloud)
  - [Licence](#licence)
    - [About the licence](#about-the-licence)

## Architecture Diagram

![Milestone 1 - architecture_2025-01-28_14-47-11](https://github.com/user-attachments/assets/ea1c0cb5-fd91-4fd8-82c6-78b5b95aee6b)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v18` and [npm](https://nodejs.org/) `>= v9` You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd apha-apps-perms-move-animal-ui
nvm use
```

## Server-side Caching

We use Catbox for server-side caching. By default the service will use CatboxRedis when deployed and CatboxMemory for
local development.
You can override the default behaviour by setting the `SESSION_CACHE_ENGINE` environment variable to either `redis` or
`memory`.

Please note: CatboxMemory (`memory`) is _not_ suitable for production use! The cache will not be shared between each
instance of the service and it will not persist between restarts.

## Redis

Redis is an in-memory key-value store. Every instance of a service has access to the same Redis key-value store similar
to how services might have a database (or MongoDB). All frontend services are given access to a namespaced prefixed that
matches the service name. e.g. `my-service` will have access to everything in Redis that is prefixed with `my-service`.

If your service does not require a session cache to be shared between instances or if you don't require Redis, you can
disable setting `SESSION_CACHE_ENGINE=false` or changing the default value in `~/src/config/index.js`.

## Local Development

### Setup

Install application dependencies:

```bash
npm install
```

### Development

Initially to enable PDF compression you will need to install GhostScript onto your local machine
you will then need export a new environment variable that points to the binary

On MacOS machine running zsh this can all be achieved by running

```bash
brew install ghostscript
echo "\rexport GS_BINARY=$(which gs)" >> .envrc
direnv allow
```

To bring up dependencies run:

```bash
docker compose up -d
docker kill apha-apps-perms-move-animal-ui-your-frontend-1
```

To run the application in `development` mode run:

```bash
npm run dev
```

In order to receive emails three **environment variables** need to be set, either manually or using a _.envrc_ file and a tool like _direnv_

```bash
NOTIFY_TEMPLATE_ID=value_to_be_provided_by_tech_team
NOTIFY_API_KEY=value_to_be_provided_by_tech_team
NOTIFY_CASE_DELIVERY_EMAIL_ADDRESS=your_email_address@defra.gov.uk
```

The email address provided will need to be added to a guest list for it to be accepted by notify.

In order to upload files, you need the following environment variables:

```bash
UPLOADER_URL=http://localhost:7337
UPLOADER_URL=http://localhost:7337
FILE_S3_BUCKET=apha
FILE_S3_PATH=biosecurity-map
CONSUMER_BUCKETS=apha
MOCK_VIRUS_SCAN_ENABLED=false
```

### Production

To mimic the application running in `production` mode locally run:

```bash
npm start
```

### Npm scripts

All available Npm scripts can be seen in [package.json](./package.json)
To view them in your command line run:

```bash
npm run
```

### Update dependencies

To update dependencies use [npm-check-updates](https://github.com/raineorshine/npm-check-updates):

> The following script is a good start. Check out all the options on
> the [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

```bash
ncu --interactive --format group
```

### Formatting

#### Windows prettier issue

If you are having issues with formatting of line breaks on Windows update your global git config by running:

```bash
git config --global core.autocrlf false
```

## Docker

### Development image

Build:

```bash
docker build --target development --no-cache --tag apha-apps-perms-move-animal-ui:development .
```

Run:

```bash
docker run -p 3000:3000 apha-apps-perms-move-animal-ui:development
```

### Production image

Build:

```bash
docker build --no-cache --tag apha-apps-perms-move-animal-ui .
```

Run:

```bash
docker run -p 3000:3000 apha-apps-perms-move-animal-ui
```

### Docker Compose

A local environment with:

- Localstack for AWS services (S3, SQS)
- Redis
- MongoDB
- This service.
- A commented out backend example.

```bash
docker compose up --build -d
```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
