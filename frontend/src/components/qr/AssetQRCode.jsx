import { QRCodeCanvas } from "qrcode.react";

function AssetQRCode({ asset }) {
    if (!asset) {
        return null;
    }
    
    return (
        <div className="text-center">
            <QRCodeCanvas
                value={`${import.meta.env.VITE_PUBLIC_APP_URL}/assets/${asset.id}`}
                size={200}
            />

            <div className="mt-2">
                <strong>{asset.asset_code}</strong>
            </div>
        </div>
    );
}

export default AssetQRCode;