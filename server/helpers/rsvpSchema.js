const Joi = require ('joi');

    
const rsvpSchema = Joi.object({
            
    id: Joi.number().integer(),
    meetup: Joi.number().integer().required(),
    topic: Joi.string().required(),
    response: Joi.string().required(),
   
    
})

module.exports = rsvpSchema;
