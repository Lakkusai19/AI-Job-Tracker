import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ stats }) {
  const data = {
    labels: ["Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        data: [
          stats.applied,
          stats.interview,
          stats.offer,
          stats.rejected,
        ],
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#F44336",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
        align: "center",

        labels: {
          boxWidth: 18,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
    },

    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  return (
    <div
      style={{
        width: "340px",
        height: "340px",
        margin: "0 auto",
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;