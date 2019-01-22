import Joi from 'joi';

    
const questionSchema = Joi.object({
            
    createdBy: Joi.number().integer().required(),
    meetup: Joi.number().integer().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    votes: Joi.number().integer(),
    upvotes: Joi.number().integer(),
    downvotes: Joi.number().integer()
   
    
})

export default questionSchema;
