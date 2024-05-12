import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = Joi.object({
  email: Joi.string().email().required().min(5).max(100),
  password: joiPassword
    .string()
    .minofSpecialCharacters(2)
    .minofLowercase(2)
    .minofUppercase(2)
    .minofNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(["password", "1234", ""]),
});

const orderSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  category: Joi.string().min(3).max(100).required(),
  stock: Joi.number().min(0).max(10000).precision(0),
  price: Joi.number().min(0).precision(2).required(),
});

export { userSchema, orderSchema };
