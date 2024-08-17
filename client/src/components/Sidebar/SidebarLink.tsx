import React, { FC, SVGProps, useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useReduxHooks'
import SidebarLinkActive from './SidebarLinkActive'
import SidebarLinkNonActive from './SidebarLinkNonActive'

export interface SidebarLinkProps {
    title: string
    Icon: FC<SVGProps<SVGSVGElement>>
    link: string
}

const SidebarLink: FC<SidebarLinkProps> = props => {
    const { title, Icon, link } = props
    const match = useMatch({
        path: link,
        end: link.length === 1,
    })

    return (
        <li>
            <Link to={link}>
                {match ? (
                    <SidebarLinkActive title={title} Icon={Icon} />
                ) : (
                    <SidebarLinkNonActive title={title} Icon={Icon} />
                )}
            </Link>
        </li>
    )
}

export default SidebarLink
