
import { AuthHeaders } from "@/helpers/authHeaders"
import { API_URL } from "@/constants"
import DeleteManagerButton from "./_components/DeleteManagerButton";
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
        <div className="flex flex-col gap-6 items-center">
            <div className="mx-10 mt-10 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col w-full max-w-[800px]">
                <div className="px-5 py-6 border-b border-gray-200 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">{manager.managerFullName}</h2>
                </div>

                <div className="px-10 py-6 flex flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-3 text-lg w-1/2">
                        <div className="flex flex-col">
                            <span className="text-gray-600">Email:</span>
                            <b className="text-gray-900">{manager.managerEmail}</b>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600">Teléfono:</span>
                            <b className="text-gray-900">{manager.managerPhoneNumber}</b>
                        </div>
                        {manager.location && (
                            <div className="flex flex-col">
                                <span className="text-gray-600">Tienda:</span>
                                <b className="text-gray-900 underline cursor-pointer">{manager.location.locationName}</b>
                            </div>
                        )}
                    </div>

                    <div className="w-1/2 flex justify-center items-center">
                        {manager.location ? (
                            <iframe
                                className="border-2 border-orange-800 rounded-md"
                                width="300"
                                height="200"
                                src={`https://www.google.com/maps/embed/v1/place?key=TU_API_KEY_AQUI&q=${manager.location.locationLatLng[0]},${manager.location.locationLatLng[1]}`}
                            ></iframe>
                        ) : (
                            <h2 className="text-3xl text-gray-900">No tiene tienda</h2>
                        )}
                    </div>
                </div>
            </div>
            
            <DeleteManagerButton managerId={manager.managerId} />
        </div>
    )



}

