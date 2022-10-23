import React, { useEffect, useState } from 'react'
import MetaMask from './../../images/MetaMask.svg'
import { getTestnetNetworks, getMainnetNetworks, searchNetworks } from '../../util/api'

const Header = ({ setLoaderData, networkType }) => {
    const [wallet, setWallet] = useState(null)
    // const [wallet, setWallet] = useState(null)

    const handleWalletConnect = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setWallet(accounts[0])

        } catch (e) {
            console.error(e)
        }
    }

    const handleSearch = async (e) => {
        if (e.target.value.length >= 3) {
            setLoaderData({ mainnet: await searchNetworks(e.target.value) })
        } else {
            setLoaderData({ mainnet: (networkType === 'mainnet') ? await getMainnetNetworks() : await getTestnetNetworks() })
        }
    }

    useEffect(() => {
        handleWalletConnect()
    }, [])

    return (
        <header>
            <div className='__frame' data-width='large'>
                <ul>
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
            </div>
        </header>
    );
}

export default Header;