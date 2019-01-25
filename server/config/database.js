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


const user = `CREATE TABLE IF NOT EXISTS
users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    othername VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
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
    upvote INTEGER DEFAULT 0,
    downvote INTEGER DEFAULT 0
);`;

  const rsvp = `CREATE TABLE IF NOT EXISTS
rsvp(
    id SERIAL PRIMARY KEY,
    meetup INTEGER REFERENCES meetups(id),
    userid INTEGER REFERENCES users(id),
    response VARCHAR(10) NOT NULL
);`;

  const vote = `CREATE TABLE IF NOT EXISTS
votes(
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(id),
  question INTEGER REFERENCES questions(id),
  upvote INTEGER DEFAULT 0,
  downvote INTEGER DEFAULT 0
);`;

pool.query(user);

pool.query(meetup);

pool.query(vote);

pool.query(rsvp);

pool.query(question);

databaseTables();

  
};



export default pool;

