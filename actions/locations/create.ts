"use server";

import axios from "axios";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/constants";

async function createLocation(formData: FormData) {
    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;
    if (!token) {
        throw new Error("No se encontro el token de autenticación");
    }
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

    console.log("Sending location:", location);
    try {
        await axios.post(`${API_URL}/locations`, {
            ...location
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    } catch (error: any) {
        console.error("Backend error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Error al crear la ubicación");
    }
}

export default createLocation