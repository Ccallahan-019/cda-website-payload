import React from 'react'

import type { Page } from '@/payload-types'
import RichText from '@/lexical-components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <div className="container mt-16 pb-2">
      <div className="max-w-[48rem]">
        {richText && <RichText data ={richText} />}
      </div>
    </div>
  )
}