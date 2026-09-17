function EmployeeTable( {
    employees,
    loading,
    onEdit,
    onDelete,
}) {
    if (loading) {
        return (
            <div className="text-center py-4">
                Loading employees...
            </div>
        );
    }

    if (!employees || employees.length === 0) {
        return (
            <div className="alert alert-info">
                No employees found.
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <tread className="table-light">
                    <tr>
                        <th>No</th>
                        <th>Employee Code</th>
                        <th>Fullname</th>
                        <th>Division</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>                           
                    </tr>
                </tread>

                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.employee_code}</td>
                            <td>{employee.fullname}</td>
                            <td>{employee.division_name}</td>
                            <td>{employee.position}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        employee.status === "Active"
                                            ? "bg-success"
                                            : "bg-danger"
                                    }`}
                                >
                                    {employee.status}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onEdit(employee)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;