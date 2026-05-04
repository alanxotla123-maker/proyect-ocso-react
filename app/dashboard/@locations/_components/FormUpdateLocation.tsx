"use client";

import { Manager, Location } from "@/entities";
import { Input } from "@nextui-org/react";
import updateLocation from "@/actions/locations/update";
import SelectManager from "./SelectManager";

export default function FormUpdateLocation({
    store,
    managers,
    locations
}: {
    store: string | string[] | undefined,
    managers: Manager[],
    locations: Location[]
}) {
    if (!store || store === undefined || typeof store === 'object') return <div></div>;

    const storeId = store;
    const foundLocation = locations.find((location) => location.locationId === Number(storeId));

    if (!foundLocation) return null;

    const foundManager = managers.find((manager) => manager.managerId === foundLocation.manager?.managerId);
    const updateWithStoreId = updateLocation.bind(null, store);
    return (
        <form action={updateWithStoreId} className="flex flex-col gap-4 w-full text-left">
            <h1 className="text-2xl font-bold text-gray-800 text-center py-2">Actualizar Tienda</h1>

            <Input required={true}
                label="Nombre"
                name="locationName"
                radius="lg"
                size="lg"
                defaultValue={foundLocation.locationName}
            />
            <Input required={true}
                label="Dirección"
                name="locationAddress"
                radius="lg"
                size="lg"
                defaultValue={foundLocation.locationAddress}
            />
            <Input
                required={true}
                label="Latitud"
                name="locationLat"
                radius="lg"
                size="lg"
                defaultValue={foundLocation.locationLatLng[0]?.toString()}
            />
            <Input
                required={true}
                label="Longitud"
                name="locationLng"
                radius="lg"
                size="lg"
                defaultValue={foundLocation.locationLatLng[1]?.toString()}
            />

            <SelectManager
                defaultManager={foundManager?.managerId}
                managers={managers}
                locations={locations}
            />

            <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-lg"
            >
                Actualizar
            </button>
        </form>
    );
}