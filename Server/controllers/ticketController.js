const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    // Validate required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Verify user authentication
    if (!req.user?.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const ticket = new Ticket({
      title,
      description,
      user: req.user.userId,
      status: "Open",
    });

    await ticket.save();
    res.status(201).json({
      _id: ticket._id,
      title: ticket.title,
      status: ticket.status,
      createdAt: ticket.createdAt,
    });
  } catch (error) {
    console.error("Ticket creation error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    // Get the authenticated user's ID from the request object
    const userId = req.user.userId;

    // Fetch tickets for the current user with populated user details
    const tickets = await Ticket.find({ user: userId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("user", "email name"); // Get user's email and name

    // Return the formatted response
    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets.map((ticket) => ({
        _id: ticket._id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        createdAt: ticket.createdAt,
        user: {
          email: ticket.user.email,
          name: ticket.user.name,
        },
      })),
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching user tickets:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
// Other controller methods remain the same...
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

// Get ticket statistics
exports.stats = async (req, res) => {
  try {
    const stats = await Ticket.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          statusStats: [
            {
              $group: {
                _id: null,
                open: {
                  $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] },
                },
                inProgress: {
                  $sum: { $cond: [{ $eq: ["$status", "inProgress"] }, 1, 0] },
                },
                closed: {
                  $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] },
                },
                resolved: {
                  $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] },
                },
              },
            },
          ],
          priorityStats: [
            {
              $group: {
                _id: "$priority",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $project: {
          total: { $arrayElemAt: ["$total.count", 0] },
          open: { $arrayElemAt: ["$statusStats.open", 0] },
          inProgress: { $arrayElemAt: ["$statusStats.inProgress", 0] },
          closed: { $arrayElemAt: ["$statusStats.closed", 0] },
          resolved: { $arrayElemAt: ["$statusStats.resolved", 0] },
          priorities: "$priorityStats",
        },
      },
    ]);

    // Transform priorities array to object with required fields
    const result = stats[0] || {};
    const priorityMap = (result.priorities || []).reduce((acc, curr) => {
      acc[curr._id.toLowerCase()] = curr.count;
      return acc;
    }, {});

    const finalStats = {
      total: result.total || 0,
      open: result.open || 0,
      inProgress: result.inProgress || 0,
      closed: result.closed || 0,
      resolved: result.resolved || 0,
      highPriority: priorityMap.high || 0,
      mediumPriority: priorityMap.medium || 0,
      lowPriority: priorityMap.low || 0,
      criticalPriority: priorityMap.critical || 0,
    };

    res.json({
      success: true,
      data: finalStats,
    });
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getRecentTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email")
      .lean();

    res.json({
      success: true,
      data: tickets.map((ticket) => ({
        ...ticket,
        ticketId: ticket._id.toString().slice(-6).toUpperCase(),
        createdAt: ticket.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching recent tickets:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
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
