const rsvps = [
    {
        "meetup": "2",
        "status": "yes"
    },
    {
        "meetup": "1",
        "status": "maybe"
    }
];
const questions = [
    {
        "id": 1,
        "meetup": 2,
        "title": "FELLOWSHIP",
        "body": "What is the salary of Andela Fellowship?",
        "upvotes": 0,
        "downvotes": 0
    },
    {
        "id": 2,
        "meetup": 1,
        "title": "ALC",
        "body": "What is the importance of ALC?",
        "upvotes": 0,
        "downvotes": 0
    }
];
const meetups = [
    {
        id: 1,
        createdOn: new Date().toGMTString(),
        location: "University of Rwanda - College of Science and Technology - KIST 4",
        images: [ "image 1", "image2" ],
        topic: "ANDELA LEARNING COMMUNITY MEETUP 5.0",
        happeningOn: new Date("2019-02-01").toGMTString(),
        tags: [ "software development", "andela", "web development" ]
    },
    {
        id: 2,
        createdOn: new Date().toGMTString(),
        location: "TELECOM",
        images: [ "image 1", "image2" ],
        topic: "ANDELA OPEN SESSION",
        happeningOn: new Date("2019-08-01").toGMTString(),
        tags: [ "andela", "fellowship", "assessments" ]
    },
    {
        id: 3,
        createdOn: new Date().toGMTString(),
        location: "FAIR VIEW - WESTERWEL",
        images: [ "image 1", "image2" ],
        topic: "PROGATE MEETUP 20",
        happeningOn: new Date("2019-05-15").toGMTString(),
        tags: [ "JavaScript", "Python", "CSS" ]
    },
];
const users = [
    {   
        "id": 1,
        "firstname": "Placide",
        "lastname": "IRANDORA",
        "othername": "geek",
        "email": "placideirandora@gmail.com",
        "phoneNumber": "0786045655",
        "username": "placideirandora"
    },
    {   
        "id": 2,
        "firstname": "Innocent",
        "lastname": "TUYISHIMIRE",
        "othername": "bienvenu",
        "email": "innocenttuyishimire@gmail.com",
        "phoneNumber": "07861885655",
        "username": "bienvenu" 
    },
    {   
        "id": 3,
        "firstname": "Fred",
        "lastname": "MANZI",
        "othername": "nyakawhite",
        "email": "fredmanzi@gmail.com",
        "phoneNumber": "0784579584",
        "username": "fredmanzi" 
    },
];

export default
{
    meetups, rsvps, users, questions
}