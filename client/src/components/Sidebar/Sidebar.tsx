import React, { FC, useEffect, useState } from 'react'
import '../../assets/styles/scss/sidebar.scss'
import { LayoutGroup } from 'framer-motion'
import useLocalStorage from '../../hooks/useLocalStorage'
import nullToEmptyString from '../../helpers/nullToEmptyString'
import isNullOrEmptyString from '../../helpers/isNullOrEmptyString'
import { ReactComponent as SVGGlobe } from '../../assets/img/sidebar/globe.svg'
import { ReactComponent as SVGList } from '../../assets/img/sidebar/list-check.svg'
import { ReactComponent as SVGUser } from '../../assets/img/sidebar/fingerprint.svg'
import { ReactComponent as SVGDropdownArrow } from '../../assets/img/shared/arrows/arrow-left.svg'
import SidebarLink from './SidebarLink'

const Sidebar: FC = () => {
    const [sidebarIsActive, setSidebarIsActive] = useLocalStorage<string>(
        'sidebarActive',
        nullToEmptyString(localStorage.getItem('sidebarActive')),
    )

    useEffect(() => {
        if (isNullOrEmptyString(localStorage.getItem('sidebarActive'))) {
            setSidebarIsActive(
                nullToEmptyString(localStorage.getItem('sidebarActive')),
            )
        }
    }, [])

    return (
        <div className='sidebar-wrapper d-flex'>
            <nav className={`sidebar d-flex flex-column ${sidebarIsActive}`}>
                <div className='toggle-wrapper d-flex'>
                    <button
                        type='button'
                        className='toggle'
                        onClick={() =>
                            setSidebarIsActive(prev =>
                                prev === '' ? 'close' : '',
                            )
                        }
                    >
                        <SVGDropdownArrow stroke='var(--text-color-my)' />
                    </button>
                </div>

                <div className='menu-bar d-flex h-100 flex-column justify-content-between'>
                    <div className='menu'>
                        <ul className='nav-links'>
                            <LayoutGroup>
                                <SidebarLink
                                    title='Главная страница'
                                    Icon={SVGGlobe}
                                    link='/'
                                />
                                <SidebarLink
                                    title='Продукты'
                                    Icon={SVGList}
                                    link='/product'
                                />
                                <SidebarLink
                                    title='Пользователи'
                                    Icon={SVGUser}
                                    link='/user'
                                />
                            </LayoutGroup>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
