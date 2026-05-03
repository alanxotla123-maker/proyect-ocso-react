"use client";

import { Input } from "@nextui-org/react";
import createLocation from "@/actions/locations/create";
import SelectManager from "./SelectManager";
import { Manager, Location } from "@/entities";

export default function FormNewLocation({ managers, locations }: { managers: Manager[], locations: Location[] }) {
    return (
        <form action={createLocation} className="bg-orange-400 p-5 flex flex-col gap-4 w-full rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold text-white text-center py-2">Crear Tienda</h1>
            <Input label="Nombre" placeholder="Ocso Jurikiya" name="locationName" radius="lg" size="lg" />
            <Input label="Dirección" placeholder="Av De La Luz S/N" name="locationAddress" radius="lg" size="lg" />
            <Input label="Latitud" placeholder="-120" name="locationLat" radius="lg" size="lg" />
            <Input label="Longitud" placeholder="20" name="locationLng" radius="lg" size="lg" />
            <SelectManager managers={managers} locations={locations} />
            <button
                type="submit"
                className="w-10/12 mx-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-full transition-colors text-lg"
            >
                Subir
            </button>
        </form>
    );
}