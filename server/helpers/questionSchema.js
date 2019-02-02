import Joi from 'joi';

    
const questionSchema = Joi.object({
            
    
    
    comment: Joi.string().required(),
    
   
    
})

export default questionSchema;
