const sql = {};

const admin = 'INSERT INTO users(firstname, lastname, othername, email, phonenumber, username, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (email) DO NOTHING';

const registerUser = 'INSERT INTO users(firstname, lastname, othername, email, phonenumber, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ';

const createMeetUp = 'INSERT INTO meetups(location, images, topic, happeningon, tags) VALUES ($1, $2, $3, $4, $5) RETURNING * ';

const postQuestion = 'INSERT INTO questions(createdby, meetup, title, body) VALUES ($1, $2, $3, $4) RETURNING * ';

const submitRSVP = 'INSERT INTO rsvps(meetupid, userid, response) VALUES ($1, $2, $3) RETURNING * ';

const retrieveAllMeetUps = 'SELECT * FROM meetups WHERE status = $1';

const retrieveSpecificMeetUp = 'SELECT * FROM meetups WHERE id = $1 AND status = $2';

const retrieveUpcomingMeetUps = 'SELECT * FROM meetups WHERE happeningon > $1::DATE AND status = $2';

const upvote = 'INSERT INTO votes(userid, questionid, upvotes) VALUES ($1, $2, $3) RETURNING * ';

const downvote = 'INSERT INTO votes(userid, questionid, downvotes) VALUES($1, $2, $3) RETURNING * ';

const deleteSpecificMeetUp = 'UPDATE meetups SET status = $1 WHERE id = $2';

const deleteSpecificUser = 'DELETE FROM users WHERE id = $1';

const retrieveSpecificUser = 'SELECT * FROM users WHERE id = $1';

const retrieveSpecificQuestion = 'SELECT * FROM questions WHERE id=$1';

const retrieveSpecificEmail = 'SELECT * FROM users WHERE email = $1';

const countingupVotes = 'SELECT question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.upvote, votes.question, COUNT(votes.upvote) AS upvotes_sum FROM questions, votes WHERE votes.upvote=1 AND votes.question=question.id GROUP BY question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.question, votes.upvote, votes.downvote';

const countingdownVotes = 'SELECT question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.downvote, votes.question, COUNT(votes.downvote) AS downvote_sum FROM questions, votes WHERE votes.downvote=1 AND votes.question=question.id GROUP BY question.id, question.createdon, question.createdby, question.meetup, question.title, question.body, votes.question, votes.downvote';

const login = 'SELECT * FROM users WHERE email = $1 AND password = $2';

const retrieveMeetUpQuestions = 'SELECT * FROM questions WHERE meetup = $1';

const checkifvoted = 'SELECT * FROM votes WHERE userid = $1 AND questionid = $2';

const deletevoteduser = 'DELETE FROM votes WHERE userid = $1 AND question = $2';

const truncate = 'TRUNCATE TABLE users, meetups, questions, rsvp, votes RESTART IDENTITY CASCADE';

const postComment = 'INSERT INTO comments(userid, questionid, comment) VALUES ($1, $2, $3) RETURNING *';

const retrieveAllusers = 'SELECT * FROM users';

sql.registerUser = registerUser;
sql.createMeetUp = createMeetUp;
sql.postQuestion = postQuestion;
sql.submitRSVP = submitRSVP;
sql.retrieveAllMeetUps = retrieveAllMeetUps;
sql.retrieveSpecificMeetUp = retrieveSpecificMeetUp;
sql.retrieveUpcomingMeetUps = retrieveUpcomingMeetUps;
sql.retrieveSpecificEmail = retrieveSpecificEmail;
sql.upvote = upvote;
sql.downvote = downvote;
sql.deleteSpecificMeetUp = deleteSpecificMeetUp;
sql.deleteSpecificUser = deleteSpecificUser;
sql.retrieveSpecificUser = retrieveSpecificUser;
sql.retrieveSpecificQuestion = retrieveSpecificQuestion;
sql.login = login;
sql.retrieveMeetUpQuestions = retrieveMeetUpQuestions;
sql.admin = admin;
sql.checkifvoted = checkifvoted;
sql.deletevoteduser = deletevoteduser;
sql.countingupVotes = countingupVotes;
sql.countingdownVotes = countingdownVotes;
sql.truncate = truncate;
sql.postComment = postComment;
sql.retrieveAllusers = retrieveAllusers;

export default sql;
