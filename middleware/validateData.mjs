import { userSchema, productSchema } from "../schema/schema.mjs";
import { ReqError } from "./errorHandler.mjs";

const validateData = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    let errorMsg = "";

    for (let msg of error.details) {
      errorMsg += `ERROR: ${msg.message} ---`;
    }

    throw new ReqError(400, errorMsg);
  } else {
    next();
  }
};

const validateUserData = validateData(userSchema);
const validateProductData = validateData(productSchema);

export { validateUserData, validateProductData };
