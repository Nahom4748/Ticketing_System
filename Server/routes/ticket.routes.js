const express = require("express");
const {
  createTicket,
  getTickets,
  updateTicketStatus,
  deleteTicket,
} = require("../controllers/ticketController");

const router = express.Router();

const {
  authenticate,
  authorizeAdmin,
} = require("../middleware/auth.middleware");

router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.put("/:id", [authenticate, authorizeAdmin], updateTicketStatus);
router.delete("/:id", [authenticate, authorizeAdmin], deleteTicket);

module.exports = router;
