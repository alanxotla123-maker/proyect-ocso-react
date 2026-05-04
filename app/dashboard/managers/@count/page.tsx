import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";

export default async function CountManagersPage() {
    const authHeader = await AuthHeaders()

    const response = await fetch(`${API_URL}/managers`, {
        method: "GET",
        headers: {
            ...authHeader.headers
        },
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const managers: Manager[] = await response.json();
    const countNoStore = managers.filter((manager: Manager) => !manager.location).length;
    let max = 0;
    let salary = 0;

    managers.forEach((manager: Manager) => {
        if (manager.managerSalary > max) max = manager.managerSalary;
        salary += manager.managerSalary;
    });

    return (
        <div className="flex justify-center mt-4">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 py-6 px-10 text-center flex flex-col gap-1 text-gray-800 font-medium w-auto min-w-[300px]">
                <p className="text-base">Hay {managers.length} manager{managers.length !== 1 ? "s" : ""}</p>
                <p className="text-base">Hay {countNoStore} sin tienda</p>
                <p className="text-base">El salario máximo es {max}</p>
                <p className="text-base">El salario promedio es {salary / managers.length}</p>
            </div>
        </div>
    )
}