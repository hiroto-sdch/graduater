import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const MyPieChart: React.FC = () => {
  const data = {
    labels: ["A+", "A", "B", "C", "D"],
    datasets: [{
      backgroundColor: [
        "#6927FF",
        "#7B3CFF",
        "#B384FF",
        "#D0B0FF",
        "#EAD9FF"
      ],
      hoverBackgroundColor: [
        "#6927FF",
        "#7B3CFF",
        "#B384FF",
        "#D0B0FF",
        "#EAD9FF"
      ],
      data: [38, 31, 21, 10, 2]
    }]
  };

  return <Pie data={data} />;
}

export default MyPieChart;