import { DiocesesAccordianBlock as DiocesesAccordianBlockProps } from "@/payload-types";
import AccordianCard from "@/components/accordian/AccordianCard";
import RichText from "@/lexical-components/RichText";

export const DiocesesAccordianBlock: React.FC<DiocesesAccordianBlockProps> = (props) => {
    const { dioceses, richText } = props

    return (
        <div className="container my-16 sm:my-20 space-y-4">
            {richText && <RichText data={richText} />}
            <div className="rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
                <div className="divide-y divide-gray-400">
                    {Array.isArray(dioceses) && dioceses.length > 0 && (
                        dioceses.map((diocese, index) => {
                            if (diocese && typeof diocese === 'object') {
                                return <AccordianCard key={diocese.id || index} diocese={diocese} />
                            }
                            return null
                        }))
                    }
                </div>
            </div>
        </div>
    )
}