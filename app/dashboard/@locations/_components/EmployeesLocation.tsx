import { Employee } from "@/entities";
import axios from "axios";
import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
    if (!store) return null;

    const token = (await cookies()).get(TOKEN_NAME)?.value;
    const { data } = await axios.get<Employee[]>(`${API_URL}/employees/location/${store}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!data || data.length === 0) {
        return (
            <div className="w-full text-center text-gray-400 py-10">
                No hay empleados en esta tienda
            </div>
        );
    }

    return (
        <>
            {data.map((employee) => (
                <div
                    key={employee.employeeId}
                    className="p-5 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <p className="text-gray-700 mb-3">
                        Nombre: <b className="text-gray-900">{employee.employeeName} {employee.employeeLastName}</b>
                    </p>
                    <p className="text-gray-700 text-sm">
                        Email: <b className="text-gray-900">{employee.employeeEmail}</b>
                    </p>
                    <p className="text-gray-700 text-sm">
                        Teléfono: <b className="text-gray-900">{employee.employeePhoneNumber}</b>
                    </p>
                </div>
            ))}
        </>
    );
}
