import { LocalCourt } from "@/payload-types";
import formatDate from "@/utils/helpers/formatDate";

type Props = {
    court: LocalCourt;
}

export default function CourtInfoBanner({ court }: Props) {
    const { courtDiocese, instituted, courtLocation, courtWebsite } = court

    return (
        <div className="w-full mx-auto p-8 flex flex-col sm:flex-row gap-3 justify-around text-gray-800 text-lg rounded-xl bg-background/60 backdrop-blur-sm shadow-xl border border-accent">
            {typeof courtDiocese === 'object' && (
                <div className="">
                    <p>{courtDiocese.dioceseName}</p>
                </div>
            )}
            {instituted && (
                <div className="">
                    <p>{`Instituted: ${formatDate(instituted)}`}</p>
                </div>
            )}
            {courtLocation?.courtCity && (
                <div className="">
                    <p>{`Location: ${courtLocation.courtCity}`}</p>
                </div>
            )}
            {courtWebsite && (
                <div className="">
                    <p>{`Website: ${courtWebsite}`}</p>
                </div>
            )}
        </div>
    )
}