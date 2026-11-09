
const LocationForm = ({
    formData,
    onChange,
    onSubmit,
    onCancel,
    editing
}) => {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="mb-0">
                    {editing ? "Edit Location" : "Add New Location"}
                </h5>
            </div>

            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Location Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="location_name"
                            value={formData.location_name}
                            onChange={onChange}
                            placeholder="Enter location name"
                            required
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {editing ? "Update Location" : "Save Location"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LocationForm;
