import { useEffect, useState } from "react";
import assetService from "../../services/assetService";
import AssetTable from "../../components/assets/AssetTable";
import AssetForm from "../../components/assets/AssetForm";
import categoryService from "../../services/categoryService";
import locationService from "../../services/locationService";

function AssetPage() {
    const [assets, setAssets] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [locations, setLocations] = useState([]);
    const [locationFilter, setLocationFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const itemsPerPage = 10;

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

    async function loadCategories() {
        try {
            const result = await categoryService.getAllCategories();
            setCategories(result.data || []);
        } catch (error) {
            console.error("Gagal mengambil category",error);
        }
    }

    async function loadLocations() {
        try {
            const result = await locationService.getAllLocations();
            setLocations(result.data || []);
        } catch (error) {
            console.error("Gagal mengambil location",error);
        }
    }

    useEffect(() => {
        loadAssets();
        loadCategories();
        loadLocations();
    }, []);

    useEffect(() => {
        console.log("Assets State:");
        console.log(assets);
    }, [assets]);

    const filteredAssets = assets.filter((asset) => {
        const keyword =search.toLowerCase();

        const matchesSearch =
        asset.asset_name.toLowerCase().includes(keyword) ||
        asset.asset_code.toLowerCase().includes(keyword) ||
        asset.model?.toLowerCase().includes(keyword) ||
        asset.serial_number?.toLowerCase().includes(keyword)

        const matchesStatus = statusFilter === "" || String(asset.status_id) === statusFilter;
        const matchesCategory = categoryFilter === "" || String(asset.category_id) === categoryFilter;
        const matchesLocation = locationFilter === "" || String(asset.location_id) === locationFilter;

        return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

    const handleDelete = async (asset) => {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus asset ${asset.asset_name}?`);
        if (!confirmDelete) {
            return;
        }

        try {
            console.log("DELETE ASSET:", asset);
            const result = await assetService.deleteAsset(asset.id);
            console.log("DELETE ASSET:", result);
            alert("Asset berhasil dihapus.");
            await loadAssets();

        } catch (error) {
            console.error("Gagal menghapus asset:", error);
            alert(
                error.response?.data?.message || "Gagal menghapus asset."
            );
        }
    };

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

            <div className="row g-2 mb-3">
                {/* Search*/}
                <div className="col-md-4">
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
                </div>

                {/* Status */}
                <div className="col-md-2">        
                    <select
                        className="form-select mb-3"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">-- Semua Status --</option>
                        <option value="1">Aktif</option>
                        <option value="2">Perbaikan</option>
                        <option value="3">Rusak</option>
                        <option value="4">Belum Digunakan</option>
                    </select>
                </div>

                {/* Category */}
                <div className="col-md-2">
                    <select
                        className="form-select mb-3"
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">-- Semua Category --</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Location */}
                <div className="col-md-2">
                    <select
                        className="form-select mb-3"
                        value={locationFilter}
                        onChange={(e) => {
                            setLocationFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">-- Semua Location --</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setSearch("");
                            setStatusFilter("");
                            setCategoryFilter("");
                            setLocationFilter("");
                            setCurrentPage(1);
                        }}
                    >
                        Reset Filter
                    </button>
                </div>
            </div>

            <AssetTable
                assets={currentAssets}
                onEdit={(asset) => {
                    console.log("ASSET YANG DIPILIH:", asset);

                    setSelectedAsset(asset);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />
            {filteredAssets.length > 0 && (
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
            )}

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