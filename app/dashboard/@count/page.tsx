import axios from "axios";

const CountPage = async () => {

    const countLocations = await axios.get("http://localhost:3001/locations");
    return <div>{countLocations?.data?.length ?? 0}</div>;
}
export default CountPage; 