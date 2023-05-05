const Joi = require("joi");
const validator = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneNo: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ err: error });
  } else {
    next();
  }
};

module.exports = validator;
