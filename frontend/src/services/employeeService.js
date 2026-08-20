import api from "./api";

const employeeService = {
    
    async getAllEmployees() {
        const response = await api.get("/employees");
        return response.data;
    }

};

export default employeeService;