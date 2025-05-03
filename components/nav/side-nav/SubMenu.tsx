import { Header, Media, Page } from "@/payload-types";
import { LinkComponent } from "@/components/link/Link";
import { Media as MediaComponent } from "@/components/Media/Media";

type Props = {
    onClick: () => void;
    onLinkClick: () => void;
    subNav: Header["navItems"][number]["subNav"];
    backIcon: Media;
}

export default function SubMenu({ onClick, subNav, backIcon, onLinkClick }: Props) {
    return (
        <div className="space-y-5 divide-y divide-gray-200 border-t border-gray-200">
            <div>
                <button onClick={onClick} type="button" className="flex items-center gap-3 px-8  py-4 cursor-pointer">
                    <MediaComponent className="h-6 w-6 flex items-center" resource={backIcon} />
                    <p className="text-lg font-medium text-gray-900">Back</p>
                </button>
            </div>

            <div className="px-10 py-2 space-y-6">
                {subNav?.map((navItem, navIndex) => (
                    <div key={navIndex} className="space-y-3">
                        <p className="text-sm font-medium text-gray-900 uppercase">{navItem.title}</p>
                        <ul className="grid grid-cols-2 gap-2">
                            {navItem.links && navItem.links.map((item, index) => (
                                <li key={index}>
                                    {typeof item === "object" && (
					                    <LinkComponent
                                            {...item.link}
                                            reference={item.link.reference as Page}
                                            onClick={onLinkClick}
                                        />
				                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}