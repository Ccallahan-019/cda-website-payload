'use client'

import { Diocese } from "@/payload-types";
import RotatePresence from "@/components/ui/animations/RotatePresence";
import PlusIcon from "@/components/ui/svgs/PlusIcon";
import MinusIcon from "@/components/ui/svgs/MinusIcon";
import { useState } from "react";
import AnimateDropdown from "../ui/animations/AnimateDropdown";
import Link from "next/link";
import RichText from "@/lexical-components/RichText";

type Props = {
    diocese: Diocese;
}

export default function AccordianCard({ diocese }: Props) {
    const { dioceseName, dioceseLocation, dioceseWebsite, diocesePhoneNumber, info } = diocese

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div>
            <button
                onClick={toggleExpanded}
                className="py-8 px-4 sm:px-6 flex items-center justify-between w-full text-xl sm:text-2xl font-semibold text-left text-gray-900"
            >
                <span>{dioceseName}</span>
                <span className="ml-4">
                    <RotatePresence
                        firstIcon={<PlusIcon height="24px" width="24px" />}
                        secondIcon={<MinusIcon height="24px" width="24px" />}
                        clicked={isExpanded}
                    />
                </span>
            </button>

            <AnimateDropdown isExpanded={isExpanded}>
                <div className="grid grid-cols-12 gap-6 pt-2 pb-8 px-4 sm:px-6">
                    <div className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2 pb-6 sm:pb-0 sm:pr-6 flex flex-col space-y-3 border-b sm:border-b-0 sm:border-r border-gray-300 text-gray-800">
                        <div>
                            <p>{dioceseLocation?.dioceseAddress}</p>
                            <p>{`${dioceseLocation?.dioceseCity}, ${dioceseLocation?.dioceseState}`}</p>
                            <p>{dioceseLocation?.dioceseZipcode}</p>
                        </div>
                        <div>
                            {diocesePhoneNumber}
                        </div>
                        {dioceseWebsite && (
                            <Link href={dioceseWebsite} className="text-primary">
                                {dioceseWebsite}
                            </Link>
                        )}
                    </div>
                    <div className="col-span-12 sm:col-span-8 lg:col-span-9 xl:col-span-10">
                        {info ? (
                            <RichText data={info} />
                        ) : (
                            <p className="text-wrap text-gray-800">No additional information available. Check back soon!</p>
                        )}
                    </div>
                </div>
            </AnimateDropdown>
        </div>
    )
}