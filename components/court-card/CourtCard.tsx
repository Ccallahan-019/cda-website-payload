import { Contact, Diocese, LocalCourt } from "@/payload-types"
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
                                <td className="py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <p>{court.courtName}</p>
                                        <p className="text-sm font-medium text-gray-500">#{court.courtNumber}</p>
                                        <p className="text-sm font-medium text-gray-500">{(court.courtDiocese as Diocese).dioceseName}</p>
                                        <p className="text-sm font-medium text-gray-500">{court.courtLocation?.courtCity}</p>
                                    </div>
                                </td>

                                <td className="py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <p>{`Instituted: ${formatDate(court.instituted)}`}</p>
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