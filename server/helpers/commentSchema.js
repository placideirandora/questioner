import Joi from 'joi';

    
const commentSchema = Joi.object({
            
    
    title: Joi.string().required(),
    body: Joi.string().required(),
    comment: Joi.string().required(),
   
    
})

export default commentSchema;
