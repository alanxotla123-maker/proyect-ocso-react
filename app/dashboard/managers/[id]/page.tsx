
import { AuthHeaders } from "@/helpers/authHeaders"
import { API_URL } from "@/constants"
export default async function ManagerPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const authHeaders = await AuthHeaders()
    const response = await fetch(
        `${API_URL}/managers/${id}`,
        {
            headers: authHeaders.headers,
            next: {
                tags: ["dashboard:managers", `dashboard:managers:${id}`]
            }
        }
    )
    const manager = await response.json()
    console.log(manager);
    return (
        <div className="mx-10 my-10 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col">
            <div className="px-5 py-6 border-b border-gray-200 text-center">
                <h2 className="text-3xl font-bold text-gray-900">{manager.managerFullName}</h2>
            </div>

            <div className="px-10 py-6 flex flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-3 text-lg w-1/2">
                    <p className="text-gray-900">
                        <b>Email:</b> {manager.managerEmail}
                    </p>
                    <p className="text-gray-900">
                        <b>Teléfono:</b> {manager.managerPhoneNumber}
                    </p>
                    {manager.location ? (
                        <p className="text-gray-900">
                            <b>Tienda:</b> <span className="underline font-bold cursor-pointer">{manager.location.locationName}</span>
                        </p>
                    ) : (
                        <p className="text-gray-500 italic mt-2">No tiene tienda asignada</p>
                    )}
                </div>

                <div className="w-1/2 flex justify-center">
                    {manager.location ? (
                        <iframe
                            className="border-2 border-orange-800 rounded-md"
                            width="300"
                            height="200"
                            src={`https://www.google.com/maps/embed/v1/place?key=TU_API_KEY_AQUI&q=${manager.location.locationLatLng[0]},${manager.location.locationLatLng[1]}`}
                        ></iframe>
                    ) : (
                        <div className="w-[300px] h-[200px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                            Sin mapa
                        </div>
                    )}
                </div>
            </div>
        </div>
    )



}

