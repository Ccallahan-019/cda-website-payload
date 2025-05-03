import { MediaBlock } from '@/blocks/Media/MediaComponent'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  const url = value.url

  switch (relationTo) {
    case 'page':
      return `/${slug}`
    case 'localCourt':
      return `/courts/${slug}`
    case 'event':
      return `/events/${slug}`
    case 'fundraiser':
      return `/fundraisers/${slug}`
    case 'media':
      return `${url}`
    default:
      return '/'
  }
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className=''
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[64rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={`payload-richtext ${className}`}
      {...rest}
    />
  )
}
