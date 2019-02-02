import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

const connect = async () => await pool.connect();

const databaseTables = async () => {
  const admininfo = [
    process.env.ADMIN_FIRSTNAME,
    process.env.ADMIN_LASTNAME,
    process.env.ADMIN_OTHER,
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PHONENUMBER,
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD,
    process.env.IS_ADMIN,
  ];


const user = `CREATE TABLE IF NOT EXISTS
users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    othername VARCHAR(50),
    email VARCHAR(50) UNIQUE NULL,
    phonenumber VARCHAR(20) UNIQUE NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    registered TIMESTAMP default current_timestamp,
    isadmin BOOLEAN NOT NULL default FALSE
);`;


  const meetup = `CREATE TABLE IF NOT EXISTS
meetups(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    topic VARCHAR(128) NOT NULL,
    location VARCHAR(50) NOT NULL,
    happeningon DATE UNIQUE,
    tags text[],
    images text[]
    
    
);`;

  const question = `CREATE TABLE IF NOT EXISTS
questions(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    createdby INTEGER REFERENCES users(id),
    meetup INTEGER REFERENCES meetups(id),
    title VARCHAR(50) NOT NULL,
    body TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0
);`;

  const rsvp = `CREATE TABLE IF NOT EXISTS
rsvps(
    id SERIAL PRIMARY KEY,
    meetup INTEGER REFERENCES meetups(id),
    userid INTEGER REFERENCES users(id),
    status VARCHAR(10) NOT NULL
);`;

  const vote = `CREATE TABLE IF NOT EXISTS
votes(
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(id),
  questionid INTEGER REFERENCES questions(id),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0
);`;

const comment = `CREATE TABLE IF NOT EXISTS
comments(
  id SERIAL PRIMARY KEY,
  questionid INTEGER REFERENCES questions(id),
  comment TEXT NOT NULL
);`;

pool.query(user);

pool.query(meetup);

pool.query(vote);

pool.query(rsvp);

pool.query(question);

pool.query(comment);



  
};



databaseTables();




export default pool;
