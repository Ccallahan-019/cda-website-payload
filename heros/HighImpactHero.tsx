import { LinkComponent } from "@/components/link/Link";
import { Media } from "@/components/Media/Media";
import RichText from "@/lexical-components/RichText";
import { Page } from "@/payload-types";

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
    return (
        <section className="container relative py-8">      
            <div className="grid grid-cols-12 items-center gap-8">
                <div className="col-span-12 md:col-span-6 xl:col-span-5 xl:col-start-2 flex flex-col gap-4">
                    {richText && <RichText data={richText} />}
                    {Array.isArray(links) && links.length > 0 && (
                        <ul className="flex md:justify-center gap-4">
                        {links.map(({ link }, i) => {
                            if (typeof link.reference === 'object') {
                              return (
                                    <li key={i}>
                                        <LinkComponent {...link} reference={link.reference} size="lg" />
                                    </li>
                                )  
                            }
                          
                        })}
                      </ul>
                    )}
                </div>
                {media && typeof media === 'object' && (
                    <Media
                        className="col-span-12 md:col-span-6 xl:col-span-5 xl:col-start-7 flex justify-end"
                        pictureClassName="grid grid-cols-1 justify-center"
                        size="
                            (min-width: 1540px) 595px,
                            (min-width: 1040px) calc(5vw + 412px),
                            (min-width: 780px) 336px, (min-width: 660px) 576px,
                            (min-width: 420px) calc(85.45vw + 29px),
                            calc(16vw + 304px)
                        "
                        priority
                        resource={media}
                    />
                )}
            </div>
        </section>
    )
}