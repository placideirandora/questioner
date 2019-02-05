
import Joi from 'joi';
import sql from '../helpers/sql';
import database from '../db/database';
import meetUp from '../model/meetup';
import Question from '../model/question';
import validate from '../middleware/validate';

const meetups = {
  createMeetUp(req, res) {
    const {
      location, images, topic, happeningOn, tags,
    } = req.body;

    const { error } = Joi.validate({
      location, images, topic, happeningOn, tags,
    }, validate.meetupSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const meetup = new meetUp(location, images, topic, happeningOn, tags);
      const query = database(sql.createMeetUp, [meetup.location, meetup.images, meetup.topic, meetup.happeningOn, meetup.tags]);
      query.then((response) => {
        const {
            topic, location, happeningon, tags, images
        } = response[0];
        res.status(201).json({
          status: '201',
          success: 'meetup created',
          data: {
                    topic, location, happeningon, tags, images
          },
        });
      }).catch((error) => {
        res.status(500).send({ error: 'meetup creation failed', error });
      });
    }
  },

  retrieveSpecificMeetUp(req, res) {
    const meetupId = req.params.id;
    const status = 'ACTIVE';
    const { error } = Joi.validate({
      meetupId,
    }, validate.meetupParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const specificMeetUp = database(sql.retrieveSpecificMeetUp, [meetupId, status]);
      specificMeetUp.then((response) => {
        if (response.length === 0 || response.length === 'undefined') {
          res.status(404).send({ status: '404', error: 'meetup with the specified id, not found' });
        } else {
          res.status(200).json({
            status: '200',
            success: 'meetup retrieved',
            meetup: response[0],
          });
        }
      }).catch((error) => {
        res.status(500).send({ error: 'error occured', error });
      });
    }
  },

  retrieveAllMeetUps(req, res) {
    const status = 'ACTIVE';
    const allMeetUps = database(sql.retrieveAllMeetUps, [status]);
    allMeetUps.then((response) => {
      if (response.length === 0) {
        res.status(404).json({
          status: '404',
          error: 'no meetup found',
        });
      } else {
        res.status(200).json({
          status: '200',
          success: 'meetups retrieved',
          meetup: response,
        });
      }
    }).catch((error) => {
      res.status(500).send({ error: 'error occured', error });
    });
  },

  deleteSpecificMeetUp(req, res) {
    const meetupId = req.params.id;
    const statusDel = 'NOT ACTIVE';
    const status = 'ACTIVE';
    const { error } = Joi.validate({
      meetupId,
    }, validate.meetupParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const findMeetUp = database(sql.retrieveSpecificMeetUp, [meetupId, status]);
      findMeetUp.then((response) => {
        if (response.length === 0 || response.length === 'undefined') {
          res.status(404).send({ status: '404', message: 'meetup with the specified id, not found' });
        } else {
          const deleteMeetUp = database(sql.deleteSpecificMeetUp, [statusDel, meetupId]);
          deleteMeetUp.then((response) => {
            if (response) {
              res.status(200).send({ success: 'meetup deleted' });
            } else {
              res.status(400).send({ error: 'meetup not deleted' });
            }
          }).catch((error) => {
            res.status(500).send({ error: 'error occured', error });
          });
        }
      }).catch((error) => {
        res.status(500).send({ error: 'error occured', error });
      });
    }
  },

  submitRSVP(req, res) {
    const meetupId =  req.params.id;
    const meetupStatus = 'ACTIVE';
    const userid = req.userId;
    const {
      response, meetupId
    } = req.body;

    const { error } = Joi.validate({ response }, validate.rvspSchema);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      const findMeetUp = database(sql.retrieveSpecificMeetUp, [meetupId, meetupStatus]);
      findMeetUp.then((result) => {
        if (result.length === 0 || result === 'undefined') {
          res.status(404).send({ status: '404', error: 'meetup with the specified id, not found' });
        } else {
          const findUser = database(sql.retrieveSpecificUser, [userid]);
          findUser.then((result) => {
            if (result.length === 0 || result === 'undefined') {
              res.status(404).send({ status: '404', error: 'user not found' });
            } else {
              const rsvp = database(sql.submitRSVP, [meetupId, userid, response]);
              rsvp.then((result) => {
                res.status(201).json({
                  status: '201',
                  success: 'rsvp submitted',
                  data: [{ 
                      meetup: result[0].meetup, status: result[0].response
                    }]
                });
              }).catch((error) => {
                res.status(500).send({ error: 'error occured', error });
              });
            }
          }).catch((error) => {
            res.status(500).send({ message: 'error occured', error });
          });
        }
      }).catch((error) => {
        res.status(500).send({ message: 'An error has occured', error });
      });
    }
  },

  retrieveUpcomingMeetUps(req, res) {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString2 = `${year}-${month + 1}-${date}`;

    const meetupStatus = 'ACTIVE';
    const upcomingMeetUps = database(sql.retrieveUpcomingMeetUps, [dateString2, meetupStatus]);
    upcomingMeetUps.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ status: '404', error: 'meetup not found' });
      } else {
        res.status(200).json({
          status: '200',
          success: 'upcoming meetups',
          data: response,
        });
      }
    }).catch((error) => {
      res.status(500).send({ status: '500', error: 'error occured', error });
    });
  },

  postQuestion(req, res) {
    const meetupId = req.params.id;
    const status = 'ACTIVE';
    const createdBy = req.userId;
    const {
      title, body,
    } = req.body;
    const { error } = Joi.validate({
      meetupId, createdBy, title, body,
    }, validate.questionSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const findMeetUp = database(sql.retrieveSpecificMeetUp, [meetupId, status]);
      findMeetUp.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ status: '404', error: 'meetup with the specified id, not found' });
        } else {
          const findUser = database(sql.retrieveSpecificUser, [createdBy]);
          findUser.then((response) => {
            if (response.length === 0) {
              res.status(404).send({ status: '404', error: 'user with the specified id, not found' });
            } else {
              const question = new Question(createdBy, meetupId, title, body);
              const query = database(sql.postQuestion, [question.createdBy, question.meetup, question.title, question.body]);
              query.then((response) => {
                return res.status(201).json({
                  status: '201',
                  success: 'question posted',
                  data: {
                            user: req.userId,
                            meetup: response[0].meetup,
                            title: response[0].title,
                            body: response[0].body
                  },
                });
              }).catch((error) => {
                res.status(500).send({ message: 'error occured', error });
              });
            }
          }).catch((error) => {
            res.status(500).send({ message: 'error occured', error });
          });
        }
      }).catch((error) => {
        res.status(500).send({ error });
      });
    }
  },
};


export default meetups;
