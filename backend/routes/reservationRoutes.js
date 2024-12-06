const express = require("express");
const {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas protegidas para reservas
router.route("/").get(protect, getReservations).post(protect, createReservation);
router
  .route("/:id")
  .put(protect, updateReservation)
  .delete(protect, deleteReservation);

module.exports = router;