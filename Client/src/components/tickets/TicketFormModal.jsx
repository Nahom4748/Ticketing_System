import React, { useRef, useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";

const TicketFormModal = ({ isOpen, onClose, onSubmit, darkMode }) => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "medium",
    category: "general",
    attachment: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError("Failed to create ticket. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 
                flex items-center justify-center z-50 transition-opacity 
                ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-6 
                  w-full max-w-md overflow-hidden transition-all 
                  transform scale-${isOpen ? "100" : "95"} opacity-${
          isOpen ? "100" : "0"
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Create New Ticket
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-500 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 
                          border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                Description
              </label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 
                          border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 
                            border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 
                            border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                >
                  <option value="general">General Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                Attach File (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  name="attachment"
                  onChange={handleChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-full px-4 py-2 border rounded-lg flex items-center justify-between 
                            cursor-pointer border-gray-300 dark:text-gray-500 dark:border-gray-700
                            hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <span>Select File</span>
                  <span className="text-gray-400 dark:text-gray-600">
                    Attach
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 
                        rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-800 disabled:opacity-50 
                        disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <FaSpinner className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <FiCheck className="mr-2 w-5 h-5" /> Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketFormModal;
