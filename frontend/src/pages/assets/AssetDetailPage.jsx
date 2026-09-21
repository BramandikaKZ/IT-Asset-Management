import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import assetService from "../../services/assetService";
import AssetDetail from "../../components/assets/AssetDetail";

function AssetDetailPage() {
    const { id } = useParams();

    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAsset();
    }, [id]);

    async function loadAsset() {
        try {
            setLoading(true);
            setError("");

            const result = await assetService.getPublicAssetById(id);

            if (result.success) {
                setAsset(result.data);
            } else {
                setError(result.message || "Asset tidak ditemukan.");
            }
        } catch (error) {
            console.error("GET ASSET DETAIL ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Gagal mengambil data asset."
            );
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    Loading asset...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <AssetDetail
                asset={asset}
                readOnly={true}
            />    
        </div>
    );
}

export default AssetDetailPage;