import { Page } from "@/payload-types";
import { Header } from "@/payload-types";
import { LinkComponent } from "@/components/link/Link";

type Props = {
    navItem: Header["navItems"][number];
}

export default function DropdownMenu({ navItem }: Props) {
    return (
        <div className="py-8 bg-gradient-to-r bg-white">
            <div className="mx-auto px-8 max-w-7xl">
                <div className="grid items-start grid-cols-12 gap-x-12">
                    <div className="col-span-3">
                        <p className="text-xl font-medium text-gray-900">
                            {navItem.description}
                        </p>
                    </div>

                    {navItem.subNav?.map((nav, navIndex) => (
                        <div key={navIndex} className="col-span-3">
                            <p className="text-sm font-medium text-gray-900 uppercase">{nav.title}</p>
                            <ul className="mt-3 space-y-3">
                                {nav.links && nav.links.map((item, index) => (
                                    <li key={index}>
                                        {typeof item === "object" && (
                                            <LinkComponent {...item.link} reference={item.link.reference as Page} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
    
}