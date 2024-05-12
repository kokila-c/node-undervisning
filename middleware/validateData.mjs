import { userSchema, orderSchema } from "../schema/schema.mjs";
import { ReqError } from "./errorHandler.mjs";

const validateData = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    let errorMsg = "";
    for (let msg of error.details) {
      errorMsg += `ERROR: ${msg.message} ---`;
    }
    throw new ReqError(400, errorMag);
  } else {
    next();
  }
};

const validateUserData = validateData(userSchema);
const validateOrderData = validateData(orderSchema);

export { validateUserData, validateOrderData };
