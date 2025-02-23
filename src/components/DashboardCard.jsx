import React from "react";
import { Card } from "react-bootstrap";

const DashboardCard = ({ children }) => {
  return (
    <Card className="soft-card h-100">
      <Card.Body className="d-flex align-items-center justify-content-center">{children}</Card.Body>
    </Card>
  );
};

export default DashboardCard;
