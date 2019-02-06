const meetupPost = {
    location: 'Kigali Up House',
    images: [
        'image1'
    ],
    topic: 'Security Awareness',
    happeningOn: '2019-03-10',
    tags: ['cryptography', 'credentials'],
};

const questionPost = {
    createdBy: 1,
    title: 'CYBERSECURIT',
    body: 'How can i protect my computer from hackers?',
};

const rsvpPost = {
    meetup: 1,
    user: 1,
    response: 'yes',
};

const userPost = {
    firstname: 'Emmanuel',
    lastname: 'CYUBAHIRO',
    othername: 'cr7',
    email: 'emmanuelcyubahiro@gmail.com',
    phoneNumber: '8451896',
    username: 'cr7',
    password: '123456',
    isAdmin: false,
};

const invalidUserLogIn = {
    email: 'cyubahiro@gmail.com',
    password: '12345',
};

const validUserLogIn = {
    username: userPost.username,
    password: userPost.password,
};

export {
    meetupPost,
    questionPost,
    rsvpPost,
    userPost,
    validUserLogIn,
    invalidUserLogIn,
};
