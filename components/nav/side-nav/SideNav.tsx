import { Header, Media } from "@/payload-types";
import { useState } from "react";
import SubMenu from "./SubMenu";
import SideNavTab from "./SideNavTab";

type Props = {
	navItems: Header["navItems"];
	subMenuIcon: Media;
	backIcon: Media;
}

export default function SideNav({ navItems, subMenuIcon, backIcon }: Props) {
    const [clickedItem, setClickedItem] = useState<string | null>(null);
	const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    return (
        <div className="py-4 absolute top-[100%] left-0 w-full bg-white">
			{!isSubMenuVisible && (
				<ul className="border-y border-gray-400 divide-y divide-gray-400" >
					{navItems.map((item, index) => (
						<SideNavTab
							key={index}
							navItem={item}
							subMenuIcon={subMenuIcon}
							onClick={item.subNav && item.subNav.length > 0 ? () => {
								if (item.title) {
									setClickedItem(item.title);
									setIsSubMenuVisible(true);
								}
							} : () => {
								if (item.title) {
									setClickedItem(item.title);
								}
							}}
						/>
					))}
				</ul>
			)}
			
			{navItems.map((item, index) => (
				<div key={index}>
					{item.subNav && item.subNav.length > 0 && clickedItem === item.title && (
						<SubMenu
							subNav={item.subNav}
							backIcon={backIcon}
							onClick={() => {
								setIsSubMenuVisible(false)
								setClickedItem(null);
							}}
						/>
					)}
				</div>
			))}
        </div>
    )
}