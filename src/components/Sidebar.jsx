import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar p-3 bg-dark text-white" style={{ minHeight: "100vh" }}>
      <h4>Vitalii Crypto Dashboard</h4>

      <div className="mt-4">
        <h6>Credits</h6>
        <p className="mb-1">
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/vitalii-medynskyi-912544226/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white d-block text-truncate"
            style={{ maxWidth: "200px" }}>
            linkedin.com/in/vitalii-medynskyi
          </a>
        </p>
        <p>
          <strong>Email:</strong>
          <a
            href="mailto:vitaliymed060@gmail.com"
            className="text-white d-block text-truncate"
            style={{ maxWidth: "200px", wordBreak: "break-word" }}>
            vitaliymed060@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
