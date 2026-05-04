"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateLocation(locationId: number, formData: FormData) {
    const location: any = {
        locationName: formData.get("locationName"),
        locationAddress: formData.get("locationAddress"),
        locationLatLng: [
            Number(formData.get("locationLat") || 0),
            Number(formData.get("locationLng") || 0),
        ],
    };

    const manager = formData.get("manager");
    if (manager) {
        location.manager = manager;
    }

    const authHeader = await AuthHeaders();

    try {
        const response = await fetch(`${API_URL}/locations/${locationId}`, {
            method: "PATCH",
            body: JSON.stringify(location),
            headers: {
                ...authHeader.headers,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al actualizar la ubicación");
        }

    } catch (error: any) {
        if (error.message === "NEXT_REDIRECT") throw error;
        console.error("Error updating location:", error);
        throw new Error(error.message || "Error al actualizar la ubicación");
    }

    revalidatePath("/dashboard", "page");
}

export default updateLocation;
