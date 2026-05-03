import EmployeesLocation from "./dashboard/@locations/_components/EmployeesLocation";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="h-full w-4/12">
        <div className="h-[90vh] overflow-hidden overflow-y-auto first:mt-0 last:mb-0">
          {
            searchParams.store ? (
              <EmployeesLocation store={searchParams.store} />
            ) : (
              <div className="w-full text-center text-gray-400 py-10">
                Selecciona una tienda
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}