'use client';

import CourtCards from "@/components/court-card/CourtCard";
import Table from "@/components/table/Table";
import Pagination from "@/components/pagination/Pagination";
import RichText from "@/lexical-components/RichText";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { GET_COURTS, GET_COURTS_BY_ID, GET_COURTS_BY_DIOCESE } from "@/graghql/queries/courtListingQuery";
import type { CourtListingBlock as CourtListingBlockProps, LocalCourt } from "@/payload-types";
import formatDate from "@/utils/helpers/formatDate";
import { Document } from "payload";

function manualWhere(ids: (number | null)[]) {
    const where: Record<string, any> = {};

    if (Array.isArray(ids) && ids.length > 0) {
        where.OR = ids.map(id => ({
            id: { equals: id }
        }))
    }

    return Object.keys(where).length > 0 ? where : {};
}

function getValueFromPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function convertToAnniversary(date: string) {
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
      return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    return direction === 'asc' ? aVal - bVal : bVal - aVal;
  });
}

export const CourtListing: React.FC<CourtListingBlockProps> = ({
  richText,
  selectionType,
  selectedCourts,
  selectedDiocese,
  rowsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Build query filters based on selection type
  const variables = useMemo(() => {
    if (selectionType === 'manual' && Array.isArray(selectedCourts) && selectedCourts.length > 0) {
      const ids = selectedCourts.map((court) => {
        if (typeof court === 'object') {
            return court.id
        }
        return null
    }) || [];
      return { where: manualWhere(ids), limit: rowsPerPage, page: currentPage };
    }
    if (selectionType === 'diocese' && selectedDiocese && typeof selectedDiocese === 'object') {
      return { dioceseId: selectedDiocese.id, limit: rowsPerPage, page: currentPage };
    }
    return { limit: rowsPerPage, page: currentPage }; // All courts
  }, [selectionType, selectedCourts, selectedDiocese, currentPage, rowsPerPage]);

  let query;

  if (selectionType === 'manual') {
    query = GET_COURTS_BY_ID
  } else if (selectionType === 'diocese') {
    query = GET_COURTS_BY_DIOCESE
  } else {
    query = GET_COURTS
  }

  const { data: courtData, error } = useSuspenseQuery(query, {
    variables,
    skip: !variables
  });

  const data: Document = courtData;

  const courts: LocalCourt[] = useMemo(() => {
    if (data?.LocalCourts?.docs) {
      if (sortKey) {
        return sortData(data.LocalCourts.docs, sortKey, sortDir);
      }
      return data.LocalCourts.docs;
    }
    return [];
  }, [data, sortKey, sortDir]);

  const totalCount = data?.LocalCourts?.totalDocs || 0;
  const totalPages = rowsPerPage ? Math.ceil(totalCount / rowsPerPage) : 1;

  const handleSort = (key: string) => {
    const nextDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(nextDir);
  };

  const columns = [
    { header: 'Number', accessor: 'courtNumber' },
    {
      header: 'Name',
      accessor: 'courtName',
      render: (_: any, row: LocalCourt) => (
        row.slug ? (
          <Link href={`/courts/${row.slug}`} className="hover:text-primary">
            {row.courtName}
          </Link>
        ) : (
          <p>{row.courtName}</p>
        )
      ),
    },
    { header: 'Diocese', accessor: 'courtDiocese.dioceseName' },
    { header: 'Location', accessor: 'courtLocation.courtCity' },
    {
      header: 'Instituted',
      accessor: 'instituted' as keyof LocalCourt,
      render: (_: any, row: { instituted: string }) => <p>{formatDate(row.instituted)}</p>,
    },
    {
      header: 'Anniversary',
      accessor: 'instituted' as keyof LocalCourt,
      render: (_: any, row: { instituted: string }) => <p>{convertToAnniversary(row.instituted)}</p>,
    },
    {
      header: 'Court Regent',
      accessor: 'courtOfficers.courtRegent',
      render: (_: any, row: LocalCourt) => (
        row.courtOfficers?.courtRegent && typeof row.courtOfficers.courtRegent === "object" ? (
          <div>
            <p>{row.courtOfficers.courtRegent.contactName}</p>
            <p>{row.courtOfficers.courtRegent.contactEmail}</p>
          </div>
        ) : null
      ),
    },
  ];

  if (error) {
    console.error(error);
    return <div className="container my-20 text-red-500">Error loading courts.</div>;
  }

  return (
    <div className="container my-16 sm:my-20">
      <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
        {richText && <RichText data={richText} />}
        
        {courts.length > 0 && (
          <Pagination
            pages={totalPages}
            currentPage={currentPage}
            pageLength={rowsPerPage || courts.length}
            totalCount={totalCount}
            rangeLabels={{ singular: 'Court', plural: 'Courts' }}
            onPageChange={setCurrentPage}
            onNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            onPrevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <div>
              <Table columns={columns} data={courts} onSort={handleSort} />
              <CourtCards courts={courts} />
            </div>
          </Pagination>
        )}
      </div>
    </div>
  );
};
