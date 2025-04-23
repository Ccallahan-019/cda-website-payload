import { LocalCourt } from "@/payload-types";

type Props = {
    officers: LocalCourt["courtOfficers"];
    className?: string;
}

export default function CourtOfficerCard({ officers, className }: Props) {
    if (officers) {
        const { courtRegent, courtViceRegent, courtRecordingSecretary, courtFinancialSecretary, courtTreasurer } = officers

        return (
            <div className={className}>
                <div className="p-8 flex flex-col gap-2 justify-around text-gray-800 text-lg rounded-xl bg-background/60 backdrop-blur-sm shadow-xl border border-accent">
                    <div className="pb-1 border-b border-gray-300">
                        <p>Court Officers</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>
                            {courtRegent && typeof courtRegent === 'object' && (
                                <p>{`Regent: ${courtRegent.contactName}`}</p>
                            )}
                        </div>
                        <div>
                            {courtViceRegent && typeof courtViceRegent === 'object' && (
                                <p>{`Vice Regent: ${courtViceRegent.contactName}`}</p>
                            )}
                        </div>
                        <div>
                            {courtRecordingSecretary && typeof courtRecordingSecretary === 'object' && (
                                <p>{`Recording Secretary: ${courtRecordingSecretary.contactName}`}</p>
                            )}
                        </div>
                        <div>
                            {courtFinancialSecretary && typeof courtFinancialSecretary === 'object' && (
                                <p>{`Financial Secretary: ${courtFinancialSecretary.contactName}`}</p>
                            )}
                        </div>
                        <div>
                            {courtTreasurer && typeof courtTreasurer === 'object' && (
                                <p>{`Treasurer: ${courtTreasurer.contactName}`}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}