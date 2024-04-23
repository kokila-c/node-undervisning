import express from "express";
const router = express.Router();

router.all("/", (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({
      message: "Products will come here.",
    });
  } else if (req.method === "POST") {
    res.status(201).json({
      message: "Use this to add new products.",
    });
  } else {
    const error = new Error(
      `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    );
    error.status = 405;
    throw error;
  }
});

router.all("/:productId", (req, res) => {
  const { productId } = req.params;
  if (req.method === "GET") {
    res.status(200).json({
      productId: productId,
      message: `Information about product with id ${productId} will come here.`,
    });
  } else if (req.method === "DELETE") {
    res.status(200).json({
      productId: productId,
      message: `This will delete product with id ${productId}`,
    });
  } else if (req.method === "PUT") {
    res.status(200).json({
      productId: productId,
      message: `Thiss will update product with id ${productId}`,
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
