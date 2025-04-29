import type { Footer, Media, Page } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

type Props = {
    footerData: Footer;
}

export default function Footer({ footerData }: Props) {
    return (
        <section className="z-50 py-5 bg-background border-t border-gray-300">
            <div className="space-y-2">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
                    <div className="md:col-span-2 lg:pr-8 space-y-3">
                        <Image
                            className="h-20 w-auto"
                            height={(footerData.logo as Media).height!}
                            width={(footerData.logo as Media).width!}
                            src={(footerData.logo as Media).url!}
                            alt={(footerData.logo as Media).alt}
                        />

                        <p className="text-lg leading-relaxed text-gray-800">{footerData.title}</p>
                        <p className="text-base leading-relaxed text-gray-600">{footerData.text}</p>

                        {footerData.socialMediaIcons?.map((icon, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <Link href={icon.link} target="_blank">
                                    <Image
                                        className="h-6 w-auto"
                                        alt={(icon.icon as Media).alt}
                                        src={(icon.icon as Media).url!}
                                        height={(icon.icon as Media).height!}
                                        width={(icon.icon as Media).width!}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:items-end justify-center">
                        <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">{footerData.linksHeading}</p>

                        <ul className="mt-4 mr-1 text-gray-800 space-y-2 flex flex-col md:items-end">
                            {footerData.links.map((link, index) => (
                                <li key={index}>
                                    <Link href={(link.link as Page).slug}>
                                        {(link.link as Page).title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <p className="text-sm text-center text-gray-800">{footerData.copyrightText}</p>
            </div>
        </section>
    )
}