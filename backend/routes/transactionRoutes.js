const express = require("express");
const {
  createTransaction,
  updateTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");
const protect = require("../middleware/authMiddlware");
const router = express.Router();

router.post("/createTransaction", protect, createTransaction);

router.put("/updateTransaction/:id", protect, updateTransaction);

router
  .route("/:id")
  .get(protect, getTransaction)
  .delete(protect, deleteTransaction);
router.get("/", protect, getTransactions);

module.exports = router;
