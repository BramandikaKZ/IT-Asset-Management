function Dashboard() {
    return (
        <div className="container-fluid">
            <h2 className="mb-3">Dashboard</h2>
            <hr />

            <div className="alert alert-primary">
                Selamat datang di <strong>IT Asset Management System</strong>.
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