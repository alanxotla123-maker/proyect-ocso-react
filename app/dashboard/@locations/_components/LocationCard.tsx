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
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 pt-4">
                <p className="text-lg font-bold text-gray-900">{data.locationName}</p>
            </div>
            <div className="px-5 pb-3 pt-1">
                <p className="text-gray-700">Manager:<b className="text-gray-900">{data.manager?.managerFullName}</b></p>
            </div>
            <div className="px-5 pb-3 pt-1">
                <p className="text-gray-700">Dirección:<b className="text-gray-900">{data.locationAddress}</b></p>
            </div>
            <iframe
                width="100%"
                height="250"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.7
                9275968515027!2d-103.30531999053373!3d20.67122387542
                13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f321d68c7a093%3A0x341811030f205748!2sPlaza%20Del%20Sol!5e0!3m2!1ses!2smx!4v1752235344111
                !5m2!1ses!2smx=${data.locationLatLng[0]},${data.locationLatLng[1]}`}

                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </div>
    )
}