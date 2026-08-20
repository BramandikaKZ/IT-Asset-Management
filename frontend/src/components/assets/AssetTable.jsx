function AssetTable({ assets, onEdit }) {
    console.log ("Props dari AssetPage:");
    console.log(assets);
    const rows = assets.map((asset, index) => (
        <tr key={asset.id}>
            <td>{index + 1}</td>
            <td>{asset.asset_code}</td>
            <td>{asset.asset_name}</td>
            <td>{asset.category_name}</td>
            <td>{asset.status_name}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(asset)}
                >
                    Edit
                </button>
                <button className="btn btn-danger btn-sm">
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <div className="card shadow-sm">

            <div className="card-header">
                <h5 className="mb-0">Asset List</h5>
            </div>

            <div className="card-body">
                
                <table className="table table-hover table-bordered align-middle">

                    <thead className="table-dark">
                        <tr>
                            <th>No</th>
                            <th>Asset Code</th>
                            <th>Asset Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th width="180">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {assets.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Belum ada data asset IT yang tersedia.
                                </td>
                            </tr>
                        ) : rows}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssetTable;