const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  const ticket = new Ticket({
    title,
    description,
    user: req.user.userId,
  });
  await ticket.save();
  res.status(201).json(ticket);
};

exports.getTickets = async (req, res) => {
  if (req.user.role === "admin") {
    const tickets = await Ticket.find().populate("user", "email");
    res.json(tickets);
  } else {
    const tickets = await Ticket.find({ user: req.user.userId }).populate(
      "user",
      "email"
    );
    res.json(tickets);
  }
};

exports.updateTicketStatus = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(ticket);
};

exports.deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Ticket deleted" });
};

exports.getUserTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.userId }).populate(
    "user",
    "email"
  );
  res.json(tickets);
};

exports.searchTickets = async (req, res) => {
  const tickets = await Ticket.find({
    $or: [
      { title: { $regex: req.params.query, $options: "i" } },
      { description: { $regex: req.params.query, $options: "i" } },
    ],
  }).populate("user", "email");
  res.json(tickets);
};

exports.getOpenTickets = async (req, res) => {
  const tickets = await Ticket.find({ status: "Open" }).populate(
    "user",
    "email"
  );
  res.json(tickets);
};

exports.getInProgressTickets = async (req, res) => {
  const tickets = await Ticket.find({ status: "In Progress" }).populate(
    "user",
    "email"
  );
  res.json(tickets);
};

exports.getClosedTickets = async (req, res) => {
  const tickets = await Ticket.find({ status: "Closed" }).populate(
    "user",
    "email"
  );
  res.json(tickets);
};

exports.getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.userId }).populate(
    "user",
    "email"
  );
  res.json(tickets);
};

exports.getMyOpenTickets = async (req, res) => {
  const tickets = await Ticket.find({
    user: req.user.userId,
    status: "Open",
  }).populate("user", "email");
  res.json(tickets);
};

exports.getMyInProgressTickets = async (req, res) => {
  const tickets = await Ticket.find({
    user: req.user.userId,
    status: "In Progress",
  }).populate("user", "email");
  res.json(tickets);
};

exports.getMyClosedTickets = async (req, res) => {
  const tickets = await Ticket.find({
    user: req.user.userId,
    status: "Closed",
  }).populate("user", "email");
  res.json(tickets);
};
