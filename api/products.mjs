import express from "express";
const router = express.Router();
import { ReqError } from "../middleware/errorHandler.mjs";
import jwtValidator from "../middleware/jwtValidator.mjs";
import {
  getProducts,
  getCategory,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../database/dbQueries.mjs";

router.get("/", jwtValidator, (req, res) => {
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
});

router.post("/", (req, res) => {
  addProduct(req.body);

  res.status(201).json({
    message: "Product added successfully",
    addedProduct: req.body,
  });
});

router.get("/:productId", (req, res, next) => {
  const { productId } = req.params;
  const data = getProduct(productId);
  if (data) {
    res.status(200).json({
      productId: productId,
      message: `Successfully fetched data for product ${productId}`,
      data: data,
    });
  } else {
    next(
      new ReqError(
        404,
        `CANNOT FETCH: Product with id ${productId} doesn't exist.`
      )
    );
  }
});

router.delete("/:productId", (req, res, next) => {
  const { productId } = req.params;
  const data = getProduct(productId);
  if (data) {
    deleteProduct(productId);
    res.status(200).json({
      productId: productId,
      message: `Successfully deleted product with id ${productId}`,
    });
  } else {
    next(
      new ReqError(
        404,
        `CANNOT DELETE: Product with id ${productId} doesn't exist.`
      )
    );
  }
});

router.put("/:productId", (req, res, next) => {
  const { productId } = req.params;
  const { name, category, stock, price } = req.body;
  const checkProduct = getProduct(productId);
  if (checkProduct) {
    updateProduct(name, category, stock, price, productId);
    res.status(200).json({
      productId: productId,
      message: `Successfully updated product with id ${productId}`,
      data: {
        oldVersion: checkProduct,
        newVersion: req.body,
      },
    });
  } else {
    next(
      new ReqError(
        404,
        `CANNOT UPDATE: Product with id ${productId} doesn't exist.`
      )
    );
  }
});

router.all("/:productId", (req, res, next) => {
  next(
    new ReqError(
      405,
      "Unsupported request method. Please refer to the API documentation"
    )
  );
});

export default router;

// CRUD- Create, Read, Update, Delete
