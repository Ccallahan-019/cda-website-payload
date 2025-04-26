'use client'

import CourtCards from "@/components/court-card/CourtCard";
import Table from "@/components/table/Table";
import formatDate from "@/utils/helpers/formatDate";
import type { CourtListingBlock as CourtListingBlockProps, LocalCourt } from "@/payload-types"
import { useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import RichText from "@/lexical-components/RichText";
import Link from "next/link";

export function getValueFromPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

const convertToAnniversary = (date: LocalCourt["instituted"]) => {
    const institutedDate = new Date(date);
    const today = new Date();
    const years = today.getFullYear() - institutedDate.getFullYear();

    const hasOccurredThisYear =
      today.getMonth() > institutedDate.getMonth() ||
      (today.getMonth() === institutedDate.getMonth() && today.getDate() >= institutedDate.getDate());

    return `${hasOccurredThisYear ? years : years - 1} years`;
  }

  function sortData<T>(data: T[], key: keyof T | string, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...data].sort((a, b) => {
      const aVal = typeof key === 'string' ? getValueFromPath(a, key) : a[key];
      const bVal = typeof key === 'string' ? getValueFromPath(b, key) : b[key];
  
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
  
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }

export const CourtListingBlock: React.FC<CourtListingBlockProps> = (props) => {
    const { richText, courts, rowsPerPage } = props

    const [sortedData, setSortedData] = useState(courts);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    let totalPages: number;
    let paginatedCourts: typeof courts;

    if (rowsPerPage) {
        totalPages = Math.ceil(courts.length / rowsPerPage);
        paginatedCourts = courts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    } else {
        totalPages = 1;
        paginatedCourts = courts;
    }

    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleSort = (key: string) => {
        const nextDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
        const newData = sortData(sortedData, key, nextDir);
        setSortedData(newData);
        setSortKey(key);
        setSortDir(nextDir);
      };

    const columns =[
            { header: 'Number', accessor: 'courtNumber' },
            {
                header: 'Name',
                accessor: 'courtName',
                render: (_: any, row: LocalCourt) => {
                    if (row.slug) {
                        return (
                            <Link href={`/courts/${row.slug}`} className="hover:text-primary">
                                {row.courtName}
                            </Link>
                        )
                    }
                    return <p>{row.courtName}</p>
                    
                }
            },
            { header: 'Diocese', accessor: 'courtDiocese.dioceseName' },
            { header: 'Location', accessor: 'courtLocation.courtCity' },
            { 
                header: 'Instituted', 
                accessor: 'instituted' as keyof LocalCourt,
                render: (_: any, row: { instituted: string }) => {
                    return <p>{formatDate(row.instituted)}</p>;
                }
            },
            { 
                header: 'Anniversary',
                accessor: 'instituted' as keyof LocalCourt,
                render: (_: any, row: { instituted: string; }) => {
                    return <p>{convertToAnniversary(row.instituted)}</p>;
                }
            },
            { 
                header: 'Court Regent', accessor: 'courtOfficers.courtRegent',
                render: (_: any, row: LocalCourt) => {
                    return (
                        <div>
                            {row.courtOfficers?.courtRegent && typeof row.courtOfficers.courtRegent === "object" && (
                                <div>
                                    <p>{row.courtOfficers.courtRegent.contactName}</p>
                                    <p>{row.courtOfficers?.courtRegent.contactEmail}</p>
                                </div>
                            )}
                            
                        </div>
                    )
                }
            },
        ]

    return (
        <div className="container my-16 sm:my-20">
            <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
                {richText && <RichText data={richText} />}

                {Array.isArray(paginatedCourts) && paginatedCourts.length > 0 && (
                    <Pagination
                        pages={totalPages}
                        currentPage={currentPage}
                        pageLength={rowsPerPage || courts.length}
                        totalCount={courts.length}
                        rangeLabels={{ singular: 'Court', plural: 'Courts' }}
                        onPageChange={handlePageChange}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    >
                        <Table columns={columns} data={paginatedCourts as LocalCourt[]} onSort={handleSort} />
                        <CourtCards courts={paginatedCourts as LocalCourt[]} />
                    </Pagination>
                )}
            </div>
        </div>
    )
}