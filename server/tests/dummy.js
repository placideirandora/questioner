import dotenv from 'dotenv';

dotenv.config();

const newUser = {
    firstname: "Emmanuel",
    lastname: "CYUBAHIRO",
    othername: "cr7",
    email: "emmanuelcyubahiro@gmail.com",
    phoneNumber: "8451896",
    username: "cr7",
    password: "123456"
};

const admin = {
    email: "placideirandora@gmail.com",
    password: process.env.ADMIN_PASSWORD,
}

const newUserLogIn = {
    email: newUser.email,
    password: newUser.password
};


export {
    newUser,
    newUserLogIn,
    admin
};
