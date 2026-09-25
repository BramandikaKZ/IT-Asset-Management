import { useEffect } from "react";
import AssetPrintLabel from "./AssetPrintLabel";

function AssetPrintPage({ assets, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 300);

        const handleAfterPrint = () => {
            onClose();
        };

        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            clearTimeout(timer);
            window.addEventListener("afterprint", handleAfterPrint);
        }    
    },[onClose]);

    if (!assets || assets.length === 0) {
        return null;
    }

    return (
        <div className="asset-print-sheet">
            {assets.map((asset) => (
                <div className="asset-print-item" key={asset.id}>
                    <AssetPrintLabel asset={asset}/>
                </div>
            ))}
        </div>
    );
}

export default AssetPrintPage;