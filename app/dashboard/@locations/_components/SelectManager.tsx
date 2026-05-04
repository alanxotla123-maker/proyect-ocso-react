import { Manager } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { Location } from "@/entities";
interface SelectManagerProps {
    managers: Manager[];
    locations: Location[];
    defaultManager?: string;
}

export default function SelectManager({ managers, locations, defaultManager = undefined }: SelectManagerProps) {
    const disablekeys = locations.map((location: Location) => {
        return location.manager?.managerId;
    }).filter((managerId) => managerId !== undefined);
    return (
        <Select defaultSelectedKeys={defaultManager !== undefined ? [defaultManager] : []} name="manager" disabledKeys={disablekeys}>
            {managers.map((manager) => (
                <SelectItem key={manager.managerId}>{manager.managerFullName}</SelectItem>
            ))}
        </Select>
    )
}  