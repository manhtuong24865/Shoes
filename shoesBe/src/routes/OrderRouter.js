const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", OrderController.createOrder);
router.get(
  "/get-all-order/:id",
  // authUserMiddleware,
  OrderController.getAllOrderDetails
);
router.get(
  "/get-details-order/:id",
  // authUserMiddleware,
  OrderController.getDetailsOrder
);
router.delete(
  "/cancel-order/:id",
  // authUserMiddleware,
  OrderController.cancelOrderDetails
);
router.get("/get-all-orders", OrderController.getAllOrder);

router.get(
  "/revenue-by-day",
  // authUserMiddleware,
  OrderController.report
);

module.exports = router;
