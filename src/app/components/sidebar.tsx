import * as React from 'react';

import * as logo from '../images/logo.png';
import { styled, css, FontAwesomeIcon, Theme } from '../styles';

interface SidebarProps {
    className?: string;
    selectedPageIndex: number;
    pages: Array<{
        name: string,
        icon: string[]
    }>;
    onSelectPage: (selectedPageIndex: number) => void;
}

const sidebarItemStyles = css`
    height: 80px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    box-sizing: border-box;
`;

const SidebarLogo = styled.img.attrs({
    src: logo,
    alt: 'HTTP Toolkit logo'
})`
    ${sidebarItemStyles}
`

const SidebarItem = styled.div`
    ${sidebarItemStyles}

    width: calc(100% + 2px);
    margin: 0 -1px;

    cursor: pointer;
    user-select: none;
    flex-direction: column;

    border-width: 0 5px;
    border-style: solid;
    border-color: transparent;

    ${(p: { selected: boolean, theme?: Theme }) => p.selected && css`
        font-weight: bold;
        color: #000;
        border-right-color: ${p.theme!.popColor};
    `}

    > svg {
        margin-bottom: 5px;
    }
`;

export const Sidebar = styled((props: SidebarProps) =>
    <nav className={props.className}>
        <SidebarLogo />
        {props.pages.map((page, i) =>
            <SidebarItem
                selected={i === props.selectedPageIndex}
                onClick={() => props.onSelectPage(i)}
            >
                <FontAwesomeIcon size='2x' icon={page.icon} />
                {page.name}
            </SidebarItem>
        )}
    </nav>
)`
    width: 90px;
    background-color: ${p => p.theme.mainBackground};
    color: ${p => p.theme.mainColor};
    z-index: 1;

    border-right: 1px solid rgba(0,0,0,0.12);
    box-sizing: border-box;
    box-shadow: 0 0 30px rgba(0,0,0,0.2);

    font-size: ${p => p.theme.fontSize};
`;