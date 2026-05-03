import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers"
import { cache } from "react";

export const AuthHeaders = cache(async () => {
    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
})