const uuid = require ('uuid');

const questionsDB = [
    {
        "id": uuid.v4(),
        "createdOn": new Date().toGMTString(),
        "createdBy": "e303e425-ed25-4255-a528-4fcdc8079bb0",
        "meetup": "3ea315a1-c39b-496f-8c7a-b74fb6942300",
        "title": "ANDELA LEARNING COMMUNITY",
        "body": "What is the importance of ALC relating to Andela?"
    },
    {
        "id": uuid.v4(),
        "createdOn": new Date().toGMTString(),
        "createdBy": "eb8f4f8b-ca69-4d09-bffc-f004dfd36d6f",
        "meetup": "9837906e-b799-4cdd-90d7-d2f02fd9e3f9",
        "title": "PROGATE MEETUP 20",
        "body": "What is the best language to learn in 2019 between JavaScript and Python?"
    },
    {
        "id": uuid.v4(),
        "createdOn": new Date().toGMTString(),
        "createdBy": "fd126d1a-7792-4078-ba95-84d3a428d1a8",
        "meetup": "60c59d21-72a7-421f-870c-9744865d1ea2",
        "title": "ANDELA OPEN SESSION",
        "body": "Will Andela stop recruiting Developers after reaching 500"
    },
    
];

module.exports = questionsDB;