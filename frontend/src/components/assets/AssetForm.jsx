import { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";
import brandService from "../../services/brandService";
import statusService from "../../services/statusService";
import locationService from "../../services/locationService";
import divisionService from "../../services/divisionService";
import employeeService from "../../services/employeeService";
import assetService from "../../services/assetService";

function AssetForm({ asset, onClose, onSuccess }) {

    const [formData, setFormData] = useState({
        asset_code: "",
        asset_name: "",
        category_id: "",
        brand_id: "",
        model: "",
        serial_number: "",
        status_id: "",
        location_id: "",
        employee_id: "",
        received_date: "",
        note: ""
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (asset) {
            setFormData({
                asset_code: asset.asset_code || "",
                asset_name: asset.asset_name || "",
                category_id: asset.category_id || "",
                brand_id: asset.brand_id || "",
                model: asset.model || "",
                serial_number: asset.serial_number || "",
                status_id: asset.status_id || "",
                location_id: asset.location_id || "",
                employee_id: asset.employee_id || "",
                receive_date: asset.receive_date 
                    ? asset.receive_date.split("T")[0]
                    :"",
                note: asset.note || ""
            });
        }

        const loadCategories = async () => {
            try {
                const result = await categoryService.getAllCategories();
                console.log("Categories:", result);
                setCategories(result.data || []);
            } catch (error) {
                console.error("Gagal mengambil categories:", error);
            }
        };

        const loadBrands = async () => {
            try {
                const result = await brandService.getAllBrands();
                console.log("Brands:", result);
                setBrands(result.data || []);
            } catch (error) {
                console.error("Gagal mengambil brands:", error);
            }
        };

        const loadStatuses = async () => {
            try {
                const result = await statusService.getAllStatuses();
                console.log("Statuses:", result);
                setStatuses(result.data || []);
            } catch (error) {
                console.error("Gagal mengambil statuses:", error);
            }
        };

        const loadLocations = async () => {
            try {
                const result = await locationService.getAllLocations();
                console.log("Locations:", result);
                setLocations(result.data || []);
            } catch (error) {
                console.error("Gagal mengambil locations:", error);
            }
        };

        const loadDivisions = async () => {
            try {
                const result = await divisionService.getAllDivisions();
                console.log("Divisions:", result);
                setDivisions(result.data || []);
            } catch (error) {
                console.error("Gagal mengambil divisions:", error);
            }
        };

        const loadEmployees = async () => {
            try {
                const result = await employeeService.getAllEmployees();
                console.log("Employees:", result);
                setEmployees(result.data || []);
            } catch (error) {
                console.error("Gagal mengambil employees:", error);
            }
        };

        loadCategories();
        loadBrands();
        loadStatuses();
        loadLocations();
        loadDivisions();
        loadEmployees();
    }, [asset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Data Yang Dikirim:", formData);
            const result = await assetService.createAsset(formData);
            console.log("Hasil create asset:", result);
            alert("Asset berhasil disimpan");
            await onSuccess(); // Call the onSuccess callback to refresh the asset list
            onClose();
        } catch (error) {
            console.error("Gagal menyimpan asset:", error);
            alert(
                error.response?.data?.message ||
                "Gagal menyimpan asset"
            );
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header">
            <h3> {asset ? "Edit Asset" : "Tambah Asset"} </h3>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* Asset Code */}
                    <div className="mb-3">
                        <label className="form-label">Asset Code</label>
                        <input
                            type="text"
                            className="form-control"
                            name="asset_code"
                            value={formData.asset_code}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Asset Name */}
                    <div className="mb-3">
                        <label className="form-label">Asset Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="asset_name"
                            value={formData.asset_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Model */}
                    <div className="mb-3">
                        <label className="form-label">Model</label>
                        <input
                            type="text"
                            className="form-control"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="Contoh: Asus All in One"
                        />
                    </div>

                    {/* Serial Number */}
                    <div className="mb-3">
                        <label className="form-label">Serial Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="serial_number"
                            value={formData.serial_number}
                            onChange={handleChange}
                            placeholder="Masukkan Serial Number"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Pilih Category--</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand */}
                    <div className="mb-3">
                        <label className="form-label">Brand</label>
                        <select
                            className="form-select"
                            name="brand_id"
                            value={formData.brand_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Pilih Brand--</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.brand_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            name="status_id"
                            value={formData.status_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Pilih Status--</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.status_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <select
                            className="form-select"
                            name="location_id"
                            value={formData.location_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Pilih Location--</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.location_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* User / Employee */}
                    <div className="mb-3">
                        <label className="form-label">User / Employee</label>
                        <select
                            className="form-select"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Pilih Employee--</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employee_code} - {employee.fullname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Receive Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="receive_date"
                            value={formData.receive_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Note</label>
                        <textarea
                            className="form-control"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Masukkan catatan tambahan"
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Simpan
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssetForm;