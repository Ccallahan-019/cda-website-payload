'use client';

import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { ArchiveBlock as ArchiveBlockProps, Charity, Event, Fundraiser, Media, Project } from "@/payload-types";
import { GET_EVENTS } from "@/graghql/queries/archive-collections/eventQuery";
import { GET_CHARITIES } from "@/graghql/queries/archive-collections/charityQuery";
import { GET_FUNDRAISERS } from "@/graghql/queries/archive-collections/fundraiserQuery";
import { GET_PROJECTS } from "@/graghql/queries/archive-collections/projectQuery";
import ArchiveCard from "@/components/archive/ArchiveCard";
import RichText from "@/lexical-components/RichText";
import Pagination from "@/components/pagination/Pagination";
import { Document } from "payload";

export type CardDataType = {
  id: number;
  title: string;
  description: string;
  image: number | Media | null | undefined;
  url: string;
} | undefined;

const collectionQueryMap = {
  event: GET_EVENTS,
  charity: GET_CHARITIES,
  fundraiser: GET_FUNDRAISERS,
  project: GET_PROJECTS,
};

export const Archive: React.FC<ArchiveBlockProps> = (props) => {
  const {
    introContent,
    collection,
    type,
    autoPopulate,
    limit,
    selectedDocs,
    entriesPerPage = 3
  } = props

  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0)
  const query = collectionQueryMap[collection];

  const { data: collectionData } = useSuspenseQuery(query, {
    variables: { 
        type,
        limit: entriesPerPage && limit ? Math.min(entriesPerPage, limit): 20,
        page: currentPage
    },
    skip: !autoPopulate,
  });

  const data: Document = collectionData;
  const autoPopulatedDocs = useMemo(() => {
    if (!data) return [];
    switch (collection) {
      case "event":
        setTotalDocs(data.Events?.totalDocs)
        return data.Events?.docs || [];
      case "charity":
        setTotalDocs(data.Charities?.totalDocs)
        return data.Charities?.docs || [];
      case "fundraiser":
        setTotalDocs(data.Fundraisers?.totalDocs)
        return data.Fundraisers?.docs || [];
      case "project":
        setTotalDocs(data.Projects?.totalDocs)
        return data.Projects?.docs || [];
      default:
        return [];
    }
  }, [data, collection]);

  const cardData: CardDataType[] = useMemo(() => {
    if (autoPopulate) {
      switch (collection) {
        case "event":
          return autoPopulatedDocs.map((event: Event) => ({
            id: event.id,
            title: event.eventName,
            description: event.eventDescription,
            image: event.heroImage,
            url: `/events/${event.slug}`,
          }));
        case "charity":
          return autoPopulatedDocs.map((charity: Charity) => ({
            id: charity.id,
            title: charity.charityName,
            description: charity.charityDescription,
            image: charity.heroImage,
            url: `/charities/${charity.slug}`,
          }));
        case "fundraiser":
          return autoPopulatedDocs.map((fundraiser: Fundraiser) => ({
            id: fundraiser.id,
            title: fundraiser.fundraiserName,
            description: fundraiser.fundraiserDescription,
            image: fundraiser.heroImage,
            url: `/fundraisers/${fundraiser.slug}`,
          }));
        case "project":
          return autoPopulatedDocs.map((project: Project) => ({
            id: project.id,
            title: project.projectName,
            description: project.projectDescription,
            image: project.heroImage,
            url: `/projects/${project.slug}`,
          }));
      }
    } else {
      const selected = selectedDocs?.filter(doc => doc.relationTo === collection);
      return selected?.map(doc => {
        if (typeof doc.value === 'object') {
          switch (doc.relationTo) {
            case "event":
              const eventValue = doc.value;
              return {
                id: eventValue.id,
                title: eventValue.eventName,
                description: eventValue.eventDescription,
                image: eventValue.heroImage,
                url: `/events/${eventValue.slug}`,
              };
            case "charity":
              const charityValue = doc.value;
              return {
                id: charityValue.id,
                title: charityValue.charityName,
                description: charityValue.charityDescription,
                image: charityValue.heroImage,
                url: `/charities/${charityValue.slug}`,
              };
            case "fundraiser":
              const fundraiserValue = doc.value;
              return {
                id: fundraiserValue.id,
                title: fundraiserValue.fundraiserName,
                description: fundraiserValue.fundraiserDescription,
                image: fundraiserValue.heroImage,
                url: `/fundraisers/${fundraiserValue.slug}`,
              };
            case "project":
              const projectValue = doc.value;
              return {
                id: projectValue.id,
                title: projectValue.projectName,
                description: projectValue.projectDescription,
                image: projectValue.heroImage,
                url: `/projects/${projectValue.slug}`,
              };
          }
        }
      }) || [];
    }
  }, [autoPopulate, autoPopulatedDocs, selectedDocs, collection]);

  let paginatedEntries;
  if (autoPopulate || !entriesPerPage) {
    paginatedEntries = cardData;
  } else {
    paginatedEntries = cardData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  }

  const totalEffectiveDocs = limit ? Math.min(totalDocs, limit) : totalDocs;

  let totalPages: number;
  if (autoPopulate) {
    totalPages = entriesPerPage ? Math.ceil(totalEffectiveDocs / entriesPerPage) : 1;
  } else {
    totalPages = entriesPerPage ? Math.ceil(cardData.length / entriesPerPage) : 1;
  }
  

  const labelsMap = {
    event: { singular: 'Event', plural: 'Events' },
    project: { singular: 'Project', plural: 'Projects' },
    charity: { singular: 'Charity', plural: 'Charities' },
    fundraiser: { singular: 'Fundraiser', plural: 'Fundraisers' },
  };

  const labels = labelsMap[collection];

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handlePageChange = (page: number) => setCurrentPage(page);

  console.log(cardData)

  return (
    <div className="container my-16 sm:my-20">
      {introContent && (
        <div className="mb-16">
          <RichText data={introContent} />
        </div>
      )}
      {cardData.length > 0 && (
        <Pagination
          pages={totalPages}
          currentPage={currentPage}
          rangeLabels={labels}
          pageLength={entriesPerPage || (autoPopulate ? totalEffectiveDocs : cardData.length)}
          totalCount={autoPopulate ? totalEffectiveDocs : cardData.length}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        >
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
            {paginatedEntries.map((card, index) => card && (
              <div key={card.id || index} className="col-span-4">
                <ArchiveCard cardData={card} />
              </div>
            ))}
          </div>
        </Pagination>
      )}
    </div>
  );
};
