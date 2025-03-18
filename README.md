# UFF (University Friend Finder)

## Content table

- [Prerequisites](#prerequisites)
  - [Keys](#keys)
  - [Docker](#docker)
  - [Node.js](#nodejs)
- [Initial Setup](#initial-setup)
- [How to run the project (WIP)](#how-to-run-the-project-wip)
- [How to develop the project](#how-to-develop-the-project)

## Prerequisites

#### Keys

_You need to have installed RSA key in your GitHub account to clone the repository._

In order to do that, you need to generate a new SSH key.

```bash
# Generate a new SSH key
ssh-keygen -t rsa -b 4096
# Copy the SSH key to the clipboard
cat ~/.ssh/id_rsa.pub
```

After that, you need to add the SSH key to your GitHub account.

https://github.com/settings/ssh/new

To check if the SSH key is working properly, you can run the following command:

```bash
ssh -T git@github.com
```

### Docker

_You need to have installed Docker and Docker Compose in your machine._

https://docs.docker.com/engine/install/
https://docs.docker.com/compose/install/

### Node.js

_You need to have installed Node.js in your machine._
https://nodejs.org/en/download

## Initial Setup

```bash
git clone git@github.com:UFFproject/social-app.git
cd social-app
pnpm i
```

## How to run the project

<!-- ```bash
docker-compose up -d
docker exec -it uff-app npm run nx -- serve api
``` -->

##### Next.js App

```bash
pnpm nx dev uff
```

##### Hono API

```bash
pnpm nx serve hono
```

## How to develop the project

To create a new library, you can run the following command:

```bash
npx nx g @nx/js:library --directory=libs/api/<..> --importPath=@uff/library-name --name=library-name
```
