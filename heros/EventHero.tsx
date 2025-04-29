import formatDate from '@/utils/helpers/formatDate'
import React from 'react'

import type { Event } from '@/payload-types'

import { Media } from '@/components/Media/Media'

export const EventHero: React.FC<{
  event: Event
}> = ({ event }) => {
  const { heroImage, eventDate, eventName, eventType } = event

  return (
    <div className="relative flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_64rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {eventType && <p>{`${eventType} Event`}</p>}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{eventName}</h1>
          </div>

          <div>
            {eventDate && (
                <p className='text-sm'>{formatDate(eventDate)}</p>
            )}
          </div>
        </div>
      </div>
        {heroImage && typeof heroImage !== 'string' ? (
            <div className="min-h-[70vh] select-none">
                <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
                <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-gradient-to-t from-primary to-transparent to-70%" />
            </div>
        ): (
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-gradient-to-t from-primary from-10% to-transparent" />
        )}
    </div>
  )
}
