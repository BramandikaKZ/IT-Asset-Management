import { useEffect, useState } from "react";

import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeForm from "../../components/employee/EmployeeForm";
import { 
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";

import { getDivisions } from "../../services/divisionService";

function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        employee_code: "",
        fullname: "",
        division_id: "",
        position: "",
        status: "",
    });

    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getEmployees();

            if (response.success) {
                setEmployees(response.data);
            } else {
                setError(response.message || "Failed to load employees.");
            }
        } catch (error) {
            console.error("GET EMPLOYEES ERROR:", error);

            setError(error.response?.data?.message || "Failed to load employees.");
        } finally {
            setLoading(false);
        }
    };

    const loadDivisions = async () => {
        try {
            const response = await getDivisions();

            if (response.success) {
                setDivisions(response.data);
            } else {
                setError(response.message || "Failed to load divisions.");
            }
        } catch (error) {
            console.error("GET DIVISIONS ERROR:", error);
            setError(error.response?.data?.message || "Failed to load divisions.");
        }
    };

    useEffect(() => {
        loadEmployees();
        loadDivisions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setFormData({
            employee_code: employee.employee_code,
            fullname: employee.fullname,
            division_id: employee.division_id,
            position: employee.position,
            status: employee.status,
        });
        setShowForm(true);
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");

        if (!confirmed) return;

        try {
            await deleteEmployee(id);
            await loadEmployees();
        } catch (error) {
            console.error("DELETE EMPLOYEE ERROR:", error);
            setError(error.response?.data?.message || "Failed to delete employee");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingEmployee) {
                await updateEmployee(editingEmployee.id, {
                    ...formData,
                    division_id: Number(formData.division_id)
                });
            } else {
                await createEmployee({
                    ...formData,
                    division_id: Number(formData.division_id)
                });
            }

            setFormData({
                employee_code: "",
                fullname: "",
                division_id: "",
                position: "",
                status: "",
            });

            setEditingEmployee(null);
            setShowForm(false);

        } catch (error) {
            console.error(editingEmployee ? "UPDATE EMPLOYEE ERROR:" : "CREATE EMPLOYEE ERROR:", error);
            setError(error.response?.data?.message || "Failed to save employee");
        }
    };

    console.log("DIVISIONS:", divisions);

    const filteredEmployees = employees.filter((employee) => {
        const keyword = search.toLowerCase();

        return ( 
            employee.employee_code.toLowerCase().includes(keyword) ||
            employee.fullname.toLowerCase().includes(keyword) ||
            employee.division_name.toLowerCase().includes(keyword) ||
            employee.position.toLowerCase().includes(keyword)
        );
    });

    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">Employee Management</h3>
                    <p className="text-muted mb-0">Manage employee data</p>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!showForm && (
                <>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => setShowForm(true)}
                    >
                        Add Employee
                    </button>
                </>
            )}

            {showForm && (
                <EmployeeForm
                    formData={formData}
                    divisions={divisions}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingEmployee(null);
                    }}
                    editing={Boolean(editingEmployee)}
                />
            )}

            <EmployeeTable
                employees={filteredEmployees}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default EmployeePage;