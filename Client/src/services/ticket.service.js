import axios from "axios";
import API_URL from "../util/baseURL";

const getAuthToken = () => {
  const storedUser = localStorage.getItem("authToken");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing authToken:", error);
    return null;
  }
};

const createTicket = async (formData) => {
  try {
    const authData = getAuthToken();
    console.log(authData);
    if (!authData?.token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(`${API_URL}/api/tickets`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Ticket creation failed";
    throw new Error(message);
  }
};

const getMyTickets = async () => {
  const authData = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/api/tickets/my-tickets`, {
      headers: {
        Authorization: `Bearer ${authData?.token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tickets");
  }
};
// ticket.service.js
export const getTicketStats = async () => {
  const authData = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/api/tickets/stats`, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Ticket Stats Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch ticket stats"
    );
  }
};

export const getRecentTickets = async () => {
  const authData = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/api/tickets/recent`, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Recent Tickets Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch recent tickets"
    );
  }
};

const updateTicketStatus = async (ticketId, updateData) => {
  try {
    const authData = getAuthToken();
    const response = await axios.put(
      `${API_URL}/api/tickets/${ticketId}`,
      JSON.stringify(updateData), // Ensure it's properly formatted JSON
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update ticket status");
  }
};

export const getAllTickets = async () => {
  const authData = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/api/tickets`, {
      headers: {
        Authorization: `Bearer ${authData?.token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tickets");
  }
};
const TicketService = {
  createTicket,
  getMyTickets,
  getTicketStats,
  getAllTickets,
  getRecentTickets,
  updateTicketStatus,
};
export default TicketService;
