const Joi = require("joi");

function validator(req: any, res: any, next: any) {
  const { error } = validateInfluencer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  else {
    next();
  }
}

function validateInfluencer(user: any) {
  const schema = {
    igFollow: Joi.string().required(),
    igID: Joi.string().required(),
    fbID: Joi.string().required(),
    fbFollow: Joi.string().required(),
    ytFollow: Joi.string().required(),
    ytID: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    ownPromocode: Joi.string().required(),
    refPromoCode: Joi.string().required(),
    refName: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

module.exports = validator;
