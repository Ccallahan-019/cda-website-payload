import { Media } from "@/components/Media/Media";
import RichText from "@/lexical-components/RichText";
import { MediaBlock as MediaBlockProps } from "@/payload-types";
import { StaticImageData } from "next/image";

type Props = MediaBlockProps & {
    captionClassName?: string
    className?: string
    enableGutter?: boolean
    imgClassName?: string
    staticImage?: StaticImageData
    disableInnerContainer?: boolean
    size?: string
  }

export const MediaBlock: React.FC<Props> = (props) => {
const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    size,
} = props

    let caption
    if (media && typeof media === 'object') caption = media.caption

    return (
        <div
            className={`
                ${enableGutter ? 'container' : ''}
                ${className}
            `}
        >
            {(media || staticImage) && (
                <Media
                    className="flex justify-center"
                    pictureClassName="w-fit"
                    imgClassName={`
                        rounded-[0.8rem]
                        ${imgClassName}
                    `}
                    resource={media}
                    src={staticImage}
                    size={size}
                />
            )}
            {caption && (
                <div
                    className={`
                        mt-6
                        ${!disableInnerContainer ? 'container' : ''}
                        ${captionClassName}
                    `}
                >
                    <RichText data={caption} enableGutter={false} />
                </div>
            )}
        </div>
    )
}
