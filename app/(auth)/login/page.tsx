"use client";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { API_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [submitting, setSumitting] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        setSumitting(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let authData: any = {};
        authData.userEmail = formData.get("userEmail");
        authData.userPassword = formData.get("userPassword");
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(authData),
                credentials: "include",
            });

            if (response.status === 201) {
                router.push("/dashboard");
            } else {
                setSumitting(false);
            }
        } catch (e) {
            setSumitting(false);

        }
        return;
    }
    return (
        <form className="bg-orange-500 px-10 py-2 rounded-md" onSubmit={handleSubmit}>
            <p className="text-2xl my-4 text-white">Inicia sesion <span></span></p>
            <div className="flex flex-col gap-2 my-4 items-center">
                <Input name="userEmail" label="Email" type="email" isRequired={true} size="sm" />
                <Input name="userPassword" label="Contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button color="primary" type="submit" disabled={submitting}>{submitting ? "Iniciando sesion..." : "Iniciar sesion"}</Button>
                <p>
                    ¿No tienes cuenta? <Link href="/signup">Registrate</Link>
                </p>
            </div>
        </form>
    )
}