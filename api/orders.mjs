import express from "express";
const router = express.Router();
import { ReqError } from "../middleware/errorHandler.mjs";
import jwtValidator from "../middleware/jwtValidator.mjs";
import { validateOrderData } from "../middleware/validateData.mjs";
import {
  getOrders,
  getOrdersCategory,
  addOrder,
  getOrder,
  deleteOrder,
} from "../database/dbOrdersQueries.mjs";

router.get("/", jwtValidator, (req, res) => {
  const { product } = req.query;

  let data;

  if (product) {
    data = getOrdersCategory(product.toLowerCase());
  } else {
    data = getOrders();
  }

  res.status(200).json({
    data: data,
  });
});

// router.all("/", (req, res) => {
//   if (req.method === "GET") {
//     res.status(200).json({
//       message: "Order overview will come here",
//     });
//   } else if (req.method === "POST") {
//     res.status(200).json({
//       message: "Use this to post new orders.",
//     });
//   } else {
//     const error = new Error(
//       `${req.method} not supported on this endpoint. Please refer to the API documentation.`
//     );
//     error.status = 405;
//     throw error;
//   }
// });

// router.all("/:orderId", (req, res) => {
//   const { orderId } = req.params;
//   if (req.method === "GET") {
//     res.status(200).json({
//       message: `Get information about order with id ${orderId}`,
//     });
//   } else if (req.method === "DELETE") {
//     res.status(200).json({
//       message: `Delete order with id ${orderId}`,
//     });
//   } else {
//     const error = new Error(
//       `${req.method} not supported on this endpoint. Please refer to the API documentation.`
//     );
//     error.status = 405;
//     throw error;
//   }
// });

router.post("/", validateOrderData, (req, res) => {
  addOrder(req.body);
  res.status(201).json({
    message: "Order added successfully",
    addedOrder: req.body,
  });
});
// selection by id
router.all("/:orderId", (req, res) => {
  const { orderId } = req.params;

  if (req.method === "GET") {
    const data = getOrder(orderId);
    if (data) {
      res.status(200).json({
        message: `Got information about order with id ${orderId}`,
        data: data,
      });
    } else {
      throw new ReqError(404, `Order with id ${orderId} doesn't exist.`);
    }
  } else if (req.method === "DELETE") {
    const data = getOrder(orderId);
    if (data) {
      deleteOrder(orderId);
      res.status(200).json({
        message: `Deleted order with id ${orderId}`,
      });
    } else {
      throw new ReqError(404, `Order with id ${orderId} doesn't exist.`);
    }
  } else {
    throw new ReqError(
      405,
      `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    );
  }

  res.status(200).json({
    orderId: orderId,
    message: message,
    data: data,
  });
});

export default router;
