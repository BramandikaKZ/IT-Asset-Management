import { QRCodeCanvas } from "qrcode.react";

function AssetQRCode({ asset }) {
    if (!asset) {
        return null;
    }
    
    return (
        <div className="text-center">
            <QRCodeCanvas
                value={`http://192.168.1.1:5173/assets/${asset.id}`}
                size={200}
            />

            <div className="mt-2">
                <strong>{asset.asset_code}</strong>
            </div>
        </div>
    );
}

export default AssetQRCode;