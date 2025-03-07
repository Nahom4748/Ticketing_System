const express = require("express");
const {
  createTicket,
  getTickets,
  getUserTickets,
  updateTicketStatus,
  deleteTicket,
  stats,
  getRecentTickets,
} = require("../controllers/ticketController");

const router = express.Router();

const {
  authenticate,
  authorizeAdmin,
  authorizeUser,
} = require("../middleware/auth.middleware");

router.post("/", [authenticate, authorizeUser], createTicket);
router.get("/", authenticate, getTickets);
router.get("/my-tickets", [authenticate, authorizeUser], getUserTickets);
router.get("/stats", [authenticate], stats);
router.get("/recent", [authenticate], getRecentTickets);
router.put("/:id", [authenticate, authorizeAdmin], updateTicketStatus);
router.delete("/:id", [authenticate, authorizeAdmin], deleteTicket);

module.exports = router;
