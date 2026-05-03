"use server";

import axios from "axios";
import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
        await axios.delete(`${API_URL}/locations/${storeId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error: any) {
        console.error("Error deleting location:", error.response?.data);
        throw new Error(error.response?.data?.message || "Error al eliminar la ubicación");
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}