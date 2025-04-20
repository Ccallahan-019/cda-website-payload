'use client'

import type { Header as HeaderProps } from "@/payload-types"
import DropdownMenuButton from "../../components/ui/buttons/DropdownMenuButton";
import useScroll from "@/custom-hooks/useScroll";
import Logo from "../../components/nav/header/Logo";
import SideNav from "../../components/nav/side-nav/SideNav";
import Overlay from "../../components/nav/Overlay";
import { useEffect, useState, useRef } from "react";
import HeaderNavTab from "../../components/nav/header/HeaderNavTab";
import { useMediaQuery } from "@/custom-hooks/useMediaQuery";
import { useClickOutside } from "@/custom-hooks/useClickOutside";
import { LinkComponent } from "@/components/link/Link";

export const Header: React.FC<HeaderProps> = (props) => {
    const { navItems, logo, menuIcon, closeIcon, subMenuIcon, backIcon } = props

    const hasScrolled = useScroll(50);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [dropdownOverlay, setDropdownOverlay] = useState(false);
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const isLarge = useMediaQuery('(min-width: 1024px)');
    const sideNavRef = useRef<HTMLDivElement>(null);

    const handleMouseLeave = () => {
        setHoveredItem(null);
        setDropdownOverlay(false);
    }

    const toggleSideNav = () => {
        setIsSideNavVisible(!isSideNavVisible);
        setIsHeaderVisible(!isHeaderVisible)
    }

    useClickOutside(sideNavRef, () => {
        setIsSideNavVisible(false);
        setIsHeaderVisible(false)
    });

    useEffect(() => {
        if (isLarge) {
            setIsSideNavVisible(false);
        }
    }, [isLarge]);

    return (
        <div className="z-[1000] sticky top-0 left-0 w-full">
            <header
                className={`
                    relative px-6 py-1 lg:py-0 border-b
                    ${hasScrolled || hoveredItem || isHeaderVisible ? "bg-background border-gray-300 shadow-md"
                    : "shadow-none bg-transparent border-transparent"
                }`}>
                <div className="flex items-center justify-between">
                    {logo && typeof logo === 'object' && (
                        <Logo logo={logo} />
                    )}
                    
                    <div className="hidden lg:flex items-center justify-center gap-3">
                        {navItems.map((item, index) => (
                            <HeaderNavTab
                                key={index}
                                navItem={item}
                                hoveredItem={hoveredItem}
                                onClick={item.title && item.subNav && item.subNav.length > 0 ? () => {
                                    if (item.title) {
                                        setHoveredItem(item.title)
                                        setDropdownOverlay(true)
                                    }
                                } : () => {
                                    if (item.title) {
                                        setIsHeaderVisible(true)
                                        setHoveredItem(item.title)
                                    }

                                }}
                                onMouseEnter={item.title && item.subNav && item.subNav.length > 0 ? () => {
                                    if (item.title) {
                                        setHoveredItem(item.title)
                                        setDropdownOverlay(true)
                                    }
                                } : () => {
                                    if (item.title) {
                                        setHoveredItem(item.title)
                                    }
                                }}
                                onMouseLeave={handleMouseLeave}
                            />
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <LinkComponent url="/contact-us" appearance="default" size="sm">
                            Contact Us
                        </LinkComponent>

                        <div className="flex items-center" ref={sideNavRef}>
                            {typeof menuIcon === "object" && typeof closeIcon === "object" && (
                                <DropdownMenuButton
                                    menuIcon={menuIcon}
                                    closeIcon={closeIcon}
                                    isClicked={isSideNavVisible}
                                    onClick={toggleSideNav}
                                />
                            )}
                            
                            {isSideNavVisible && typeof subMenuIcon === "object" && typeof backIcon === "object" && (
                                <SideNav
                                    navItems={navItems}
                                    subMenuIcon={subMenuIcon}
                                    backIcon={backIcon}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {dropdownOverlay && (
                <Overlay />
            )}
            {isSideNavVisible && (
                <Overlay />
            )}
        </div>
    )
}