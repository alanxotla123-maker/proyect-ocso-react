import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";

export default function DashboardLayout({
    children,
    locations,
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode
}>) {
    return (
        <div className="bg-orange-50 min-h-screen">
            <Header />
            <div className="flex flex-row items-start">
                <Sidebar />
                {children}
                {locations}
            </div>
        </div>
    )
}