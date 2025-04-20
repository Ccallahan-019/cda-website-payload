import { Media } from "@/components/Media/Media";
import RichText from "@/lexical-components/RichText";
import type { MediaWithTextBlock as MediaWithTextBlockProps } from "@/payload-types";

export const MediaWithTextBlock: React.FC<MediaWithTextBlockProps> = (props) => {
    const { mediaSize, mediaAlignment, richText, media } = props

    let mediaClass;
    let textClass;

    if (mediaSize === 'half') {
        mediaClass = mediaAlignment === 'left' ? 'lg:col-span-6 row-start-1' : 'lg:col-span-6 lg:col-start-7'
    } else if (mediaSize === 'twoThirds') {
        mediaClass = mediaAlignment === 'left' ? 'lg:col-span-8 row-start-1' : 'lg:col-span-8 lg:col-start-5'
    } else if (mediaSize === 'oneThird') {
        mediaClass = mediaAlignment === 'left' ? 'lg:col-span-4 row-start-1' : 'lg:col-span-4 lg:col-start-9'
    }

    if (mediaSize === 'half') {
        textClass = mediaAlignment === 'left' ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-6 row-start-1'
    } else if (mediaSize === 'twoThirds') {
        textClass = mediaAlignment === 'left' ? 'lg:col-span-4 lg:col-start-9' : 'lg:col-span-4 row-start-1'
    } else if (mediaSize === 'oneThird') {
        textClass = mediaAlignment === 'left' ? 'lg:col-span-8 lg:col-start-5' : 'lg:col-span-8 row-start-1'
    }

    return (
        <div className="container my-16 sm:my-20 grid grid-cols-12 gap-6">
            <div className={`col-span-12 ${textClass} flex items-center`}>
                {richText && <RichText data={richText} />}
            </div>
            <Media
                className={`col-span-12 ${mediaClass} flex items-center ${mediaAlignment === 'left' ? "" : "justify-end"}`}
                pictureClassName="flex justify-start w-fit h-fit"
                imgClassName=""
                resource={media}
            />
        </div>
    )
}