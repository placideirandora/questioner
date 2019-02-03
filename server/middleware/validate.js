import Joi from 'joi';

const userSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(50).required(),
  lastname: Joi.string().alphanum().min(3).max(50).required(),
  othername: Joi.string().alphanum().min(3).max(50),
  phoneNumber: Joi.number().integer().min(12).required(),
  email: Joi.string().email({ minDomainAtomas: 2 }).required(),
  username: Joi.string().alphanum().min(3).max(50) .required(),
  password: Joi.string().alphanum().min(3).max(50) .required(),
});

const meetupSchema = Joi.object().keys({
  location: Joi.string().min(3).max(150).required(),
  images: Joi.array().items(Joi.string().min(4)),
  topic: Joi.string().min(3).max(50).required(),
  happeningOn: Joi.date() .required(),
  tags: Joi.array().items(Joi.string().min(3)).required(),
});

const questionSchema = Joi.object().keys({
  meetupId: Joi.number().integer().required(),
  createdBy: Joi.number().integer().required(),
  title: Joi.string().min(5).max(50).required(),
  body: Joi.string().min(5).max(120).required(),
  upvote: Joi.number().integer(),
  downvote: Joi.number().integer(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtomas: 2 }).required(),
  password: Joi.string().alphanum().min(3).max(50).required(),
});

const commentSchema = Joi.object().keys({
  questionId: Joi.number().required(),
  comment: Joi.string().required(),
});

const questionParams = Joi.object().keys({
  questionId: Joi.number().required(),
});

const meetupParams = Joi.object().keys({
  meetupId: Joi.number().integer().required(),
});

const rvspSchema = Joi.object().keys({
  meetupId: Joi.number().integer(),
  response: Joi.string().valid('yes', 'no', 'maybe').required(),
});

export default {
  userSchema,
  meetupSchema,
  questionSchema,
  loginSchema,
  questionParams,
  meetupParams,
  commentSchema,
  rvspSchema,
};
