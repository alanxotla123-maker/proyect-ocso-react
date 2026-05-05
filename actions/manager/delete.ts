"use server"

import { API_URL } from "@/constants"
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteManager(managerId: string, formData: FormData) {


    const authHeader = await AuthHeaders();
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "DELETE",
        headers: {
            ...authHeader.headers,
            "Content-Type": "application/json"
        },
    })
    if (response.status == 200) {
        revalidateTag("dashboard:managers", "page")
        redirect("/dashboard/managers")
    }


}