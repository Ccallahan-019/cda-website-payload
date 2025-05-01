import Link from "next/link";
import { NewsPost } from "@/payload-types";
import formatDate from "@/utils/helpers/formatDate";

export type props = {
    newsPost: NewsPost;
}

export default function NewsItem({ newsPost }: props) {
    const { updatedAt, title, description, referenceType, referenceTo, slug } = newsPost

    const urlMap = {
        page: '',
        event: '/events',
        charity: '/charities',
        fundraiser: '/fundraisers',
        project: '/projects',
        localCourt: '/courts'
    }

    let url: string | undefined;

    if (referenceType === 'new' && slug) {
        url = `/news/${slug}`
    } else if (referenceType === 'existing' && referenceTo && typeof referenceTo.value === 'object') {
        url = `${urlMap[referenceTo.relationTo]}/${referenceTo.value.slug}`
    } else {
        url = undefined
    }

    return (
        <div className="flow-root mx-auto border-t border-gray-300 my-8 lg:max-w-none">
            <div className="divide-y divide-gray-300">
                <div className="grid grid-cols-1 pt-8 gap-y-6 lg:grid-cols-8 lg:gap-x-8">
                    <div className="lg:col-span-2">
                        <p className="mt-2 text-md font-medium text-gray-700">{formatDate(updatedAt)}</p>
                    </div>

                    <div className="lg:col-span-4">
                        <p className="text-xl font-bold text-gray-900">
                            {title}
                        </p>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-700">{description}</p>
                    </div>

                    {url && (
                        <div className="lg:flex lg:justify-end lg:items-start lg:col-span-2">
                            <Link href={url} className="inline-flex items-center text-xs font-bold tracking-widest text-gray-900 uppercase group">
                                Learn More
                                <svg className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}