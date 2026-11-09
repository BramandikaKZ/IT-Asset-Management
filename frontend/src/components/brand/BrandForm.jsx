
const BrandForm = ({
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
                    {editing ? "Edit Brand" : "Add New Brand"}
                </h5>
            </div>

            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Brand Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="brand_name"
                            value={formData.brand_name}
                            onChange={onChange}
                            placeholder="Enter brand name"
                            required
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {editing ? "Update Brand" : "Save Brand"}
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

export default BrandForm;
