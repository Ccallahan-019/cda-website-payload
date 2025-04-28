'use client'

import { ArchiveBlock as ArchiveBlockProps, Charity, Event, Fundraiser, Media, Project } from "@/payload-types";
import { GET_EVENTS } from "@/graghql/queries/archive-collections/eventQuery";
import { GET_CHARITIES } from "@/graghql/queries/archive-collections/charityQuery";
import { GET_FUNDRAISERS } from "@/graghql/queries/archive-collections/fundraiserQuery";
import { GET_PROJECTS } from "@/graghql/queries/archive-collections/projectQuery";
import ArchiveCard from "@/components/archive/ArchiveCard";
import RichText from "@/lexical-components/RichText";
import Pagination from "@/components/pagination/Pagination";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { Document } from "payload";

export type CardDataType = {
    id: number;
    title: string;
    description: string;
    image: number | Media | null | undefined;
    url: string;
} | undefined

export const collectionQueryMap = {
    event: GET_EVENTS,
    charity: GET_CHARITIES,
    fundraiser: GET_FUNDRAISERS,
    project: GET_PROJECTS,
  };

export const Archive: React.FC<ArchiveBlockProps> = (props) => {
    const { introContent, collection, type, autoPopulate, limit, selectedDocs, entriesPerPage = 3 } = props

    const [currentPage, setCurrentPage] = useState(1);

    const query = collectionQueryMap[collection];
    const { data: collectionData } = useSuspenseQuery(query, {
        variables: { type, limit },
        skip: !autoPopulate
    });

    const data: Document = collectionData
    let autoPopulatedDocs;
    let cardData: CardDataType[] = [];

    switch (collection) {
        case "event": 
            autoPopulatedDocs = data.Events.docs;
            const selectedEvents = selectedDocs?.filter((doc) => doc.relationTo === collection);
            if (autoPopulate) {
                cardData = autoPopulatedDocs.map((event: Event) => ({
                    id: event.id,
                    title: event.eventName,
                    description: event.eventDescription,
                    image: event.heroImage,
                    url: `/events/${event.slug}`
                }))
            } else {
                if (selectedEvents) {
                    cardData = selectedEvents.map((event) => {
                        if (typeof event.value === 'object') {
                            return {
                                id: event.value.id,
                                title: event.value.eventName,
                                description: event.value.eventDescription,
                                image: event.value.heroImage,
                                url: `/events/${event.value.slug}`
                            }
                        }
                    })
                }
            }
            break

        case "charity":
            autoPopulatedDocs = data.Charities.docs;
            const selectedCharities = selectedDocs?.filter((doc) => doc.relationTo === collection);
            if (autoPopulate) {
                cardData = autoPopulatedDocs.map((charity: Charity) => ({
                    id: charity.id,
                    title: charity.charityName,
                    description: charity.charityDescription,
                    image: charity.heroImage,
                    url: `/charities/${charity.slug}`
                }))
            } else {
                if (selectedCharities) {
                    cardData = selectedCharities.map((charity) => {
                        if (typeof charity.value === 'object') {
                            return {
                                id: charity.value.id,
                                title: charity.value.charityName,
                                description: charity.value.charityDescription,
                                image: charity.value.heroImage,
                                url: `/charities/${charity.value.slug}`
                            }
                        }
                    })
                }
            }
            break

        case "fundraiser":
            autoPopulatedDocs = data.Fundraisers.docs;
            const selectedFundraisers = selectedDocs?.filter((doc) => doc.relationTo === collection);
            if (autoPopulate) {
                cardData = autoPopulatedDocs.map((fundraiser: Fundraiser) => ({
                    id: fundraiser.id,
                    title: fundraiser.fundraiserName,
                    description: fundraiser.fundraiserDescription,
                    image: fundraiser.heroImage,
                    url: `/fundraisers/${fundraiser.slug}`
                }))
            } else {
                if (selectedFundraisers) {
                    cardData = selectedFundraisers.map((fundraiser) => {
                        if (typeof fundraiser.value === 'object') {
                            return {
                                id: fundraiser.value.id,
                                title: fundraiser.value.fundraiserName,
                                description: fundraiser.value.fundraiserDescription,
                                image: fundraiser.value.heroImage,
                                url: `/fundraisers/${fundraiser.value.slug}`
                            }
                        }
                    })
                }
            }
            break

        case "project":
            const selectedProjects = selectedDocs?.filter((doc) => doc.relationTo === collection);
            if (autoPopulate) {
                autoPopulatedDocs = data.Projects.docs;
                cardData = autoPopulatedDocs.map((project: Project) => ({
                    id: project.id,
                    title: project.projectName,
                    description: project.projectDescription,
                    image: project.heroImage,
                     url: `/projects/${project.slug}`
                }))
            } else {
                if (selectedProjects) {
                    cardData = selectedProjects.map((project) => {
                        if (typeof project.value === 'object') {
                            return {
                                id: project.value.id,
                                title: project.value.projectName,
                                description: project.value.projectDescription,
                                image: project.value.heroImage,
                                url: `/projects/${project.value.slug}`
                            }
                        }
                    })
                }
            }
            break
    }

    const labelsMap = {
        event: { singular: 'Event', plural: 'Events' },
        project: { singular: 'Project', plural: 'Projects' },
        charity: { singular: 'Charity', plural: 'Charities' },
        fundraiser: { singular: 'Fundraiser', plural: 'Fundraisers' },
    }

    const labels = labelsMap[collection]
    let totalPages: number;
    let paginatedEntries: typeof cardData;

    if (entriesPerPage) {
        totalPages = Math.ceil(cardData.length / entriesPerPage);
        paginatedEntries = cardData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
    } else {
        totalPages = 1;
        paginatedEntries = cardData;
    }

    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <div className="container my-16 sm:my-20">
            <div className="mb-16">
                {introContent && <RichText data={introContent} />}
            </div>
            <Pagination
                pages={totalPages}
                currentPage={currentPage}
                rangeLabels={labels}
                pageLength={entriesPerPage || cardData.length}
                totalCount={cardData.length}
                onPageChange={handlePageChange}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
            >
                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
                    {paginatedEntries.map((card, index) => {
                        if (card) {
                            return (
                                <div key={card.id || index} className="col-span-4">
                                    <ArchiveCard cardData={card} />
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
            </Pagination>
        </div>
    )
}