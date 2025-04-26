export default function ArchiveLoadingSkeleton() {
    return (
        <div className="container my-16 sm:my-20">
            <div className="mb-16 h-[100px]"/>
            <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
                <div className="col-span-4">
                    <div className="p-4">
                        <div className="h-full border border-border rounded-lg overflow-hidden bg-gray-200 animate-pulse">
                            <div className="relative w-full bg-gray-300 aspect-[3/2]" />
                            <div className="p-4">
                                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
                                <div className="h-4 bg-gray-300 rounded w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="p-4">
                        <div className="h-full border border-border rounded-lg overflow-hidden bg-gray-200 animate-pulse">
                            <div className="relative w-full bg-gray-300 aspect-[3/2]" />
                            <div className="p-4">
                                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
                                <div className="h-4 bg-gray-300 rounded w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="p-4">
                        <div className="h-full border border-border rounded-lg overflow-hidden bg-gray-200 animate-pulse">
                            <div className="relative w-full bg-gray-300 aspect-[3/2]" />
                            <div className="p-4">
                                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
                                <div className="h-4 bg-gray-300 rounded w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}