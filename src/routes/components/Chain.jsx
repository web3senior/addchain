import React, { useEffect, useState } from 'react'
import styles from '../../styles/modules/Chain.module.scss'

const Chain = ({ data }) => {
    const check = async () => {
        console.log('check')
        try {

            await window.ethereum.request(
                {
                    "jsonrpc": "2.0",
                    "method": "wallet_addEthereumChain",
                    "params": [
                        {
                            "chainId": "0x64",
                            "chainName": "Gnosis",
                            "rpcUrls": [
                                "https://rpc.gnosischain.com"
                            ],
                            "iconUrls": [
                                "https://xdaichain.com/fake/example/url/xdai.svg",
                                "https://xdaichain.com/fake/example/url/xdai.png"
                            ],
                            "nativeCurrency": {
                                "name": "xDAI",
                                "symbol": "xDAI",
                                "decimals": 18
                            },
                            "blockExplorerUrls": [
                                "https://blockscout.com/xdai/mainnet"
                            ]
                        }
                    ],
                    "id": 0
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={styles.chain}>
            <div className={styles.chain__header}>
                <div>
                    <div className={styles.chain__header__icon}>
                        <img alt={`logo`} src={JSON.parse(data.data).iconUrls[0]} />
                    </div>

                    <h4>{JSON.parse(data.data).chainName}</h4>
                </div>

                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1445 9.69429C10.7734 7.86884 10.7017 5.88669 9.94236 4.10785C9.18305 2.329 7.78654 0.871475 6.00647 0C5.96643 2.76429 5.83295 4.15286 4.40466 5.52857C3.02977 6.85286 -0.627697 8.30571 0.0931188 12.4714C0.573662 15.2871 3.2033 17.3314 5.83294 18C5.83294 16.7786 6.6739 15.4157 8.70286 13.8471C8.71621 16.2386 8.48928 17.19 10.1311 18C12.5739 17.2414 15.3237 15.1457 15.871 12.4714C16.5918 8.94857 14.1223 7.2 12.6807 5.78571C13.1612 7.67571 12.2936 9.69429 10.1445 9.69429Z" fill="#2962FF" />
                </svg>
            </div>
            <div className={styles.chain__main}>
                <ul>
                    <li>
                        <span>Chain ID</span>
                        <span>1</span>
                    </li>
                    <li>
                        <span>Currency</span>
                        <span>ETH</span>
                    </li>
                </ul>
            </div>
            <div className={styles.chain__footer}>
                <button onClick={() => { check() }}>Add Network</button>
            </div>
        </div>
    )
}

export default Chain;