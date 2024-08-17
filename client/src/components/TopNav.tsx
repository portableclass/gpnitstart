import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../assets/styles/scss/topNav.scss'
import { ReactComponent as SVGNotifications } from '../assets/img/topnav/notifications.svg'
import { ReactComponent as SVGMessages } from '../assets/img/topnav/messages.svg'
import { ReactComponent as SVGAvatar } from '../assets/img/topnav/avatar.svg'
import { ReactComponent as SVGDropdownArrow } from '../assets/img/topnav/dropdown-arrow.svg'
import useTheme from '../hooks/useTheme'

const TopNav: FC = () => {
    const navigate = useNavigate()
    const { theme, setTheme } = useTheme()

    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const handleClick = () => {
        // dispatch(logout())
        navigate('/')
    }

    return (
        <div className='topnav-wrapper d-flex'>
            <div className='topnav d-flex w-100 justify-content-between'>
                <div className='title-wrapper d-flex'>
                    <Link to='/'>
                        <h1>it·start</h1>
                    </Link>
                    <span className='separator' />
                    <h2>Стажерская программа ГПН</h2>
                </div>
                <div className='tools-wrapper d-flex'>
                    <span className='separator' />
                    <div className='notifications tools-icon'>
                        <a href='/#/'>
                            <SVGNotifications
                                style={{ height: '24px', width: '22px' }}
                            />
                        </a>
                    </div>
                    <div
                        className='messages tools-icon'
                        style={{ marginLeft: '25px' }}
                    >
                        <a href='/#/'>
                            <SVGMessages
                                style={{ height: '22px', width: '24px' }}
                            />
                        </a>
                    </div>
                    <span className='separator' />
                    <div className='dropdown'>
                        <div
                            className='btn user-wrapper'
                            role='button'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                        >
                            <div className='avatar tools-icon'>
                                <SVGAvatar
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                    }}
                                />
                            </div>
                            <div className='user'>
                                <div className='name'>Alexey Yashutkin</div>
                                <div className='role'>admin</div>
                            </div>
                            <div className='dropdown-arr tools-icon'>
                                <SVGDropdownArrow
                                    style={{
                                        height: '15px',
                                        width: '15px',
                                    }}
                                />
                            </div>
                        </div>
                        <ul className='dropdown-menu'>
                            <li className='dropdown-item'>
                                <button
                                    type='button'
                                    onClick={() => handleTheme()}
                                >
                                    Сменить тему
                                </button>
                            </li>
                            <li className='dropdown-item'>
                                <button
                                    type='button'
                                    onClick={() => handleClick()}
                                >
                                    Выйти
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav
