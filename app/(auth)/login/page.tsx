"use client";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { API_URL } from "@/constants";
import axios from "axios";

export default function LoginPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let authData: any = {};
        authData.userEmail = formData.get("userEmail");
        authData.userPassword = formData.get("userPassword");

        const { data } = await axios.post(`${API_URL}/auth/login`, {
            ...authData
        }, {
            withCredentials: true
        });

        console.log(data);
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
                <Button color="primary" type="submit">Iniciar sesion</Button>
                <p>
                    ¿No tienes cuenta? <Link href="/signup">Registrate</Link>
                </p>
            </div>
        </form>
    )
}