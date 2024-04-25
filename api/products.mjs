import express from "express";
const router = express.Router();
import { ReqError } from "../util/errorHandler.mjs";

const products = [
  {
    productName: "T-Shirt",
    productId: 12345,
    category: "Clothing",
    stock: 10,
    price: 19.99,
  },
  {
    productName: "Laptop",
    productId: 54321,
    category: "Electronics",
    stock: 5,
    price: 799.99,
  },
  {
    productName: "Coffee Mug",
    productId: 98765,
    category: "Kitchen",
    stock: 20,
    price: 8.99,
  },
  {
    productName: "Headphones",
    productId: 36987,
    category: "Electronics",
    stock: 15,
    price: 49.99,
  },
  {
    productName: "Notebook",
    productId: 25874,
    category: "Office Supplies",
    stock: 30,
    price: 5.99,
  },
  {
    productName: "Mouse",
    productId: 74125,
    category: "Electronics",
    stock: 8,
    price: 14.99,
  },
  {
    productName: "Plant",
    productId: 89632,
    category: "Home Decor",
    stock: 12,
    price: 15.5,
  },
  {
    productName: "Water Bottle",
    productId: 52143,
    category: "Kitchen",
    stock: 25,
    price: 9.99,
  },
];

router.all("/", (req, res) => {
  if (req.method === "GET") {
    let data = products;
    const { category } = req.query;

    if (category) {
      data = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.status(200).json({
      results: data,
    });
  } else if (req.method === "POST") {
    res.status(201).json({
      message: "Use this to add new products.",
    });
  } else {
    // const error = new Error(
    //   `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    // );
    // error.status = 405;
    // throw error;
    throw new ReqError(405, "u can't do that.");
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
