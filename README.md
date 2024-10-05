<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Auth microservice

# Steps to run the app in dev environment

1. clone the repository if it does not already exists
2. install dependencies
3. create a file `.env` based on `.env.template`
4. execute prisma migration `npx prisma generate dev`
5. run with command `npm run start:dev`

# When using docker and prisma remember to add and update this two lines in the package.json

"start:dev": "npm run prisma:docker && nest start --watch",
"prisma:docker": "npx prisma generate",

# PRISMA

1. Prisma

```
npm install prisma --save-dev
```

2. Prisma init

```
npx prisma init
```

3. Generate the client in this case of mongoDB

```
npx prisma generate
```

<!-- 3. Prisma generate table

```
npx prisma migrate dev --name init
```

4. Install and generate Prisma Client

```
npm install @prisma/client
``` -->

## Instalations

1. dotenv

```
npm i dotenv
```

2. joi

```
npm i joi
```

3. Install microservices

```
npm i --save @nestjs/microservices
```

4. NATS

```
npm i --save nats
```

5. class validator class transform

```
npm i class-validator class-transformer
```

6. bcryptjs

```
npm i bcryptjs
```

7. @nestjs/jwt

```
npm i --save @nestjs/jwt
```

## Test

# unit tests

```
npm run test
```

# e2e tests

```
npm run test:e2e
```

# test coverage

```
npm run test:cov
```
