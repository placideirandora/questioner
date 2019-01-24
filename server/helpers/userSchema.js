import Joi from 'joi';

    
const userSchema = Joi.object({
            
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    othername: Joi.string(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
    
})

export default userSchema;


