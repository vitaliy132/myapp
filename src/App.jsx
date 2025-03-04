import React from "react";
import News from "./components/News";
import Portfolio from "./components/Portfolio";
import BitcoinPricePrediction from "./components/BitcoinYearPrice";
import FearGreedIndex from "./components/FearGreedIndex";
import MyBitcoinPriceChange from "./components/MyBitcoinPriceChange";
import BitcoinYearlyChart from "./components/BitcoinYearlyChart";
import Sidebar from "./components/Sidebar";
import DashboardCard from "./components/DashboardCard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  const dashboardItems = [
    { component: <Portfolio />, id: "portfolio" },
    { component: <BitcoinPricePrediction />, id: "price-prediction" },
    { component: <FearGreedIndex />, id: "daily-changes" },
    { component: <MyBitcoinPriceChange />, id: "btc-change" },
  ];

  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col md={2} className="p-3">
          <Sidebar />
        </Col>

        <Col md={10} className="content p-4">
          <Row>
            {dashboardItems.map(({ component, id }) => (
              <Col md={3} key={id}>
                <DashboardCard>{component}</DashboardCard>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <DashboardCard>
                <div className="chart-container">
                  <BitcoinYearlyChart />
                </div>
              </DashboardCard>
            </Col>
            <Col md={6}>
              <DashboardCard>
                <div className="d-flex flex-column h-100">
                  <h5 className="mb-3">Latest News</h5>
                  <News className="flex-grow-1" />
                </div>
              </DashboardCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
