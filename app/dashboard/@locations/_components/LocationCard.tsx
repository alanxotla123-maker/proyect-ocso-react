import { Location } from "@/entities"
import axios from "axios"
import { cookies } from "next/headers";
import { API_URL, TOKEN_NAME } from "@/constants";
import Link from "next/link";

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
    if (!store || store === "0") {
        return null;
    }

    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;
    const { data } = await axios.get<Location>(`${API_URL}/locations/${store}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return (
        <div className="rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="px-4 pt-4">
                <p className="w-full">Tienda: <b>{data.locationName}</b></p>
            </div>
            <div className="px-4 pb-4 pt-2">
                <p className="w-full">Manager <Link href="/dashboard/managers"><b>{data.manager?.managerFullName}</b></Link></p>
            </div>
        </div>
    )
}