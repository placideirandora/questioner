# questioner

​Questioner​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

[![Build Status](https://travis-ci.org/placideirandora/questioner.svg?branch=develop)](https://travis-ci.org/placideirandora/questioner) [![Coverage Status](https://coveralls.io/repos/github/placideirandora/questioner/badge.svg?branch=develop)](https://coveralls.io/github/placideirandora/questioner?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/931a22049dce652e85fe/maintainability)](https://codeclimate.com/github/placideirandora/questioner/maintainability) 


## tools used

Programming Language:

```sh
JavaScript
```

Server Environment:

```sh
NodeJS
```

Test Libraries:

```sh
Mocha, Chai, and Jasmine
```

Continuous Integration Testing:

```sh
Travis-CI and Coveralls
```

Code Maintainability:

```sh
Code Climate
```

Deployment:

```sh
Heroku
```

## getting started

Install Required Dependencies:

```sh
$ npm install
```

Start The Server:

```sh
$ npm start
```

Run Tests:

```sh
$ npm run test
```

## api endpoits routes

| Method | Endpoint Route | Description |
|--------|----------------|-------------|
|  POST  | api/v1/auth/signup | create a user account |
|  POST  | api/v1/auth/login  | log user in |
|  GET   | api/v1/users | retrieve all users |
|  GET   | api/v1/users/id | retrieve a specific user | 
|  DELETE | api/v1/users/id | delete a specific user |
|  POST | api/v1/meetups | create a meetup record |
|  GET   | api/v1/meetups | retrieve all meetups |
|  GET   | api/v1/meetups/id | retrieve a specific meetup |
|  POST  | api/v1/meetups/id/rsvps | respond to a specific meetup |
|  GET   | api/v1/meetups/upcoming | retrieve upcoming meetups |
|  DELETE | api/v1/meetups/id | delete a specific meetup |
|  POST  | api/v1/meetups/id/questions | create a question for a specific meetup |
|  PATCH | api/v1/questions/id/upvote | upvote a specific question |
|  PATCH | api/v1/questions/id/downvote | downvote a specific question |
|  PATCH | api/v1/questions/id | retrieve questions for a specific meetup |
|  POST  | api/v1/questions/id/comments | comment on a specific question |

## developer

```sh
Placide IRANDORA
```

## copyright

&copy; 2019 Placide IRANDORA






