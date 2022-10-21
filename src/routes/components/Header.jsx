import React, { useEffect, useState } from 'react'
import Web3sign from './Wallet';

import MetaMask from './../../images/MetaMask.svg'

const Header = () => {
    const [wallet, setWallet] = useState(null)

    const web3sign = new Web3sign()

    useEffect(() => {
        try {
            web3sign.getAccount().then((response) => {
                console.log(response)
                setWallet(response[0])
                // More code here
            })

        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <header>
            <ul>
                <li>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="ETH, Polygon, ..."
                            type="search"
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
                            <button className='btn-connect' onClick={() => {
                                try {
                                    web3sign.getAccount().then((response) => {
                                        console.log(response)
                                        setWallet(response[0])
                                        // More code here
                                    })

                                } catch (e) {
                                    console.error(e)
                                }
                            }}>Connect Wallet</button>
                        </>) : (<>
                            <button className='btn-metamask'>
                                <img alt='MetaMask' src={MetaMask} />
                                {`${wallet.slice(0, 6)} ... ${wallet.slice(-4)}`}
                            </button>
                        </>)
                    }
                </li>
            </ul>
        </header>
    );
}

export default Header;