import Joi from 'joi';

    
const meetUpSchema = Joi.object({
            
    location: Joi.string().required(),
    images: Joi.array(),
    topic: Joi.string().required(),
    happeningOn: Joi.date().required(),
    tags: Joi.array().required()
   
    
})

export default meetUpSchema;
