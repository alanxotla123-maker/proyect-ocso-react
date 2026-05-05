"use server"

import { API_URL } from "@/constants"
import { AuthHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createManager(formData: FormData) {

    let manager: any = {}
    for (const key of formData.keys()) {

        manager[key] = formData.get(key)
    }

    const authHeader = await AuthHeaders();
    const response = await fetch(`${API_URL}/managers`, {
        method: "POST",
        headers: {
            ...authHeader.headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manager)
    })
    if (response.status == 201) revalidateTag("dashboard:managers", "page")

}