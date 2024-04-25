import express from "express";
import productsRoute from "./api/products.mjs";
import ordersRoute from "./api/orders.mjs";
import eventLogger from "./util/eventLogger.mjs";
import { errorHandler, ReqError } from "./util/errorHandler.mjs";

// Initialize express
const app = express();

// Establish server port
const PORT = process.env.PORT || 3500;

// Custom request logger middleware
app.use(eventLogger);

// Built in middleware to serve static files
app.use(express.static("public"));

// Api routes. Uses external routers.
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

// 404 catcher. Catches any request not picked up by our route handlers.
app.all("*", (req, res, next) => {
  throw new ReqError(404, "Not found!");
});

// Error handler returns error in json format.
app.use(errorHandler);

// Server startup, listening for requests at provided port.
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
