import Joi from 'joi';

    
const questionSchema = Joi.object({
            
    
    title: Joi.string().required(),
    body: Joi.string().required(),
    
   
    
})

export default questionSchema;

