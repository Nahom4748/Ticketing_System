import React, { Component } from "react";
import { FaPaperclip, FaCheck, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: "",
        priority: "medium",
        category: "general",
      },
      files: [],
      dragActive: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  handleFileDrop = (e) => {
    e.preventDefault();
    this.setState({ dragActive: false });
    if (e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      this.setState({ files: [...this.state.files, ...newFiles] });
    }
  };

  handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      this.setState({ files: [...this.state.files, ...newFiles] });
    }
  };

  removeFile = (index) => {
    const newFiles = [...this.state.files];
    newFiles.splice(index, 1);
    this.setState({ files: newFiles });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(this.state.formData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      this.state.files.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });

      const response = await fetch("https://your-api-endpoint.com/tickets", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Ticket submitted successfully!");
        this.setState({
          formData: {
            title: "",
            description: "",
            priority: "medium",
            category: "general",
          },
          files: [],
        });
      } else {
        alert("Error submitting ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your ticket.");
    }
  };

  render() {
    const { formData, files, dragActive } = this.state;

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Ticket
        </h2>

        <form onSubmit={this.handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={this.handleInputChange}
              className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Enter ticket title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={this.handleInputChange}
              rows="4"
              className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Describe your issue in detail..."
              required
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={this.handleInputChange}
                className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={this.handleInputChange}
                className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="general">General</option>
                <option value="billing">Billing</option>
                <option value="technical">Technical</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>

          {/* Attachments */}
          <div className="border rounded-lg p-4 space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                this.setState({ dragActive: true });
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                this.setState({ dragActive: false });
              }}
              onDrop={this.handleFileDrop}
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
              style={{
                backgroundColor: dragActive ? "#f3f4f6" : "transparent",
              }}
            >
              <div className="flex justify-center items-center mb-2">
                <FaPaperclip className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-600">
                Drag & drop files here or{" "}
                <span
                  className="text-indigo-600 font-medium cursor-pointer"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  browse files
                </span>
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                hidden
                onChange={this.handleFileUpload}
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md"
                  >
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      onClick={() => this.removeFile(index)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="flex items-center justify-center">
                <FaCheck className="mr-2" /> Submit Ticket
              </span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTicket;
