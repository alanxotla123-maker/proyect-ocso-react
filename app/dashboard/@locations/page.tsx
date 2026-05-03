
import { Location } from "@/entities";
import { TOKEN_NAME } from "@/constants";
import LocationSelect from "./_components/LocationSelect";
import { cookies } from "next/headers"; // Asumiendo que usas Next.js para cookies()
import axios from "axios";
import LocationCard from "./_components/LocationCard";

const LocationsPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;

    let { data } = await axios.get<Location[]>(
        "http://127.0.0.1:4000/locations",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    data = [
        {
            locationId: 0,
            locationName: "Ninguna",
            locationAddress: "",
            locationLatLng: [0, 0]
        },
        ...data
    ]
    data.sort();
    return (
        <div className="w-8/12">
            <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
                <div className="w-1/2 my-10">
                    <LocationSelect locations={data} store={resolvedSearchParams.store} />

                </div>
                <div className="w-full">
                    <LocationCard store={resolvedSearchParams.store} />
                </div>
            </div>
        </div>
    );
};

export default LocationsPage;