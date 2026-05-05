"use server"

import { API_URL } from "@/constants"
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(managerId: string, formData: FormData) {

    let manager: any = {}
    for (const key of formData.keys()) {

        manager[key] = formData.get(key)
    }

    const authHeader = await AuthHeaders();
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH  ",
        headers: {
            ...authHeader.headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manager)
    })
    if (response.status == 200) {
        revalidateTag("dashboard:managers", "page")
        revalidateTag(`dashboard:managers:${managerId}`, "page")
    }

}