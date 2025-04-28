type Props = {
    rowsPerPage: number;
}

export default function CourtCardsSkeleton({ rowsPerPage }: Props) {
    const rowsArr: number[] = [];

    for (let i = 0; i <= rowsPerPage; i++) {
        rowsArr.push(i);
    }

    return (
        <div className="lg:hidden flex flex-col mt-4">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
                <div className="inline-block min-w-full py-2 align-middle px-4 md:px-6">
                    <table className="min-w-full">
                        <tbody className="divide-y divide-gray-200">
                            {rowsArr.map((row) => (
                            <tr key={row}>
                                <td className="py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <p className="rounded h-5 w-1/3 bg-gray-300 animate-pulse"></p>
                                        <p className="rounded h-5 w-2/3 bg-gray-300 animate-pulse"></p>
                                        <p className="rounded h-5 w-2/3 bg-gray-300 animate-pulse"></p>
                                        <p className="rounded h-5 w-2/3 bg-gray-300 animate-pulse"></p>
                                    </div>
                                </td>

                                <td className="py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                    <div className="space-y-1">
                                            <p className="rounded h-5 w-1/3 bg-gray-300 animate-pulse"></p>
                                            <div className="space-y-1">
                                                <p className="rounded h-5 w-2/3 bg-gray-300 animate-pulse"></p>
                                                <p className="rounded h-5 w-2/3 bg-gray-300 animate-pulse"></p>
                                            </div>
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