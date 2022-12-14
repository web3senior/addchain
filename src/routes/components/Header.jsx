import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MetaMask from './../../images/MetaMask.svg'
import { getTestnetNetworks, getMainnetNetworks, searchNetworks } from '../../util/api'
import Web3 from 'web3'


const Header = ({ loaderData, setLoaderData, networkType }) => {
    const [wallet, setWallet] = useState(null)
    let activeClassName = 'active'
    const web3 = new Web3(Web3.givenProvider)


    const handleSearch = async (e) => {

        if (e.target.value.length >= 3) {
            let result = await searchNetworks(e.target.value, networkType)
            setLoaderData((networkType === 'mainnet' ? { mainnet: result } : { testnet: result }))
        } else {
            let result = (networkType === 'mainnet') ? await getMainnetNetworks() : await getTestnetNetworks()
            setLoaderData((networkType === 'mainnet' ? { mainnet: result } : { testnet: result }))
        }

        console.log(loaderData)
    }

    const handleWalletConnect = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setWallet(accounts[0])

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        // web3.eth.getAccounts()
        window.setTimeout(() => {
            if (window.ethereum._state.accounts.length > 0) handleWalletConnect()
        }, 1000)

    }, [])

    return (
        <header>
            <div className='__frame' data-width='large'>
                <ul className='first'>
                    <li>
                        <form id="search-form" role="search">
                            <input
                                id="q"
                                aria-label="Search contacts"
                                placeholder="ETH, Polygon, ..."
                                type="search"
                                onKeyUp={(e) => { handleSearch(e) }}
                                name="q" />
                            <div
                                id="search-spinner"
                                aria-hidden
                                hidden={true} />
                            <div
                                className="sr-only"
                                aria-live="polite">

                            </div>
                        </form>
                    </li>
                    <li>
                        {
                            !wallet ? (<>
                                <button className='btn-connect' onClick={() => handleWalletConnect()}>Connect Wallet</button>
                            </>) : (<>
                                <button className='btn-metamask'>
                                    <img alt='MetaMask' src={MetaMask} />
                                    {`${wallet.slice(0, 6)} ... ${wallet.slice(-4)}`}
                                </button>
                            </>)
                        }
                    </li>
                </ul>


                <nav>
                    <ul>
                        <li>
                            <NavLink to={`/mainnet`} className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_8_1117)">
                                        <path d="M33.225 40H10.725C10.3935 40 10.0755 40.1317 9.84109 40.3661C9.60667 40.6005 9.47498 40.9185 9.47498 41.25C9.47498 41.5815 9.60667 41.8995 9.84109 42.1339C10.0755 42.3683 10.3935 42.5 10.725 42.5H33.225C33.5565 42.5 33.8744 42.3683 34.1089 42.1339C34.3433 41.8995 34.475 41.5815 34.475 41.25C34.475 40.9185 34.3433 40.6005 34.1089 40.3661C33.8744 40.1317 33.5565 40 33.225 40Z" />
                                        <path d="M18.4 12.3375C18.4627 12.7269 18.4427 13.1251 18.3415 13.5062C18.2403 13.8874 18.0601 14.243 17.8125 14.55C19.3443 17.1683 21.4516 19.4039 23.975 21.0875C24.4 21.375 24.8375 21.625 25.225 21.875C25.622 21.4361 26.1459 21.1317 26.7238 21.004C27.3017 20.8763 27.905 20.9317 28.45 21.1625C30.3984 18.5818 31.7284 15.5883 32.3375 12.4125C27.8322 10.8213 22.9221 10.7949 18.4 12.3375Z" />
                                        <path d="M22.1875 2.5C17.5462 2.5 13.095 4.34375 9.81313 7.62563C6.53124 10.9075 4.6875 15.3587 4.6875 20C4.6875 20.5625 4.6875 21.1125 4.775 21.6625C5.09711 25.0378 6.39283 28.2469 8.50465 30.8996C10.6165 33.5523 13.4534 35.5344 16.6706 36.6049C19.8879 37.6754 23.3468 37.7882 26.627 36.9297C29.9071 36.0712 32.8672 34.2782 35.1475 31.7688C37.4277 29.2594 38.9299 26.1416 39.4713 22.7945C40.0127 19.4474 39.5702 16.015 38.1974 12.9147C36.8246 9.81435 34.5807 7.1796 31.7385 5.3307C28.8963 3.4818 25.5782 2.49838 22.1875 2.5ZM35.125 26.3625C33.3028 26.3562 31.4886 26.121 29.725 25.6625C29.306 26.232 28.6911 26.6263 27.9987 26.7694C27.3063 26.9125 26.5854 26.7942 25.975 26.4375C23.4052 28.5054 20.4212 29.9974 17.225 30.8125C17.128 31.3269 16.8948 31.8059 16.5496 32.1995C16.2044 32.5931 15.7599 32.8868 15.2625 33.05L14.9 33.125C13.2829 32.2309 11.846 31.0441 10.6625 29.625H11.4875C11.607 29.0298 11.9096 28.4868 12.3529 28.072C12.7961 27.6571 13.358 27.3912 13.9598 27.3113C14.5616 27.2314 15.1733 27.3416 15.7095 27.6265C16.2456 27.9113 16.6793 28.3566 16.95 28.9C19.7836 28.1521 22.4311 26.824 24.725 25C24.5248 24.5402 24.4473 24.0363 24.5 23.5375C23.975 23.2375 23.45 22.925 22.9375 22.5875C20.2143 20.7819 17.9294 18.3902 16.25 15.5875C15.7481 15.7253 15.2182 15.7248 14.7166 15.5862C14.2149 15.4476 13.76 15.1759 13.4 14.8C11.0749 16.5032 8.97486 18.4941 7.15 20.725V20.0125C7.15606 19.2884 7.21455 18.5657 7.325 17.85C8.82438 16.01 10.5946 14.4084 12.575 13.1C12.5047 12.5482 12.5974 11.9878 12.8418 11.4881C13.0861 10.9883 13.4713 10.5709 13.95 10.2875C13.8 9.75 13.65 9.2125 13.5375 8.6625C13.5375 8.4875 13.5375 8.3 13.4 7.8625C13.9456 7.46177 14.5178 7.09844 15.1125 6.775C15.2375 7.5125 15.2875 7.9 15.375 8.2875C15.4625 8.675 15.625 9.35 15.775 9.875H16.0875C16.6232 9.9989 17.1129 10.2719 17.5 10.6625C22.3933 8.93684 27.7246 8.90603 32.6375 10.575V9.325C34.0329 10.6999 35.1456 12.3349 35.9125 14.1375C35.3042 13.7792 34.6875 13.4542 34.0625 13.1625C33.353 16.5103 31.9053 19.6577 29.825 22.375C30.0938 22.8247 30.2363 23.3386 30.2375 23.8625C32.2925 24.2879 34.3895 24.4766 36.4875 24.425C36.2779 25.0794 36.0231 25.7184 35.725 26.3375L35.125 26.3625Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8_1117">
                                            <rect width="45" height="45" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span>Mainnet</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`/testnet`} className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_8_540)">
                                        <path d="M33.225 40H10.725C10.3935 40 10.0755 40.1317 9.84109 40.3661C9.60667 40.6005 9.47498 40.9185 9.47498 41.25C9.47498 41.5815 9.60667 41.8995 9.84109 42.1339C10.0755 42.3683 10.3935 42.5 10.725 42.5H33.225C33.5565 42.5 33.8744 42.3683 34.1089 42.1339C34.3433 41.8995 34.475 41.5815 34.475 41.25C34.475 40.9185 34.3433 40.6005 34.1089 40.3661C33.8744 40.1317 33.5565 40 33.225 40Z" />
                                        <path d="M22.1875 2.5C17.5462 2.5 13.095 4.34375 9.81313 7.62563C6.53124 10.9075 4.6875 15.3587 4.6875 20C4.6875 20.5625 4.6875 21.1125 4.775 21.6625C5.09711 25.0378 6.39283 28.2469 8.50465 30.8996C10.6165 33.5523 13.4534 35.5344 16.6706 36.6049C19.8879 37.6754 23.3468 37.7882 26.627 36.9297C29.9071 36.0712 32.8672 34.2782 35.1475 31.7688C37.4277 29.2594 38.9299 26.1416 39.4713 22.7945C40.0127 19.4474 39.5702 16.015 38.1974 12.9147C36.8246 9.81435 34.5807 7.1796 31.7385 5.3307C28.8963 3.4818 25.5782 2.49838 22.1875 2.5ZM22.1875 5C26.1399 5.00344 29.9313 6.56669 32.7375 9.35V10.6C27.797 8.89977 22.4264 8.9218 17.5 10.6625C17.1064 10.279 16.6124 10.0146 16.075 9.9H15.7625C15.6125 9.375 15.475 8.85 15.3625 8.3125C15.25 7.775 15.1875 7.3 15.125 6.7875C17.295 5.61646 19.7217 5.00227 22.1875 5ZM18.4375 12.3375C22.9771 10.8173 27.897 10.8746 32.4 12.5C31.7909 15.6758 30.4609 18.6693 28.5125 21.25C27.9675 21.0192 27.3642 20.9638 26.7863 21.0915C26.2084 21.2192 25.6845 21.5236 25.2875 21.9625C24.85 21.7125 24.4125 21.4625 24.0375 21.175C21.5141 19.4914 19.4068 17.2558 17.875 14.6375C18.1226 14.3305 18.3028 13.9749 18.404 13.5937C18.5052 13.2126 18.5252 12.8144 18.4625 12.425L18.4375 12.3375ZM13.4375 7.8375C13.4375 8.1 13.5125 8.375 13.5625 8.6375C13.675 9.1875 13.825 9.725 13.975 10.2625C13.4963 10.5459 13.1111 10.9633 12.8668 11.4631C12.6224 11.9628 12.5297 12.5232 12.6 13.075C10.6269 14.3635 8.86446 15.9488 7.375 17.775C7.67387 15.7972 8.36529 13.8992 9.40858 12.1925C10.4519 10.4859 11.826 9.0052 13.45 7.8375H13.4375ZM13.4375 27.475C12.9495 27.6388 12.5134 27.9285 12.1732 28.3148C11.8331 28.701 11.6008 29.1702 11.5 29.675H10.7C8.68134 27.2673 7.474 24.284 7.25 21.15L7.3875 20.9125C8.95277 18.4854 10.9991 16.4051 13.4 14.8C13.76 15.1759 14.2149 15.4476 14.7166 15.5862C15.2182 15.7248 15.7481 15.7253 16.25 15.5875C17.9219 18.4129 20.2074 20.8265 22.9375 22.65C23.45 22.9875 23.975 23.3 24.5 23.6C24.458 24.0781 24.5353 24.5591 24.725 25C22.4375 26.8165 19.7988 28.1401 16.975 28.8875C16.6475 28.2757 16.1132 27.8002 15.4675 27.546C14.8217 27.2918 14.1067 27.2755 13.45 27.5L13.4375 27.475ZM22.1875 34.975C19.6453 34.9757 17.1452 34.3259 14.925 33.0875L15.275 33.0125C15.7724 32.8493 16.2169 32.5556 16.5621 32.162C16.9073 31.7684 17.1405 31.2894 17.2375 30.775C20.4337 29.9599 23.4177 28.4679 25.9875 26.4C26.5979 26.7567 27.3188 26.875 28.0112 26.7319C28.7036 26.5888 29.3185 26.1945 29.7375 25.625C31.5011 26.0835 33.3153 26.3187 35.1375 26.325H35.8C34.5941 28.9182 32.6719 31.1127 30.2601 32.6497C27.8483 34.1867 25.0474 35.0021 22.1875 35V34.975ZM30.325 23.85C30.3238 23.3261 30.1813 22.8122 29.9125 22.3625C31.9928 19.6452 33.4405 16.4978 34.15 13.15C34.775 13.4417 35.3917 13.7667 36 14.125C37.3748 17.3736 37.5607 21.0029 36.525 24.375C34.4497 24.5355 32.3621 24.371 30.3375 23.8875L30.325 23.85Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8_540">
                                            <rect width="45" height="45" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span>Testnet</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={`/local`} className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_8_498)">
                                        <path d="M42.3875 23.0875L38.475 10.5125C38.3175 10.0022 38.0007 9.55585 37.571 9.23868C37.1414 8.92152 36.6215 8.75027 36.0875 8.75H8.9125C8.37848 8.75027 7.85858 8.92152 7.42895 9.23868C6.99932 9.55585 6.68253 10.0022 6.525 10.5125L2.6125 23.1C2.53832 23.3388 2.5004 23.5874 2.5 23.8375V33.75C2.5 34.413 2.76339 35.0489 3.23223 35.5178C3.70107 35.9866 4.33696 36.25 5 36.25H40C40.663 36.25 41.2989 35.9866 41.7678 35.5178C42.2366 35.0489 42.5 34.413 42.5 33.75V23.825C42.4996 23.5749 42.4617 23.3263 42.3875 23.0875ZM40 33.75H5V23.825L8.9125 11.25H36.0875L40 23.825V33.75Z" />
                                        <path d="M8.90002 27.5H11.15V31.25H8.90002V27.5Z" />
                                        <path d="M15.15 27.5H17.4V31.25H15.15V27.5Z" />
                                        <path d="M21.3875 27.5H23.6375V31.25H21.3875V27.5Z" />
                                        <path d="M27.625 27.5H29.875V31.25H27.625V27.5Z" />
                                        <path d="M33.875 27.5H36.125V31.25H33.875V27.5Z" />
                                        <path d="M7.78748 22.5H37.4V24.25H7.78748V22.5Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8_498">
                                            <rect width="45" height="45" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span>Local</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;