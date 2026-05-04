"use client";

import { Button } from "@nextui-org/react";
import deleteLocation from "@/actions/locations/delete";
import { LuTrash } from "react-icons/lu";

export default function DeleteLocationButton({ store }: { store: string | string[] | undefined }) {
    if (!store || store === "0") return null;

    const storeId = Array.isArray(store) ? store[0] : store;

    return (
        <form action={deleteLocation}>
            <input type="text" name="storeId" value={storeId} hidden readOnly />
            <Button 
                type="submit" 
                color="danger" 
                isIconOnly
            >
                <LuTrash size={20} />
            </Button>
        </form>
    )
}