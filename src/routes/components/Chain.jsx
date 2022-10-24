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