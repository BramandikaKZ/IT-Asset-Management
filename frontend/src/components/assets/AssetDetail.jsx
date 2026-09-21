function AssetDetail({ asset, onClose, onEdit}) {
    if (!asset) {
        return null;
    }

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Asset Detail</h5>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={() => onEdit(asset)}
                    >
                        Edit Asset
                    </button>    

                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={onClose}
                    >
                        Tutup
                    </button>
                </div>
            </div>

            <div className="card-body">
                <div className="row">

                    <div className="col-md-6 mb-3">
                        <strong>Asset Code</strong>
                        <div>{asset.asset_code}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Asset Name</strong>
                        <div>{asset.asset_name}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Category</strong>
                        <div>{asset.category_name}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Brand</strong>
                        <div>{asset.brand_name}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Model</strong>
                        <div>{asset.model || "-"}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Serial Number</strong>
                        <div>{asset.serial_number || "-"}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Status</strong>
                        <div>
                            <span
                                className={`badge ${
                                    asset.status_name === "Aktif"
                                    ? "bg-success"
                                    : asset.status_name === "Perbaikan"
                                    ? "bg-danger"
                                    : "bg-secondary"
                                }`}
                            >
                            {asset.status_name}
                            </span>
                        </div>
                    </div>       

                    <div className="col-md-6 mb-3">
                        <strong>Location</strong>
                        <div>{asset.location_name}</div>
                    </div>     

                    <div className="col-md-6 mb-3">
                        <strong>User/Employee</strong>
                        <div>{asset.employee_code}-{asset.fullname}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Receive Date</strong>
                        <div>{asset.receive_date ? asset.receive_date.split("T")[0] : "-"}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <strong>Note</strong>
                        <div>{asset.note || "-"}</div>
                    </div>                                                            
                </div>
            </div>
        </div>
    );
}

export default AssetDetail;