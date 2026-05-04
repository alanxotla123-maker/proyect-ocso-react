import { Manager, Location } from "@/entities";
import { AuthHeaders } from "@/helpers/authHeaders";
import { API_URL } from "@/constants";
import FormNewLocationClient from "./FormNewLocationClient";

export default async function FormNewLocation({ store }: { store: string | string[] | undefined }) {
    if (store) return null;

    const authHeader = await AuthHeaders();

    const responseManagers = await fetch(`${API_URL}/managers`, {
        headers: authHeader.headers,
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const managers: Manager[] = await responseManagers.json();

    const responseLocations = await fetch(`${API_URL}/locations`, {
        headers: authHeader.headers,
        next: {
            tags: ["dashboard:locations"]
        }
    });
    const locations: Location[] = await responseLocations.json();

    return <FormNewLocationClient managers={managers} locations={locations} />;
}