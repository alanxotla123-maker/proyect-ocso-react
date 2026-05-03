import EmployeesLocation from "./@locations/_components/EmployeesLocation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const store = Array.isArray(params.store) ? params.store[0] : params.store;

    return (
        <>
            <div className="h-[90vh] w-4/12 overflow-y-auto flex flex-col gap-4 p-6">
                {store ? (<EmployeesLocation store={store} />) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-400">
                        Selecciona una tienda
                    </div>
                )}
            </div>
        </>
    )
}