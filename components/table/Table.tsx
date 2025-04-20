export type Column<T> = {
    header: string;
    accessor: string;
    render?: (value: any, row: T) => React.ReactNode;
  };

  export function getValueFromPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }
  
  type Props<T> = {
    data: T[];
    columns: Column<T>[];
    onSort: (key: string) => void;
  };
  
  export default function Table<T>({ data, columns, onSort }: Props<T>) {
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
                                onClick={() => onSort(column.accessor)}
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
                    {data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns.map((column, colIndex) => {
                          const value = getValueFromPath(row, column.accessor);
                          return (
                            <td key={colIndex} className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0">
                              {column.render ? column.render(value, row) : value?.toString()}
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
    );
  }
  