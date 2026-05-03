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
                    className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    {employee.employeePhoto ? (
                        <img
                            src={employee.employeePhoto}
                            alt={employee.employeeName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-lg">
                            {employee.employeeName.charAt(0)}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                            {employee.employeeName} {employee.employeeLastName}
                        </span>
                        <span className="text-sm text-gray-500">{employee.employeeEmail}</span>
                        <span className="text-sm text-gray-400">{employee.employeePhoneNumber}</span>
                    </div>
                </div>
            ))}
        </>
    );
}
