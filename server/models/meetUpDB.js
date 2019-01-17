const uuid = require ('uuid'); 

const meetUpsDB = [
    {
        "id": uuid.v4(),
        "createdOn": new Date().toGMTString(),
        "location": "University of Rwanda - College of Science and Technology - KIST 4",
        "images": [ "image 1", "image2" ],
        "topic": "ANDELA LEARNING COMMUNITY MEETUP 5.0",
        "happeningOn": new Date("2019-02-01").toGMTString(),
        "tags": [ "software development", "andela", "web development" ]
    },

    {
        "id": uuid.v4(),
        "createdOn": new Date().toGMTString(),
        "location": "FAIR VIEW - WESTERWEL",
        "images": [ "image 1", "image2" ],
        "topic": "PROGATE MEETUP 20",
        "happeningOn": new Date("2019-05-15").toGMTString(),
        "tags": [ "JavaScript", "Python", "CSS" ]
    },

    {
        "id": uuid.v4(),
        "createdOn": new Date().toGMTString(),
        "location": "TELECOM",
        "images": [ "image 1", "image2" ],
        "topic": "ANDELA OPEN SESSION",
        "happeningOn": new Date("2019-08-01").toGMTString(),
        "tags": [ "andela", "fellowship", "assessments" ]
    },
];


module.exports = meetUpsDB;



