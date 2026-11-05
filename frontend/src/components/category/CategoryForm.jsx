function CategoryForm({
    formData,
    onChange,
    onSubmit,
    onCancel,
    editing
}) {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="card-title mb-4">
                    {editing ? "Edit Category" : "Add Category"}
                </h5>

                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Category Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="category_name"
                                value={formData.category_name}
                                onChange={onChange}
                                placeholder="Enter category name"
                                maxLength={100}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            {editing ? "Update Category" : "Add Category"}
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
}

export default CategoryForm;