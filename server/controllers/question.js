import Joi from 'joi';
import dummy from '../models/dummy';
import validate from '../middleware/validate';

const questions = {
     retrieveMeetUpQuestions (req, res)
     {  
        const meetupId = parseInt (req.params.id, 10);
        const meetup = dummy.meetups.find(meetup => meetup.id === meetupId);
        if (!meetup) {
        res.status(404).json({
            status: 404,
            error: 'meetup not found'
        });
    }
        dummy.questions.map ((question) => {
            if (question.meetup === meetupId)
            {
                    res.status(200).json({
                    status: 200,
                    success: 'questions retrieved',
                    data: question,
                });
            }
        });
        res.status(404).json({
            status: 404,
            error: 'no question found'
        });
     },
 
     upvote(req, res)
     {  
        const questionId = parseInt(req.params.id, 10);
        const { error } = Joi.validate({
            questionId,
          }, validate.questionParams);
          if (error) {
            res.status(400).json({ error: error.details[0].message });
          } else {
        const arrIndex = dummy.questions.findIndex(question => question.id === questionId);
        let questionFound;
        let itemIndex;
        dummy.questions.map ((findQuestion, index) => {
            if (findQuestion.id === questionId) 
            {
                questionFound = findQuestion;
                itemIndex = index;
            }
        });
        if (!questionFound)
        {
            res.status(404).send({
                status: 404,
                error: 'question not found'
            
            });
        }
        const upvoted = {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: dummy.questions[arrIndex].upvotes++
        };
        res.status (200).send ({
            status: 200,
            success: 'question upvoted ',
            data: upvoted,
        });
    }
    },

     downvote(req, res)
     {
       const questionId = parseInt(req.params.id, 10);
       const { error } = Joi.validate({
        questionId,
      }, validate.questionParams);

      if (error) {
        res.status(400).json({ error: error.details[0].message });
      } else {
        const arrIndex = dummy.questions.findIndex(question => question.id === questionId);
        let questionFound;
        let itemIndex;
        dummy.questions.map ((findQuestion, index) => {
            if (findQuestion.id === questionId) 
            {
                questionFound = findQuestion;
                itemIndex = index;    
            }
        });
        if (!questionFound)
        {
             res.status(404).send({
                status: 404,
                 error: 'question not found'
            
            });
        }
        const downvoted = {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: dummy.questions[arrIndex].downvotes++
        };
        res.status (200).send ({
            status: 200,
            success: 'question downvoted',
            data: downvoted
        });
    }
}
};

export default questions;