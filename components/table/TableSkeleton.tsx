import type { Column } from "./Table";

type Props<T> = {
    rowsPerPage: number;
    columns: Column<T>[]
}

export default function TableSkeleton<T>({ rowsPerPage, columns }: Props<T>) {
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
                            {columns.map((column, index) => (
                                <th key={index} className="py-3.5 pl-4 pr-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 sm:pl-6 md:pl-0">
                                    <div
                                        className="flex items-center cursor-pointer"
                                    >
                                        {column.header}
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                            ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rowsArr.map((row) => (
                                <tr key={row}>
                                    {columns.map((column, colIndex) => {
                                        return (
                                        <td key={colIndex} className="hidden py-6 pr-3 lg:table-cell">
                                            <p className="rounded h-[22px] bg-gray-300" ></p>
                                        </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}