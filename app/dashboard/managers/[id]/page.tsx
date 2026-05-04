
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
        <div className="mx-10 my-10 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100">
                <p className="w-full text-lg">
                    Nombre: <b className="text-gray-900">{manager.managerFullName}</b>
                </p>
            </div>

            <div className="px-5 py-4 flex flex-col gap-3">
                <p className="w-full text-gray-700">
                    Email: <b className="text-gray-900">{manager.managerEmail}</b>
                </p>
                <p className="w-full text-gray-700">
                    Teléfono: <b className="text-gray-900">{manager.managerPhoneNumber}</b>
                </p>

                {manager.location ? (
                    <>
                        <p className="text-gray-700">
                            Tienda: <b className="text-gray-900">{manager.location.locationName}</b>
                        </p>
                        <iframe
                            className="border-2 border-orange-800 rounded-md my-2"
                            width="300"
                            height="200"
                            src={`https://www.google.com/maps/embed/v1/place?key=TU_API_KEY_AQUI&q=${manager.location.locationLatLng[0]},${manager.location.locationLatLng[1]}`}
                        ></iframe>
                    </>
                ) : (
                    <p className="text-gray-500 italic mt-2">No tiene tienda asignada</p>
                )}
            </div>
        </div>
    )



}

