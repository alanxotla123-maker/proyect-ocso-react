"use server"

import { API_URL } from "@/constants"
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function deleteManager(managerId: string, formData: FormData) {


    const authHeader = await AuthHeaders();
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "DELETE",
        headers: {
            ...authHeader.headers,
            "Content-Type": "application/json"
        },
    })
    revalidateTag("dashboard:managers", "page")

}