import React from 'react'
import styles from '../../styles/module/Chain.module.scss'
import Web3 from "web3"

const Chain = ({ data, type }) => {
    const { ethereum } = window
    const web3 = new Web3(Web3.givenProvider)

    const handleAddNetwork = async (name, url, id, symbol, blockExplorerUrls) => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(id) }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                "chainId": web3.utils.toHex(id),
                                "chainName": name,
                                "rpcUrls": url,
                                "nativeCurrency": {
                                    "name": symbol,
                                    "symbol": symbol,
                                    "decimals": 18
                                },
                                "blockExplorerUrls": blockExplorerUrls
                            },
                        ],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
            // handle other "switch" errors
        }
    }

    return (
        <div className='grid grid--fit grid--gap-1 w-100' style={{ '--data-width': '300px' }}>
            {data && data.map((item, i) =>
                <div className={styles.chain} key={i}>
                    <div className={styles.chain__header}>
                        <div>
                            <div className={styles.chain__header__icon}>
                                <img alt={`logo`} src={item.logo} />
                            </div>

                            <h4>{JSON.parse(item.data).chainName}</h4>
                        </div>

                        <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1445 9.69429C10.7734 7.86884 10.7017 5.88669 9.94236 4.10785C9.18305 2.329 7.78654 0.871475 6.00647 0C5.96643 2.76429 5.83295 4.15286 4.40466 5.52857C3.02977 6.85286 -0.627697 8.30571 0.0931188 12.4714C0.573662 15.2871 3.2033 17.3314 5.83294 18C5.83294 16.7786 6.6739 15.4157 8.70286 13.8471C8.71621 16.2386 8.48928 17.19 10.1311 18C12.5739 17.2414 15.3237 15.1457 15.871 12.4714C16.5918 8.94857 14.1223 7.2 12.6807 5.78571C13.1612 7.67571 12.2936 9.69429 10.1445 9.69429Z"
                                fill={`${(type === 'mainnet') ? '#2962FF' : '#FF9800'}`} />
                        </svg>
                    </div>
                    <div className={styles.chain__main}>
                        <ul>
                            <li>
                                <span>Chain ID</span>
                                <span>{JSON.parse(item.data).chainId}</span>
                            </li>
                            <li>
                                <span>Currency</span>
                                <span>{JSON.parse(item.data).nativeCurrency.symbol}</span>
                            </li>
                        </ul>
                        <div className={styles.chain__main_action}>
                            <input value={JSON.parse(item.data).rpcUrls[0]} />
                            <span onClick={() => {
                                if (!navigator.clipboard) return;
                                navigator.clipboard.writeText(JSON.parse(item.data).rpcUrls[0]).then(function () {
                                    console.log('Async: Copying to clipboard was successful!');
                                }, function (err) {
                                    console.error('Async: Could not copy text: ', err);
                                });
                            }}>
                                <svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.55 34.2C2.78333 34.2 2.125 33.9333 1.575 33.4C1.025 32.8667 0.75 32.2167 0.75 31.45V7.7H2.3V31.45C2.3 31.75 2.43333 32.0333 2.7 32.3C2.96667 32.5667 3.25 32.7 3.55 32.7H21.1V34.2H3.55ZM8.6 29.15C7.83333 29.15 7.18333 28.8833 6.65 28.35C6.11667 27.8167 5.85 27.15 5.85 26.35V3C5.85 2.23333 6.11667 1.575 6.65 1.025C7.18333 0.474997 7.83333 0.199997 8.6 0.199997H26C26.7667 0.199997 27.4167 0.474997 27.95 1.025C28.4833 1.575 28.75 2.23333 28.75 3V26.35C28.75 27.15 28.4833 27.8167 27.95 28.35C27.4167 28.8833 26.7667 29.15 26 29.15H8.6ZM8.6 27.6H26C26.3 27.6 26.5833 27.475 26.85 27.225C27.1167 26.975 27.25 26.6833 27.25 26.35V3C27.25 2.7 27.1167 2.41666 26.85 2.15C26.5833 1.88333 26.3 1.75 26 1.75H8.6C8.3 1.75 8.025 1.88333 7.775 2.15C7.525 2.41666 7.4 2.7 7.4 3V26.35C7.4 26.6833 7.525 26.975 7.775 27.225C8.025 27.475 8.3 27.6 8.6 27.6V27.6ZM7.4 27.6V1.75V27.6V27.6Z" fill="black" />
                                </svg>

                            </span>
                        </div>
                    </div>

                    <div className={styles.chain__footer}>
                        <button onClick={() => {
                            handleAddNetwork(
                                JSON.parse(item.data).chainName,
                                JSON.parse(item.data).rpcUrls,
                                JSON.parse(item.data).chainId,
                                JSON.parse(item.data).nativeCurrency.symbol,
                                JSON.parse(item.data).blockExplorerUrls,
                            )
                        }} title='This will allow this network to be used within MetaMask.'>Add Network</button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Chain;