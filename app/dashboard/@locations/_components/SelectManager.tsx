import { Manager } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { Location } from "@/entities";


export default function SelectManager({ managers, locations }: { managers: Manager[], locations: Location[] }) {
    const disablekeys = locations.map((location: Location) => {
        return location.manager?.managerId;
    }).filter((managerId) => managerId !== undefined);
    return (
        <Select name="manager" disabledKeys={disablekeys}>
            {managers.map((manager) => (
                <SelectItem key={manager.managerId}>{manager.managerFullName}</SelectItem>
            ))}
        </Select>
    )
}  