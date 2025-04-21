'use client'

import { StatsBarBlock } from "@/payload-types"
import useCountUp from "@/custom-hooks/useCountUp"

type Props = {
    stat: StatsBarBlock['stats'][number]
}

export default function Stat({ stat }: Props) {
    const { statNumber, statDescription, statPostfix } = stat;

    const startingValue = stat.statNumber / 2;
    const duration = 2000;

    const countUp = useCountUp(statNumber, startingValue, duration);

    return (
        <div
            className="flex-1 px-8 py-10 sm:px-12 lg:px-16 lg:py-12 text-center text-shadow-lg text-shadow-gray-300/40"
        >
            {stat.statPostfix ? (
                <p className="text-5xl text-gray-800 font-normal lg:text-6xl">
                    {`${countUp} ${statPostfix}`}
                </p>
            ) : (
                <p className="text-5xl text-gray-800 font-normal lg:text-6xl">{countUp}</p>
            )}

            <p className="mt-3 text-lg font-normal text-gray-700">{statDescription}</p>
        </div>
    )
}