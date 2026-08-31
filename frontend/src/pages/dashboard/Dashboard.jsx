import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";
import StatCard from "../../components/dashboard/StatCard";
import AssetStatusChart from "../../components/dashboard/AssetStatusChart";
import AssetCategoryChart from "../../components/dashboard/AssetCategoryChart";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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

function Dashboard() {
    const [totalAssets, setTotalAssets] = useState(0);
    const [loading, setLoading] = useState(true);
    const [assetsByStatus, setAssetsByStatus] = useState([]);
    const [assetsByCategory, setAssetsByCategory] = useState([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const totalResult = await dashboardService.getTotalAssets();
                const statusResult = await dashboardService.getAssetsByStatus();
                const categoryResult = await dashboardService.getAssetsByCategory();
                console.log("Total assets:", totalResult);
                console.log("Assets by status:", statusResult);
                console.log("Assets by category:", categoryResult);

                setTotalAssets(totalResult.data.total);
                setAssetsByStatus(statusResult.data);
                setAssetsByCategory(categoryResult.data);

            } catch (error) {
                console.error("Gagal mengambil total asset:", error);

            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="container-fluid">
            <h2 className="mb-3">Dashboard</h2>
            <hr />

            <div className="alert alert-primary">
                Selamat datang di <strong>IT Asset Management System</strong>.
            </div>

            {/*STATTISTIK*/}
            <StatCard
                title="Total Asset"
                value={totalAssets}
                loading={loading}
            />

            {assetsByStatus.map((status) => (
                <StatCard
                    key={status.status_id}
                    title={status.status_name}
                    value={status.total}
                    loading={loading}
                />
            ))}

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="mb-3">Assets Berdasarkan Category</h5>

                    <div className="row">
                        {assetsByCategory.map((category) => (
                            <StatCard
                                key={category.category_id}
                                title={category.category_name}
                                value={category.total}
                                loading={loading}
                                columnClass="col-12 col-sm-6 col-md-3"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <AssetStatusChart assetsByStatus={assetsByStatus} />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <AssetCategoryChart assetsByCategory={assetsByCategory} />
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5>Project Progress</h5>

                    <ul>
                        <li>Authentication:done</li>
                        <li>Dashboard:on going</li>
                        <li>Asset Management:on going</li>
                        <li>Employee Management:on going</li>
                        <li>Category Management:on going</li>
                        <li>Brand Management:on going</li>
                        <li>Location Management:on going</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;