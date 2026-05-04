import { Location, Manager } from "@/entities";
import { API_URL } from "@/constants";
import LocationSelect from "./_components/LocationSelect";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { AuthHeaders } from "@/helpers/authHeaders";
import { UpdateLocation } from "./_components/UpdateLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";

const LocationsPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const authHeader = await AuthHeaders();

    const [resLocations, resManagers] = await Promise.all([
        fetch(`${API_URL}/locations`, {
            headers: authHeader.headers,
            next: { tags: ["dashboard:locations"] }
        }),
        fetch(`${API_URL}/managers`, {
            headers: authHeader.headers,
            next: { tags: ["dashboard:managers"] }
        })
    ]);

    let data: Location[] = await resLocations.json();
    const managers: Manager[] = await resManagers.json();

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
                        <FormNewLocation store={resolvedSearchParams.store} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <DeleteLocationButton store={resolvedSearchParams.store} />
                        <UpdateLocation>
                            <FormUpdateLocation 
                                store={resolvedSearchParams.store} 
                                managers={managers} 
                                locations={data} 
                            />
                        </UpdateLocation>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationsPage;
