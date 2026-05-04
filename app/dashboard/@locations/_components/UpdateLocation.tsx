"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa"; // Usamos un icono de editar

export function UpdateLocation({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {/* Botón flotante naranja en la esquina de la tarjeta */}
            <Button 
                onPress={onOpen} 
                color="warning" 
                variant="shadow"
                size="sm"
                isIconOnly
                className="rounded-full bg-orange-500 text-white"
            >
                <FaEdit size={16} />
            </Button>

            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange} 
                backdrop="blur"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-gray-800">
                                Configuración de Tienda
                            </ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
