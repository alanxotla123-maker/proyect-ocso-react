
"use client";

import { Manager } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function ManagerCards({ managers }: { managers: Manager[] }) {
    return (
        <>
            {managers?.map((manager: Manager) => (
                <Link href={`/dashboard/managers/${manager.managerId}`} key={manager.managerId}>
                    <Card className="mx-10 my-10 hover:scale-110 hover:bg-blue-100">
                        <CardHeader>
                            <p className="w-full">Nombre: <b>{manager.managerFullName}</b></p>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p className="w-full">Email: <b>{manager.managerEmail}</b></p>
                            <p className="w-full">Teléfono: <b>{manager.managerPhoneNumber}</b></p>
                        </CardBody>
                    </Card>
                </Link>

            ))}
        </>
    );
}