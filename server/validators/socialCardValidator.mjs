export const socialCardSchema = Joi.object({
  profilePhoto: Joi.string().uri().required(),
  profession: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(200).required(),
  socialLinks: Joi.array().items(
    Joi.object({
      platform: Joi.string().required(),
      url: Joi.string().uri().required(),
    })
  ).required(),
  location: Joi.string().required().default(),
});
