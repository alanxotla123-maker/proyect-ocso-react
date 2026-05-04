"use server";

import { API_URL } from "@/constants";
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Location } from "@/entities";

async function updateLocation(store: string, formData: FormData) {
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
        const response = await fetch(`${API_URL}/locations/${store}`, {
            method: "PATCH",
            body: JSON.stringify(location),
            headers: {
                ...authHeader.headers,
                "Content-Type": "application/json"
            }
        });
        
        const data = await response.json();

        // En PATCH, usualmente el estado es 200 (OK), no 201 (Created)
        if (response.ok) {
            revalidatePath("/dashboard", "page");
            redirect(`/dashboard/?store=${store}`);
        } else {
            throw new Error(data.message || "Error al actualizar la ubicación");
        }

    } catch (error: any) {
        // MUY IMPORTANTE: Next.js usa errores internos para hacer la redirección. 
        // Si no lanzas este error de vuelta, la página nunca se recargará.
        if (error.message === "NEXT_REDIRECT") throw error;
        
        console.error("Error:", error);
        throw new Error(error.message || "Error al actualizar la ubicación");
    }
}

export default updateLocation;