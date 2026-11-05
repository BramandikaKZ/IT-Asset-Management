import { useEffect, useState } from "react";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";

import CategoryForm from "../../components/category/CategoryForm";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ category_name: "" });
    const [editingCategory, setEditingCategory] = useState(null);

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getCategories();

            if (response.success) {
                setCategories(response.data);
            } else {
                setError(response.message || "Gagal mengambil data category");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Terjadi kesalahan saat mengambil data category"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
    const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = (category) => {
        setFormData({
            category_name: category.category_name,
        });
    
        setEditingCategory(category);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            if (editingCategory) {
                await updateCategory(editingCategory.id, formData);
            } else {
                await createCategory(formData);
            }

            setFormData({
                category_name: "",
            });

            setShowForm(false);
            await loadCategories();
        } catch (err) {
            console.error("CREATE CATEGORY ERROR:", err);
        
            setError(
                err.response?.data?.message ||
                err.message ||
                "Gagal menyimpan category"
            );
        }
    };

    const handleCancel = async () => {
        setFormData({
            category_name: "",
        });

        setEditingCategory(null);
        setShowForm(false);
        await loadCategories();
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteCategory(id);
            await loadCategories();
        } catch (err) {
            console.error("DELETE CATEGORY ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Gagal menghapus category"
            );
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Category Management</h3>

                {!showForm && (
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                    >
                        Add Category
                    </button>
                )}
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {showForm && (
                <CategoryForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    editing={false}
                />
            )}

            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <p className="mb-0">Loading category...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: "80px" }}>No</th>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <tr key={category.id}>
                                                <td>{index + 1}</td>
                                                <td>{category.category_name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => handleEdit(category)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(category.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="text-center"
                                            >
                                                Belum ada data category
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

export default CategoryPage;