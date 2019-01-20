const Joi = require ('joi');

    
const meetUpSchema = Joi.object({
            
    location: Joi.string().required(),
    images: Joi.array().required(),
    topic: Joi.string().required(),
    happeningOn: Joi.date().required(),
    tags: Joi.array().required()
   
    
})

module.exports = meetUpSchema;
