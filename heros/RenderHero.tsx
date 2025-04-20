import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpactHero'
import { LowImpactHero } from '@/heros/LowImpactHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
