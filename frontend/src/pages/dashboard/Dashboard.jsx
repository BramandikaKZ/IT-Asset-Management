import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

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
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="text-muted">Total Assets</h6>

                            <h2 className="mb-0">{loading ? "..." : totalAssets}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {assetsByStatus.map((status) => (
                <div className="col-12 col-md-4 mb-3" key={status.status_id}>
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="text-muted">{status.status_name}</h6>
                            <h2 className="mb-0">{loading ? "..." : status.total}</h2>
                        </div>
                    </div>
                </div>
            ))}

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="mb-3">Assets Berdasarkan Category</h5>

                    <div className="row">
                        {assetsByCategory.map((category) => (
                            <div className="col-12 col-sm-6col-md-3 mb-3" key={category.category_id}>
                                <div className="card border h-100">
                                    <div className="card-body">
                                        <h6 className="text-muted">{category.category_name}</h6>
                                        <h2 className="mb-0">{loading ? "..." : category.total}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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