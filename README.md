## Features

- Create a ticket to transport ticketing system
- Get a ticket by Id
- Get all ticket booking history of a user in the system

## Quick Start

First step:

```console
$ npm install
```

or

```console
$ yarn add
```

Start script:

```console
$ nodemon index.js
```

Have your Docker Desktop installed then:

```console
$ docker build .
$ docker-compose up --build
```

-->Server will start at PORT 8080

Get all tickets: http://localhost:8080/tickets
Get ticket with id 1: http://localhost:8080/ticket/1
Create new ticket, post request to: http://localhost:8080/tickets
Get user by id: http://localhost:8080/user/123456
Create new user, post request to: http://localhost:8080/users
