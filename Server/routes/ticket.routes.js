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
  authorizeUser,
} = require("../middleware/auth.middleware");

router.post("/", [authenticate, authorizeUser], createTicket);
router.get("/", authenticate, getTickets);
router.put("/:id", [authenticate, authorizeAdmin], updateTicketStatus);
router.delete("/:id", [authenticate, authorizeAdmin], deleteTicket);

module.exports = router;
