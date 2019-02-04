
import Joi from 'joi';
import validate from '../middleware/validate';
import database from '../db/database';
import sql from '../helpers/sql';

const questions = {

  upvote(req, res) {
    const questionId = req.params.id;
    const userid = req.userId;
    const vote = 1;
    const { error } = Joi.validate({
      questionId,
    }, validate.questionParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const countingupvotes = database(sql.countingupVotes);
      const question = database(sql.retrieveSpecificQuestion, [questionId]);
      question.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ message: 'question with the specified id, not found' });
        } else {
          const checkvoteduser = database(sql.checkifvoted, [userid, questionId]);
          checkvoteduser.then((response) => {
            if (response.length === 0) {
              const upvote = database(sql.upvote, [userid, questionId, vote]);
              upvote.then((response) => {
                if (response) {
                  countingupvotes.then((countResponse) => {
                    if (countResponse !== 0) {
                      res.status(200).json({
                        status: '200',
                        success: 'question upvoted',
                        data: [{
                                 votes: countResponse[0].upvote
                        }] 
                      });
                    } else {
                       return res.status(400).json({
                            status: '400',
                            error: 'voting failed'
                        });
                    }
                  });
                }
              }).catch((error) => {
                res.status(500).send({ message: 'an error has occured', error });
              });
            } else if (response.length !== 0) {
                      return res.status(401).json({
                      status: '401',
                      error: 'you have already voted'
                    });
                }
              });
        }
      });
    }
  },

  downvote(req, res) {
    const questionId = req.params.id;
    const userid = req.userId;
    const vote = 1;
    const { error } = Joi.validate({
      questionId,
    }, validate.questionParams);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const countingdownvotes = database(sql.countingdownVotes);
      const question = database(sql.retrieveSpecificQuestion, [questionId]);
      question.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ error: 'question with the specified id, not found' });
        } else {
          const checkvoteduser = database(sql.checkifvoted, [userid, questionId]);
          checkvoteduser.then((response) => {
            if (response.length === 0) {
              const downvote = database(sql.downvote, [userid, questionId, vote]);
              downvote.then((response) => {
                if (response) {
                  countingdownvotes.then((countResponse) => {
                    if (countResponse.length !== 0) {
                      res.status(200).json({
                        status: '200',
                        success: 'question downvoted',
                        data: [{
                                 votes: countResponse[0].downvote
                        }]
                      });
                    } else {
                      return  res.status(400).json({
                          status: '400',
                          error: 'voting failed'
                        });
                    }
                  });
                }
              }).catch((error) => {
                res.status(500).send({ message: 'error occured', error });
              });
            } else if (response.length !== 0) {
                    res.status(200).json({
                      status: '401',
                      error: 'you have already voted'
                    });
            }
          });
        }
      });
    }
  },

  retrieveMeetUpQuestions(req, res) {
    const status = 'ACTIVE';
    const  meetupId  = req.params.id;
    const findMeetup = database(sql.retrieveSpecificMeetUp, [meetupId, status]);
    findMeetup.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ status: '404', error: 'meetup with the specified id, not found' });
      } else {
        const meetUpQuestions = database(sql.retrieveMeetUpQuestions, [meetupId]);
        meetUpQuestions.then((response) => {
          if (response.length === 0) {
            res.status(404).send({ status: '404', error: 'no questions found for the specified meetup id' });
          } else {
            res.status(200).json({
              status: '200',
              success: 'questions for the meetup',
              data: response,
            });
          }
        });
      }
    }).catch((error) => {
      res.status(500).send({ error: 'error occured', error });
    });
  },

  commentQuestion(req, res) {
    const questionId = req.params.id;
    const {
      comment,
    } = req.body;
    const { error } = Joi.validate({
      questionId, comment,
    }, validate.commentSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }
    const userid = req.userId;
    const findQuestion = database(sql.retrieveSpecificQuestion, [questionId]);
    findQuestion.then((response) => {
      if (response.length === 0 || response === 'undefined') {
        res.status(404).json({
          status: '404',
          error: 'question not found',
        });
      } else {
        const postComment = database(sql.postComment, [userid, questionId, comment]);
        postComment.then((response) => {
          if (response) {
            res.status(201).json({
              status: '201',
              success: 'comment posted',
              data: [{
                  question: questionId,
                  comment: response[0].comment
              }]
              
            });
          }
        }).catch((error) => {
          res.status(500).send(error);
        });
      }
    }).catch((error) => {
      res.status(500).send(error);
    });
  },
};

export default questions;
