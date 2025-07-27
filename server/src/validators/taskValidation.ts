import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('Pending', 'In Progress', 'Done').default('Pending'),
  dueDate: Joi.date().optional(),
  tags: Joi.array().items(Joi.string()),
  userId: Joi.forbidden(),
});