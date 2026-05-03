
import { Location, Manager } from "@/entities";
import { API_URL } from "@/constants";
import LocationSelect from "./_components/LocationSelect";
import axios from "axios";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { AuthHeaders } from "@/helpers/authHeaders";

const LocationsPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;

    const authHeader = await AuthHeaders();

    let { data } = await axios.get<Location[]>(
        `${API_URL}/locations`,
        authHeader
    );

    const { data: managers } = await axios.get<Manager[]>(
        `${API_URL}/managers`,
        authHeader
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
                {!resolvedSearchParams.store ? (
                    <div className="w-6/12">
                        <FormNewLocation managers={managers} locations={data} />
                    </div>
                ) : (
                    <DeleteLocationButton store={resolvedSearchParams.store} />
                )}
            </div>
        </div>
    );
};

export default LocationsPage;
