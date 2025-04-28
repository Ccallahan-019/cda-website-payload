type Props = {
    rowsPerPage: number;
}

export default function TableSkeleton({ rowsPerPage }: Props) {
    const rowsArr: number[] = [];

    for (let i = 0; i <= rowsPerPage; i++) {
        rowsArr.push(i);
    }

    return (
        <div className="hidden lg:flex flex-col mt-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 -mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 px-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-header-group">
                            <tr>
                                <th>
                                    <p className="rounded my-4 h-5 w-full bg-gray-400 animate-pulse"></p>
                                </th> 
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rowsArr.map((row) => (
                                <tr key={row}>
                                    <td>
                                        <p className="rounded my-5 h-5 w-full bg-gray-300 animate-pulse"></p>
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