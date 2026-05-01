import '@/app/globals.css'
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-orange-200 w-screen h-screen overflow-hidden grid">
            <div className="place-content-center place-self-center">
                <img src="/logoOxxo.png" alt="Logo Oxxo" width={100} className="place-self-center my-4" height={100} />
                {children}</div>
        </div>
    );
}