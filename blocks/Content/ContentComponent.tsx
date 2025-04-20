import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import RichText from '@/lexical-components/RichText'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
    const { columns } = props

  return (
    <div className='container my-16 sm:my-20'>
      <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => {
              const { richText, size } = column

              const spanClass = {
                  full: 'lg:col-span-12',
                  half: 'lg:col-span-6',
                  oneThird: 'lg:col-span-4',
                  twoThirds: 'lg:col-span-8',
              }[size || 'full'];

              return (
                <div
                  className={`col-span-4 ${size !== 'full' ? 'md:col-span-2' : ''} ${spanClass}`}
                  key={index}
                >
                  {richText && <RichText data={richText} enableProse={false} />}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
