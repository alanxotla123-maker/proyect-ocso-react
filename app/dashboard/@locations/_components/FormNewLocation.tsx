"use client";

import { Input } from "@nextui-org/react";
import createLocation from "@/actions/locations/create";
import SelectManager from "./SelectManager";
import { Manager, Location } from "@/entities";

export default function FormNewLocation({ managers, locations }: { managers: Manager[], locations: Location[] }) {
    return (
        <form action={createLocation} className="flex flex-col gap-4">
            <Input label="Nombre" placeholder="Juriquilla " name="locationName" />
            <Input label="Dirección" name="locationAddress" />
            <Input label="Latitud" name="locationLat" />
            <Input label="Longitud" name="locationLng" />
            <SelectManager managers={managers} locations={locations} />
            <button type="submit">Crear</button>
        </form>
    );
}