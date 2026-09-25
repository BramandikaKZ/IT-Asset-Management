import { QRCodeCanvas } from "qrcode.react";

function AssetPrintLabel({ asset }) {
    if (!asset) {
        return null;
    }

    const assetUrl = `${import.meta.env.VITE_PUBLIC_APP_URL}/assets/${asset.id}`;

    return (
        <div className="asset-print-label">
            <div className="asset-print-info">
                <div className="asset-print-title">
                    IT ASSET
                </div>

                <div className="asset-print-row">
                    <span>Asset Code</span>
                    <b>:</b>
                    <strong>{asset.asset_code}</strong>
                </div>

                <div className="asset-print-row">
                    <span>Asset Name</span>
                    <b>:</b>
                    <strong>{asset.asset_name}</strong>
                </div>

                <div className="asset-print-row">
                    <span>Brand</span>
                    <b>:</b>
                    <strong>{asset.brand_name || "-"}</strong>
                </div>

                <div className="asset-print-row">
                    <span>Model</span>
                    <b>:</b>
                    <strong>{asset.model || "-"}</strong>
                </div>

                <div className="asset-print-row">
                    <span>User / Employee</span>
                    <b>:</b>
                    <strong>
                        {asset.fullname || "-"}
                    </strong>
                </div>

                <div className="asset-print-row">
                    <span>Position</span>
                    <b>:</b>
                    <strong>{asset.position || "-"}</strong>
                </div>

                <div className="asset-print-row">
                    <span>Location</span>
                    <b>:</b>
                    <strong>{asset.location_name || "-"}</strong>
                </div>

                <div className="asset-print-row">
                    <span>Receive Date</span>
                    <b>:</b>
                    <strong>
                        {asset.receive_date
                            ? asset.receive_date.split("T")[0]
                            : "-"}
                    </strong>
                </div>
            </div>

            <div className="asset-print-qr">
                <QRCodeCanvas
                    value={assetUrl}
                    size={130}
                />
            </div>
        </div>
    );
}

export default AssetPrintLabel;