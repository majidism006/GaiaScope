import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SDGChart = ({ sdgScores }) => {
  // TODO: Render bar chart for SDG 1–17 values
  const data = {
    labels: Array.from({ length: 17 }, (_, i) => `SDG ${i + 1}`),
    datasets: [
      {
        label: 'SDG Score',
        data: sdgScores || Array(17).fill(0),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'SDG Scores',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SDGChart;
