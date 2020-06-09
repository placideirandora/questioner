# QUESTIONER (NODEJS)

A full-stack web application that helps meetup organizers prioritize questions to be answered. 

[![Build Status](https://travis-ci.org/placideirandora/questioner.svg?branch=develop)](https://travis-ci.org/placideirandora/questioner)  [![Coverage Status](https://coveralls.io/repos/github/placideirandora/questioner/badge.svg?branch=develop)](https://coveralls.io/github/placideirandora/questioner?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/931a22049dce652e85fe/maintainability)](https://codeclimate.com/github/placideirandora/questioner/maintainability) 


## SOFTWARE TECHNOLOGIES
- **HTML + CSS + JS** - UI

- **NodeJS** - JavaScript Run-time Environment

- **ExpressJS** - Web Framework

- **Mocha and Chai** - Test Framework And Assertion Library

- **Travis-CI** - Continuous Integration Testing

- **Coveralls** - Continuous Integration Test Coverage

- **Code Climate** - Continuous Integration Code Quality

- **Heroku** - Deployment. [Visit The App](https://epic-mail-ch3.herokuapp.com/)

- **GitHub Pages** - Front-End UI Hosting. [Visit The App](https://placideirandora.github.io/epic-mail/)

- **SQL** - Database Data Processing Language

- **PostgreSQL** - Database System. [Download And Install It](https://www.postgresql.org/)


## GETTING STARTED

### Clone The Project

```
$ git clone https://github.com/placiderapson/questioner-with-node.js
```

### Install Required Dependencies

```
$ npm install
```

### Download And Install A Database Management System

```
$ PostgreSQL
```

### PostgreSQL Databases

```
$ Create a PostgreSQL database called 'questioner' for development
```

```
$ Create a PostgreSQL database called 'questioner-test' for testing
```

### Create A .env File In The Project Folder And Save The Following Credentials Inside

```
$ DB_HOST = "localhost"
```

```
$ DB_USER = "postgres"
```

```
$ DB_PASSWORD = "xxxxxxxxxx"
```

```
$ DB_NAME = "questioner"
```

```
$ DB_NAME_TEST = "questioner-test"
```

```
$ DB_PORT = 5000 (custom) or 5432 (default)
```

```
$ ADMIN_FIRSTNAME = "someone"
```

```
$ ADMIN_LASTNAME = "someone"
```

```
$ ADMIN_USERNAME = "someone"
```

```
$ ADMIN_EMAIL = "someone@email.com"
```

```
$ ADMIN_PASSWORD = "xxxxxxxxxx"
```

```
$ IS_ADMIN = "true"
```

```
$ SECRET_KEY = "xxxxxxxxxxx"
```

### Start The Server

```
$ npm start
```

### Run Tests

```
$ npm test
```

## API ENDPOINT ROUTES

| METHOD | ROUTE | DESCRIPTION |
|--------|----------------|-------------|
|  POST  | api/v1/auth/signup | Create a user account |
|  POST  | api/v1/auth/login  | Log user in |
|  GET   | api/v1/users | Retrieve all users |
|  GET   | api/v1/users/id | Retrieve a specific user | 
|  DELETE | api/v1/users/id | Delete a specific user |
|  POST | api/v1/meetups | Create a meetup record |
|  GET   | api/v1/meetups | Retrieve all meetups |
|  GET   | api/v1/meetups/id | Retrieve a specific meetup |
|  POST  | api/v1/meetups/id/rsvps | Respond to a specific meetup |
|  GET   | api/v1/meetups/upcoming | Retrieve upcoming meetups |
|  DELETE | api/v1/meetups/id | Delete a specific meetup |
|  POST  | api/v1/meetups/id/questions | Create a question for a specific meetup |
|  PATCH | api/v1/questions/id/upvote | Upvote a specific question |
|  PATCH | api/v1/questions/id/downvote | Downvote a specific question |
|  PATCH | api/v1/questions/id | Retrieve questions for a specific meetup |
|  POST  | api/v1/questions/id/comments | Comment on a specific question |

## REQUEST AND RESPONSE SAMPLE

### POST meetups/

```
{
    "status": "201",
    "success": "meetup created",
    "data": {
        "topic": "JavaScript Hackathon",
        "location": "Kigali Convention Center",
        "happeningon": "2019-10-20T00:00:00.000Z",
        "tags": [
            "coding",
            "nodejs"
        ],
        "images": [
            "image1",
            "image2"
        ]
    }
}
```

```
{
    "status": "201",
    "success": "meetup created",
    "data": {
        "topic": "Agile Methodology",
        "location": "Kigali Heights",
        "happeningon": "2019-05-04T00:00:00.000Z",
        "tags": [
            "scrum",
            "kanban"
        ],
        "images": [
            "image1"
        ]
    }
}
```

### GET meetups/

```
{
    "status": "200",
    "success": "meetups retrieved",
    "meetup": [
        {
            "id": 1,
            "createdon": "2019-02-05T14:03:55.496Z",
            "location": "University of Rwanda - College of Science and Technology",
            "images": [
                "image1"
            ],
            "topic": "Andela Learning Community 20",
            "happeningon": "2019-03-15T00:00:00.000Z",
            "tags": [
                "developer",
                "spectrum",
                "andela"
            ],
            "status": "ACTIVE"
        },
        {
            "id": 2,
            "createdon": "2019-02-05T14:05:27.106Z",
            "location": "Fair View - Westerwel StartUp House",
            "images": [
                "image1",
                "image2"
            ],
            "topic": "Progate 30",
            "happeningon": "2019-02-10T00:00:00.000Z",
            "tags": [
                "javascript",
                "python"
            ],
            "status": "ACTIVE"
        },
        {
            "id": 3,
            "createdon": "2019-02-05T14:07:27.258Z",
            "location": "Telecom House",
            "images": [
                "image5"
            ],
            "topic": "Andela Open Session",
            "happeningon": "2019-05-22T00:00:00.000Z",
            "tags": [
                "fellowship",
                "bootcamp",
                "world-class developer"
            ],
            "status": "ACTIVE"
        },
        {
            "id": 6,
            "createdon": "2019-02-05T20:04:18.191Z",
            "location": "Kigali Convention Center",
            "images": [
                "image1",
                "image2"
            ],
            "topic": "JavaScript Hackathon",
            "happeningon": "2019-10-20T00:00:00.000Z",
            "tags": [
                "coding",
                "nodejs"
            ],
            "status": "ACTIVE"
        },
        {
            "id": 7,
            "createdon": "2019-02-05T20:06:53.269Z",
            "location": "Kigali Heights",
            "images": [
                "image1"
            ],
            "topic": "Agile Methodology",
            "happeningon": "2019-05-04T00:00:00.000Z",
            "tags": [
                "scrum",
                "kanban"
            ],
            "status": "ACTIVE"
        }
    ]
}
```


