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

### Deployment

```
Heroku
```

### Security

```
bcryptjs and jsonwebtoken
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

| Method | Endpoint Route | Description |
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

## DEVELOPER

Placide IRANDORA

## COPYRIGHT

&copy; 2019 Placide IRANDORA






