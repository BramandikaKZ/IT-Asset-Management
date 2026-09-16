function EmployeeForm( {
    formData,
    divisions,
    onChange,
    onSubmit,
    onCancel,
    editing
}) {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="card-title mb-4">{editing ? 'Edit Employee' : 'Add Employee'}</h5>

                <form onSubmit={onSubmit}>
                    <div className="row">

                        {/* Employee Code */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Employee Code</label>

                            <input
                                type="text"
                                className="form-control"
                                name="employee_code"
                                value={formData.employee_code}
                                onChange={onChange}
                                required
                            />
                        </div>

                        {/* Fullname */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Fullname</label>

                            <input
                                type="text"
                                className="form-control"
                                name="fullname"
                                value={formData.fullname}
                                onChange={onChange}
                                required
                            />
                        </div>

                        {/* Division */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Division</label>

                            <select
                                className="form-select"
                                name="division_id"
                                value={formData.division_id}
                                onChange={onChange}
                                required
                            >
                                <option value="">Select Division</option>
                                {divisions.map((division) => (
                                    <option 
                                        key={division.id} 
                                        value={division.id}
                                    >
                                        {division.division_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Position */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Position</label>

                            <input
                                type="text"
                                className="form-control"
                                name="position"
                                value={formData.position}
                                onChange={onChange}
                                required
                            />
                        </div>

                        {/* Status */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>

                            <select
                                className="form-select"
                                name="status"
                                value={formData.status}
                                onChange={onChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-2">
                        <button type="submit" className="btn btn-primary me-2">
                            {editing ? "Update Employee" : "Add Employee"}
                        </button>

                        {editing && (
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;