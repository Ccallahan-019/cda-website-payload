import type { Header, Media, Page } from "@/payload-types";
import { LinkComponent } from "@/components/link/Link";
import { Media as MediaComponent } from "@/components/Media/Media";

type Props = {
    navItem: Header["navItems"][number];
	onClick: () => void;
	subMenuIcon: Media;
}

export default function SideNavTab({ navItem, onClick, subMenuIcon }: Props) {
    return (
        <li className="py-4 px-8 sm:px-10" onClick={onClick}>
			{navItem.subNav && navItem.subNav.length > 0 ? (
				<div className="flex justify-between items-center text-xl font-bold text-gray-600 hover:text-gray-900">
					{navItem.title}
					<MediaComponent imgClassName="h-7 w-4" resource={subMenuIcon} />
					
				</div>
			) : (
				<div className="flex justify-between items-center text-xl font-bold text-gray-600 hover:text-gray-900">
					{typeof navItem.link.reference === "object" && (
						<LinkComponent appearance="inline" {...navItem.link} reference={navItem.link.reference as Page} />
					)}
				</div>
			)}
        </li>
    )
    
}