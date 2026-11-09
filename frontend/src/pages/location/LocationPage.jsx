
import { useEffect, useState } from "react";

import {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation
} from "../../services/locationService";

import LocationForm from "../../components/location/LocationForm";

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ location_name: "" });
    const [editingLocation, setEditingLocation] = useState(null);

    // Mengambil data lokasi
    const loadLocations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getLocations();

            if (response.success) {
                setLocations(response.data);
            } else {
                setError(response.message || "Gagal mengambil data lokasi");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Terjadi kesalahan saat mengambil data lokasi"
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
    const handleEdit = (location) => {
        setFormData({
            location_name: location.location_name,
        });

        setEditingLocation(location);
        setShowForm(true);
    };

    // Menyimpan lokasi
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            if (editingLocation) {
                await updateLocation(editingLocation.id, formData);
            } else {
                await createLocation(formData);
            }

            setFormData({ location_name: "" });
            setEditingLocation(null);
            setShowForm(false);

            await loadLocations();
        } catch (err) {
            console.error("SAVE LOCATION ERROR:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Gagal menyimpan lokasi"
            );
        }
    };

    // Membatalkan form
    const handleCancel = async () => {
        setFormData({ location_name: "" });
        setEditingLocation(null);
        setShowForm(false);
        await loadLocations();
    };

    // Mengambil data saat halaman dibuka
    useEffect(() => {
        loadLocations();
    }, []);

    // Menghapus lokasi
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this location?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteLocation(id);
            await loadLocations();
        } catch (err) {
            console.error("DELETE LOCATION ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Gagal menghapus lokasi"
            );
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Location Management</h3>

                {!showForm && (
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditingLocation(null);
                            setFormData({ location_name: "" });
                            setShowForm(true);
                        }}
                    >
                        Add Location
                    </button>
                )}
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {showForm && (
                <LocationForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    editing={Boolean(editingLocation)}
                />
            )}

            <div className="card">
                <div className="card-body">
                    {loading ? (
                        <p className="mb-0">Loading location...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: "80px" }}>No</th>
                                        <th>Location Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {locations.length > 0 ? (
                                        locations.map((location, index) => (
                                            <tr key={location.id}>
                                                <td>{index + 1}</td>
                                                <td>{location.location_name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => handleEdit(location)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(location.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                Belum ada data lokasi
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

export default LocationPage;
