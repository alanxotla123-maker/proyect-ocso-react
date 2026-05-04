import { ReactNode } from "react"
import ManagerCards from "./_components/ManagerCard"
import { AuthHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Manager } from "@/entities";

export default async function LayoutManager({ children }: {
    children: ReactNode
}) {
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

    const data: Manager[] = await response.json();

    return (
        <div className="w-full flex justify-center">
            <div className="w-4/12 h-[90vh] overflow-y-auto overflow-hidden">
                <ManagerCards managers={data} />
            </div>
            <div className="w-8/12">
                {children}
            </div>
        </div>
    )
}
