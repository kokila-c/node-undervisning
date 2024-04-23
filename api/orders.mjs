import express from "express";
const router = express.Router();

router.all("/", (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({
      message: "Order overview will come here",
    });
  } else if (req.method === "POST") {
    res.status(200).json({
      message: "Use this to post new orders.",
    });
  } else {
    const error = new Error(
      `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    );
    error.status = 405;
    throw error;
  }
});

router.all("/:orderId", (req, res) => {
  const { orderId } = req.params;
  if (req.method === "GET") {
    res.status(200).json({
      message: `Get information about order with id ${orderId}`,
    });
  } else if (req.method === "DELETE") {
    res.status(200).json({
      message: `Delete order with id ${orderId}`,
    });
  } else {
    const error = new Error(
      `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    );
    error.status = 405;
    throw error;
  }
});

export default router;
