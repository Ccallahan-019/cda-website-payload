import { Header, Page } from "@/payload-types";
import DropdownMenu from "../dropdown/DropdownMenu";
import { LinkComponent } from "@/components/link/Link";

type Props = {
    navItem: Header["navItems"][number];
    hoveredItem: string | null;
    isDropdownVisible: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onLinkClick: () => void;
}

export default function HeaderNavTab({
    navItem,
    hoveredItem,
    isDropdownVisible,
    onMouseEnter,
    onMouseLeave,
    onLinkClick
}: Props) {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="min-h-full"
        >
            {navItem.subNav && navItem.subNav.length > 0 ? (
                <div className="h-15 px-5 inline-flex items-center justify-center">
                    {navItem.title}
                </div>
            ) : (
                typeof navItem.link.reference === "object" && (
                    <div className="h-15 px-5 inline-flex items-center justify-center">
                        <LinkComponent {...navItem.link} size="sm" reference={navItem.link.reference as Page} />
                    </div>
                )
                
            )}
            
            <div className="absolute top-[100%] left-0 w-full z-100">
                {
                navItem.subNav &&
                navItem.subNav.length > 0 &&
                hoveredItem === navItem.title &&
                isDropdownVisible && (
                    <DropdownMenu navItem={navItem} onLinkClick={onLinkClick} />
                )}
            </div>
        </div>
    )
}