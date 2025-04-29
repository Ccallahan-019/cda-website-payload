type Props = {
    entriesPerPage: number | null | undefined;
}

export default function ArchiveCardsSkeleton({ entriesPerPage }: Props) {
    const entryArr: number[] = [];

    if (entriesPerPage) {
        for (let i = 0; i <= entriesPerPage; i++) {
            entryArr.push(i);
        }
    }

    

    return (
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
            {entryArr.length > 0 && entryArr.map((entry) => (
                <div key={entry} className="col-span-4">
                    <div className="h-full border border-border rounded-lg overflow-hidden bg-gray-200 animate-pulse">
                        <div className="relative w-full bg-gray-300 aspect-3/2" />
                        <div className="p-4">
                            <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
                            <div className="h-10 bg-gray-300 rounded w-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}