import { CardDataType } from "@/blocks/Archive/Archive"
import { Media } from "../Media/Media"
import Link from "next/link"

type Props = {
    cardData: CardDataType
}

export default function ArchiveCard({ cardData }: Props) {
    if (cardData) {
        const { title, description, image } = cardData

        return (
            <Link href={cardData.url}>
                <div className="h-full border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer">
                    <div className="relative w-full aspect-7/4 flex items-center overflow-hidden">
                        {!image && <div className="w-full aspect-7/4 bg-muted"/>}
                        {image && typeof image !== 'string' && (
                            <Media
                                resource={image}
                                size="33vw"
                            />
                        )}
                    </div>
                    <div className="p-4">
                        <p className="text-lg text-gray-700">{title}</p>
                        <p className="mt-2 text-gray-800">{description}</p>
                    </div>
                </div>
            </Link>
        )
    }
    return null;  
}