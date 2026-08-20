import { useEffect, useState } from "react";
import assetService from "../../services/assetService";
import AssetTable from "../../components/assets/AssetTable";
import AssetForm from "../../components/assets/AssetForm";

function AssetPage() {
    const [assets, setAssets] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        loadAssets();
    }, []);

    async function loadAssets() {
        try {
            const result = await assetService.getAllAssets();
            setAssets(result.data);

            console.log("Response API: ");
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log("Assets State:");
        console.log(assets);
    }, [assets]);

    const filteredAssets = assets.filter((asset) =>
        asset.asset_name.toLowerCase().includes(search.toLowerCase()) ||
        asset.asset_code.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h1>Asset Management</h1>
            <button
                className="btn btn-primary"
                onClick={() => { 
                    setSelectedAsset(null);
                    setShowForm(true);
                }}
            >
                + Tambah Asset
            </button>
            <input 
                type="text"
                className="form-control mb-3"
                placeholder="Cari asset..."
                value={search}
                onChange={(e) =>  {
                    setSearch(e.target.value);
                    setCurrentPage(1); // Reset halaman ke 1 saat melakukan pencarian
                }}
            />
            <AssetTable
                assets={assets}
                onEdit={(asset) => {
                    console.log("ASSET YANG DIPILIH:", asset);

                    setSelectedAsset(asset);
                    setShowForm(true);
                }}
            />

            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <button 
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Halaman {currentPage} dari {totalPages}</span>
                <button 
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {showForm && (
                <AssetForm 
                asset={selectedAsset}
                onClose={() => {
                    setShowForm(false)
                    setSelectedAsset(null);
                }} 
                onSuccess={loadAssets}
            />  
            )}
        </div>
    );
}

export default AssetPage;