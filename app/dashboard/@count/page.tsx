

import axios from "axios";
import { TOKEN_NAME, API_URL } from "@/constants";
import { cookies } from "next/headers";

const CountPage = async () => {
    const userCookies = await cookies();
    const token = userCookies.get(TOKEN_NAME)?.value;

    try {
        const countLocations = await axios.get(`${API_URL}/locations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return <div>
            <p>Número de locations:</p>
            {countLocations?.data?.length ?? 0}</div>;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return <div>0</div>;
    }
}
export default CountPage;