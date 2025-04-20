'use client'

import React, { useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getClientSideURL } from '@/utils/getURL'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <video
        autoPlay
        className={videoClassName}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={`${getClientSideURL()}/media/${filename}`} />
      </video>
    )
  }

  return null
}
