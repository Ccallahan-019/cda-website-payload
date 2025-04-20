'use client'

import { useState } from "react";
import { NewslettersBlock as NewslettersBlockProps } from "@/payload-types";
import { Media } from "@/components/Media/Media";
import Link from "next/link";
import RichText from "@/lexical-components/RichText";
import formatDate from "@/utils/helpers/formatDate";
import DropdownFilter from "@/components/dropdown-filter/DropdownFilter";

export const NewslettersBlock: React.FC<NewslettersBlockProps> = (props) => {
    const { newsletters, richText, downloadImage, dropdownIcon } = props

    const years = [...new Set(newsletters.map((item) => {
        if (typeof item.newsletter === 'object') {
            return item.newsletter.yearOfRelease
        }
        return 2024
    }))]

    const [year, setYear] = useState<string | number>(years[0]);
    const filteredNewsletters = newsletters.filter((item) => {
        if (typeof item.newsletter === 'object') {
            return item.newsletter.yearOfRelease === year
        }
    });

    const handleYearChange = (year: string | number) => {
        setYear(year);
    }

    return (
        <div className="container my-16 sm:my-20">
            {richText && <RichText data={richText} />}
            <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
            <div className="flex justify-end">
                <DropdownFilter value={year} options={years} onClick={handleYearChange} icon={dropdownIcon} />
            </div>
                {filteredNewsletters.map((newsletter, index) => {
                    let filesize;

                    if (newsletter.newsletter && typeof newsletter.newsletter === 'object') {
                        if (newsletter.newsletter.filesize) {
                            filesize = Math.round(newsletter.newsletter.filesize / 10485.76) / 100;
                        };

                        return (
                            <div key={index} className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 md:grid-cols-5">

                                <div className="px-4 text-right lg:py-4 sm:px-6 md:order-last">
                                    <button type="button" className="inline-flex items-center justify-center w-8 h-8">
                                        {newsletter.newsletter.url && (
                                            <Link href={newsletter.newsletter.url} target="_blank">
                                                <Media className="" resource={downloadImage} />
                                            </Link>
                                        )}  
                                    </button>
                                </div>

                                <div className="px-4 lg:py-4 sm:px-6 col-span-2 md:col-span-1 order-first">
                                    <p className="text-sm font-bold text-gray-900">{newsletter.newsletter.title}</p>
                                </div>

                                <div className="px-4 lg:py-4 sm:px-6">
                                    <p className="text-sm font-bold text-gray-900">Size</p>
                                    {newsletter.newsletter.filesize && (
                                        <p className="mt-1 text-sm font-medium text-gray-600">{`${filesize} MB`}</p>
                                    )}                        
                                </div>

                                <div className="px-4 lg:py-4 sm:px-6">
                                    <p className="text-sm font-bold text-gray-900">Year</p>
                                    <p className="mt-1 text-sm font-medium text-gray-600">{newsletter.newsletter.yearOfRelease}</p>
                                </div>

                                <div className="px-4 lg:py-4 sm:px-6">
                                    <p className="text-sm font-bold text-gray-900">Re-Issued</p>
                                    {newsletter.newsletter.reissueDate ? (
                                        <p className="mt-1 text-sm font-medium text-gray-600">{formatDate(newsletter.newsletter.reissueDate)}</p>
                                    ) : (
                                        <p className="mt-1 text-sm font-medium text-gray-600">N/A</p>
                                    )}
                                </div>
                            </div>  
                        )
                    }
                    return null;
                })}
            </div>
        </div>
    )
}