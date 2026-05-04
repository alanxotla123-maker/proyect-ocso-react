"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthHeaders } from "@/helpers/authHeaders";

export default async function deleteLocation(formData: FormData) {
    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;
    const storeId = formData.get("storeId");

    if (!token) {
        throw new Error("No se encontró el token de autenticación");
    }
    if (!storeId) {
        throw new Error("No se encontró el id de la tienda");
    }
    try {
        const authHeader = await AuthHeaders();
        const response = await fetch(`${API_URL}/locations/${storeId}`, {
            method: "DELETE",
            headers: authHeader.headers
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error deleting location:", errorData);
            throw new Error(errorData.message || "Error al eliminar la ubicación");
        }
    } catch (error: any) {
        throw new Error(error.message || "Error de conexión");
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}