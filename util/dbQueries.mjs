import sqlite3 from "better-sqlite3";
import { join } from "path";
const { dirname } = import.meta;

// initialize database

const db = new sqlite3(join(dirname, "..", "database", "store.sqlite"));

// queries for /products

const getProducts = () => db.prepare("SELECT * FROM products").all();

const getCategory = (category) => {
  const getCategoryQuery = db.prepare(
    "SELECT * FROM products WHERE LOWER(category) = ?"
  );
  return getCategoryQuery.all(category);
};

const addProduct = ({ name, category, stock, price }) => {
  const addProductQuery = db.prepare(
    "INSERT INTO products (name, category, stock, price) VALUES(?, ?, ?, ?)"
  );
  addProductQuery.run(name, category, stock, price);
};

const getProduct = (id) => {
  const getProductQuery = db.prepare("SELECT * FROM products WHERE id = ?");
  return getProductQuery.get(id);
};

const deleteProduct = (id) => {
  const deleteProductQuery = db.prepare("DELETE FROM products WHERE id = ?");
  deleteProductQuery.run(id);
};

export { getProducts, getCategory, addProduct, getProduct, deleteProduct };
