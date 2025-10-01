
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Analytics.css';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const navigate = useNavigate();

  const incidentTrendsData = {
    labels: ['Jan', 'Mar', 'May', 'Jun'],
    datasets: [
      {
        label: 'Incidents',
        data: [150, 220, 180, 250],
        fill: true,
        backgroundColor: 'rgba(147, 112, 219, 0.2)',
        borderColor: '#9370DB',
        tension: 0.4,
      },
    ],
  };

  const breakdownData = {
    labels: ['Sexual Harassment', 'Physical/Verbal Abuse', 'Stalking/Threats', 'Other/Discrimination'],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: ['#9370DB', '#a384e3', '#b99ef5', '#d0bcfc'],
        hoverBackgroundColor: ['#9370DB', '#a384e3', '#b99ef5', '#d0bcfc'],
      },
    ],
  };

    const highRiskData = {
    labels: ['Koregaon Park', 'Hinjewadi IT Park', 'Deccan Gymkhana', 'Kothrud'],
    datasets: [
      {
        label: 'Incidents',
        data: [85, 70, 55, 35],
        backgroundColor: ['#ff6384', '#9370DB', '#a384e3', '#b99ef5'],
      },
    ],
  };

  const intensityData = {
    labels: ['1-3', '4-6', '7-8', '9-10'],
    datasets: [
      {
        label: 'Intensity',
        data: [15, 30, 48, 7],
        backgroundColor: ['#d0bcfc', '#b99ef5', '#a384e3', '#9370DB'],
      },
    ],
  };


  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1>Safety Analytics Dashboard</h1>
        <button className="go-back-button" onClick={() => navigate('/')}>Go Back</button>
      </div>

      <div className="summary-cards">
        <div className="glass-container card">
          <h3>TOTAL INCIDENTS (LAST 30 DAYS)</h3>
          <p className="value">1,245</p>
          <p className="change green">↑+8.4% vs. previous month</p>
        </div>
        <div className="glass-container card">
          <h3>AVG. INTENSITY SCORE (1-10)</h3>
          <p className="value">6.2</p>
          <p className="change red">↓-0.5% shift in intensity</p>
        </div>
        <div className="glass-container card">
          <h3>REPORTS PROCESSED (ADMIN VIEW)</h3>
          <p className="value">98.7%</p>
          <p>Target goal is 95%</p>
        </div>
      </div>

      <div className="chart-section">
        <div className="glass-container">
          <h3>Incident Trends (Last 6 Months)</h3>
          <Line data={incidentTrendsData} />
        </div>
        <div className="glass-container">
          <h3>Breakdown by Type</h3>
          <Doughnut data={breakdownData} />
        </div>
      </div>
        <div className="chart-section">
            <div className="glass-container">
              <h3>Top 5 High-Risk Areas (Pune)</h3>
              <Bar data={highRiskData} />
            </div>
            <div className="glass-container">
              <h3>Intensity Distribution (Severity)</h3>
              <Bar data={intensityData} />
            </div>
        </div>
    </div>
  );
};

export default Analytics;
