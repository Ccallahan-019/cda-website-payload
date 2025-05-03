import { Contact, LocalCourt } from "@/payload-types"
import formatDate from "@/utils/helpers/formatDate"

type Props = {
    courts: LocalCourt[];
}

export default function CourtCards({ courts }: Props) {
    return (
        <div className="lg:hidden flex flex-col mt-4">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
                <div className="inline-block min-w-full py-2 align-middle px-4 md:px-6">
                    <table className="min-w-full">
                        <tbody className="divide-y divide-gray-200">
                            {courts.map((court, index) => (
                            <tr key={court.id || index}>
                                <td className="py-4 text-sm font-bold text-gray-900">
                                    <div className="space-y-1">
                                        {court.courtName && <p>{court.courtName}</p>}
                                        {court.courtNumber && <p className="text-sm font-medium text-gray-500">#{court.courtNumber}</p>}
                                        {court.courtDiocese && typeof court.courtDiocese === 'object' && (
                                            <p className="text-sm font-medium text-gray-500">{court.courtDiocese.dioceseName}</p>
                                        )}
                                        {court.courtLocation && typeof court.courtLocation === 'object' && (
                                            <p className="text-sm font-medium text-gray-500">{court.courtLocation.courtCity}</p>
                                        )}
                                    </div>
                                </td>

                                <td className="py-4 text-sm font-medium text-right text-gray-900">
                                    <div className="space-y-1">
                                        {court.instituted && <p>{`Instituted: ${formatDate(court.instituted)}`}</p>}
                                        {court.courtOfficers && court.courtOfficers.courtRegent && (
                                            <div className="space-y-1">
                                                <p>{`Court Regent: ${(court.courtOfficers.courtRegent as Contact).contactName}`}</p>
                                                <p>{(court.courtOfficers.courtRegent as Contact).contactEmail}</p>
                                            </div>
                                        )}
                                        
                                    </div>
                                </td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}