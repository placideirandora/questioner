# QUESTIONER

​Questioner​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

[![Build Status](https://travis-ci.org/placideirandora/questioner.svg?branch=develop)](https://travis-ci.org/placideirandora/questioner)  [![Coverage Status](https://coveralls.io/repos/github/placideirandora/questioner/badge.svg?branch=develop)](https://coveralls.io/github/placideirandora/questioner?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/931a22049dce652e85fe/maintainability)](https://codeclimate.com/github/placideirandora/questioner/maintainability) 


## TOOLS USED

### Programming Language

```
JavaScript
```

### Server Environment

```
NodeJS
```

### Test Libraries

```
Mocha, Chai, and Jasmine
```

### Continuous Integration Testing

```
Travis-CI and Coveralls
```

### Code Maintainability

```
Code Climate
```

### Database

```
PostgreSQL
```

### Deployment

```
Heroku
```

### Security

```
BcryptJS and JsonWebToken
```

## GETTING STARTED

### Install Required Dependencies

```
$ npm install
```

### Start The Server

```
$ npm start
```

### Run Tests

```
$ npm run test
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

## REQUESTS AND RESPONSES SAMPLE

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

## DEVELOPER

Placide IRANDORA

## COPYRIGHT

&copy; 2019 Placide IRANDORA

