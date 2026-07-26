import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({ stats }) {
  const data = {
    labels: ["Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        label: "Applications",
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
      },
    ],
  };

  return <Bar data={data} />;
}

export default BarChart;