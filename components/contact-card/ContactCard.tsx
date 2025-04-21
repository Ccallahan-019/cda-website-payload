'use client'

import { useState } from "react";
import { Contact } from "@/payload-types";
import Image from "next/image";

import { motion } from "framer-motion";

type Props = {
    contact: Contact;
}

export default function ContactCard({ contact }: Props) {
    const { contactName, contactRoles, contactEmail, contactImage } = contact

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-full self-start col-span-12 lg:col-span-6 xl:col-span-4 flex flex-col transform bg-gray-300 rounded shadow-xl"
            onMouseEnter={() => {setIsHovered(true)}}
            onMouseLeave={() => {setIsHovered(false)}}
        >
            {contactImage && (
                <motion.div
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className=" hidden md:block absolute -top-6 -right-5 h-24 w-24 overflow-hidden rounded-full border-2 border-accent"
                >
                    {typeof contactImage === 'object' && contactImage.url && contactImage.height && contactImage.width && (
                        <Image
                            className="object-center rounded-full"
                            src={contactImage.url}
                            alt={contactImage.alt}
                            height={contactImage.height}
                            width={contactImage.width}
                        />
                    )}
                    
                </motion.div>
                )}

            <div className="flex-1 px-2 py-5 sm:p-6">
                <p className="text-lg font-semibold text-primary">{contactName}</p>
                
                <ul>
                    {contactRoles.map((role, index) => (
                        <li
                            key={role.id || index}
                            className="text-base font-normal text-gray-600"
                        >
                            {role.role}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-gray-400">
                <p className="flex items-center justify-start sm:justify-center px-2 sm:px-6 py-4 text-xs font-normal tracking-widest text-gray-900 uppercase rounded-b bg-transparent hover:bg-gradient-to-r from-muted from-40% to-primary">
                    {contactEmail}
                </p>
            </div>
        </div>
    )
}