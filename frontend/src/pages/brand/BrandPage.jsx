
import { useEffect, useState } from "react";

import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
} from "../../services/brandService";

import BrandForm from "../../components/brand/BrandForm";

const BrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ brand_name: "" });
    const [editingBrand, setEditingBrand] = useState(null);

    // Mengambil data brand
    const loadBrands = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getBrands();

            if (response.success) {
                setBrands(response.data);
            } else {
                setError(response.message || "Gagal mengambil data brand");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Terjadi kesalahan saat mengambil data brand"
            );
        } finally {
            setLoading(false);
        }
    };

    // Mengubah input form
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Membuka form edit
    const handleEdit = (brand) => {
        setFormData({
            brand_name: brand.brand_name,
        });

        setEditingBrand(brand);
        setShowForm(true);
    };

    // Menyimpan brand
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            if (editingBrand) {
                await updateBrand(editingBrand.id, formData);
            } else {
                await createBrand(formData);
            }

            setFormData({
                brand_name: "",
            });

            setEditingBrand(null);
            setShowForm(false);

            await loadBrands();
        } catch (err) {
            console.error("SAVE BRAND ERROR:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Gagal menyimpan brand"
            );
        }
    };

    // Membatalkan form
    const handleCancel = async () => {
        setFormData({
            brand_name: "",
        });

        setEditingBrand(null);
        setShowForm(false);
        await loadBrands();
    };

    // Mengambil data saat halaman dibuka
    useEffect(() => {
        loadBrands();
    }, []);

    // Menghapus brand
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this brand?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteBrand(id);
            await loadBrands();
        } catch (err) {
            console.error("DELETE BRAND ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Gagal menghapus brand"
            );
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Brand Management</h3>

                {!showForm && (
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditingBrand(null);
                            setFormData({ brand_name: "" });
                            setShowForm(true);
                        }}
                    >
                        Add Brand
                    </button>
                )}
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {showForm && (
                <BrandForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    editing={Boolean(editingBrand)}
                />
            )}

            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <p className="mb-0">Loading brand...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: "80px" }}>No</th>
                                        <th>Brand Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {brands.length > 0 ? (
                                        brands.map((brand, index) => (
                                            <tr key={brand.id}>
                                                <td>{index + 1}</td>
                                                <td>{brand.brand_name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => handleEdit(brand)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(brand.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                Belum ada data brand
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
