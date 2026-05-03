
import { Location, Manager } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";
import LocationSelect from "./_components/LocationSelect";
import { cookies } from "next/headers";
import axios from "axios";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";

const LocationsPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;

    const headers = { Authorization: `Bearer ${token}` };

    let { data } = await axios.get<Location[]>(
        `${API_URL}/locations`,
        { headers }
    );

    const { data: managers } = await axios.get<Manager[]>(
        `${API_URL}/managers`,
        { headers }
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
            <div className="w-full flex flex-col items-center h-[90vh] p-6 gap-4">
                <div className="w-1/2">
                    <LocationSelect locations={data} store={resolvedSearchParams.store} />
                </div>
                <div className="w-1/2">
                    <LocationCard store={resolvedSearchParams.store} />
                </div>
                <FormNewLocation managers={managers} locations={data} />
            </div>
        </div>
    );
};

export default LocationsPage;
