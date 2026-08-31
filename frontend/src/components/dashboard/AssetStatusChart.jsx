import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AssetStatusChart({ assetsByStatus }) {
    const chartData = {
        labels: assetsByStatus.map((status) => status.status_name),
        datasets: [
            {
                label: "Jumlah Asset",
                data: assetsByStatus.map((status) => status.total)
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="mb-3">Assets Berdasarkan Status</h5>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default AssetStatusChart;