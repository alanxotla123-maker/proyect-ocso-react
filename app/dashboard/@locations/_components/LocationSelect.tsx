"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Location } from "@/entities";
import { useRouter } from "next/navigation";

export default function LocationSelect(
    { locations,
        store
    }: {
        locations: Location[],
        store: string | string[] | undefined
    }) {

    const router = useRouter();
    return (
        <Select label="Tienda"
            placeholder="Selecciona una tienda" classNames={{
                mainWrapper: "ring-2 ring-red-300 rounded-xl transition-all"

            }}
            selectedKeys={store ? store : "0"}
            onChange={((e) => {
                if (e.target.value === "0" || e.target.value === "") {
                    router.push("/dashboard/");
                }
                else {
                    router.push(`/dashboard/?store=${e.target.value}`)
                }
            })}
        >
            {locations.map((location: Location) => (
                <SelectItem key={location.locationId} value={location.locationId}>
                    {location.locationName}
                </SelectItem>
            ))}
        </Select>
    );
}
