import {
  DefaultNodeTypes,
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

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  const url = value.url

  if (relationTo === 'page') {
    return `/${slug}`
  } else if (relationTo === 'media') {
    return `${url}`
  }
  return '/'
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
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
