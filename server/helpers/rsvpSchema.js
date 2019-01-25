import Joi from 'joi';

    
const rsvpSchema = Joi.object({
            
    
    response: Joi.string().required(),
   
    
})

export default rsvpSchema;
