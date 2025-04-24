import formatDate from '@/utils/helpers/formatDate'
import React from 'react'

import type { LocalCourt } from '@/payload-types'
import { Media } from '@/components/Media/Media'

export const CourtHero: React.FC<{
  court: LocalCourt
}> = ({ court }) => {
  const { courtName, courtNumber, heroImage, updatedAt } = court

  return (
    <div className="relative flex items-end">
      <div className="container z-10 text-white relative pb-8 pt-32">
        <div className="w-full max-w-[80rem] mx-auto">
          <div className="uppercase text-sm mb-6">
            {courtNumber ? (
                <p>{`Local Court #${courtNumber}`}</p>
            ) : (null)}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{courtName}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {updatedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Last Updated</p>

                <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
              </div>
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
