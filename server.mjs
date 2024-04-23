import express from "express";
import productsRoute from "./api/products.mjs";
import ordersRoute from "./api/orders.mjs";
import eventLogger from "./eventLogger.mjs";

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
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Error handler returns error in json format.
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Server startup, listening for requests at provided port.
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
