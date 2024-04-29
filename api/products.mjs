import express from "express";
const router = express.Router();
import { ReqError } from "../util/errorHandler.mjs";
import {
  getProducts,
  getCategory,
  addProduct,
  getProduct,
  deleteProduct,
} from "../util/dbQueries.mjs";

router.all("/", (req, res) => {
  if (req.method === "GET") {
    const { category } = req.query;

    // initialize a variable to hold our data.

    let data;

    // fill data with content depending on if we received a query for category or not.
    if (category) {
      data = getCategory(category.toLowerCase());
    } else {
      data = getProducts();
    }

    res.status(200).json({
      data: data,
    });
  } else if (req.method === "POST") {
    addProduct(req.body);

    res.status(201).json({
      message: "Product added successfully",
      addedProduct: req.body,
    });
  } else {
    // const error = new Error(
    //   `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    // );
    // error.status = 405;
    // throw error;
    throw new ReqError(
      405,
      "Unsupported request method. Please refer to the API documentation"
    );
  }
});

router.all("/:productId", (req, res) => {
  const { productId } = req.params;

  let message, data;

  if (req.method === "GET") {
    data = getProduct(productId);
    if (data) {
      message = "Successfully fetched data for product " + productId;
    } else {
      throw new ReqError(
        404,
        `CANNOT FETCH: Product with id ${productId} doesn't exist.`
      );
    }
  } else if (req.method === "DELETE") {
    data = getProduct(productId);
    if (data) {
      deleteProduct(productId);
      message = "Successfully deleted product with id " + productId;
    } else {
      throw new ReqError(
        404,
        `CANNOT DELETE: Product with id ${productId} doesn't exist.`
      );
    }
  } else if (req.method === "PUT") {
  } else {
    throw new ReqError(
      405,
      "Unsupported request method. Please refer to the API documentation"
    );
  }
  res.status(200).json({
    productId: productId,
    message: message,
    data: data,
  });
});

export default router;
