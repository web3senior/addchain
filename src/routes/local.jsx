import { useState } from "react";
import { useLoaderData } from 'react-router-dom'
import Heading from './helper/Heading'
import Web3 from 'web3'
import { Title } from './helper/DocumentTitle'

export default function Local() {
    Title('Local Networks')
    const [data, setData] = useState(useLoaderData())
    const { ethereum } = window;
    const web3 = new Web3(Web3.givenProvider)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(document.forms[0]);

        let dataCombine = (data) ? JSON.parse(data) : []
        console.log(dataCombine)
        dataCombine.push({
            name: formData.get('name'),
            url: formData.get('url'),
            id: formData.get('id'),
            symbol: formData.get('symbol'),
            explorer: formData.get('explorer')
        })

        localStorage.setItem('rpc', JSON.stringify(dataCombine))
        setData(JSON.stringify(dataCombine))
        document.forms[0].reset()
    }

    const handleDelete = (i) => {
        let jsonObj = JSON.parse(data)
        delete jsonObj[i];

        jsonObj = jsonObj.filter(n => n)
        localStorage.setItem('rpc', JSON.stringify(jsonObj))
        setData(JSON.stringify(jsonObj))
    }

    const handleAddNetwork = async (name, url, id, symbol, explorer) => {
        await ethereum.request(
            {
                "jsonrpc": "2.0",
                "method": "wallet_addEthereumChain",
                "params": [
                    {
                        "chainId": web3.utils.toHex(id),
                        "chainName": name,
                        "rpcUrls": [url],
                        "nativeCurrency": {
                            "name": `${name} coin`,
                            "symbol": symbol,
                            "decimals": 18
                        }
                    }
                ],
                "id": 0
            }
        );
    }

    return (
        <>
            <Heading name='Local' />
            <output id='output'>
                {
                    data && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Network name</th>
                                    <th>RPC URL</th>
                                    <th>Chain ID</th>
                                    <th>Currency symbol</th>
                                    <th>Block explorer URL</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && JSON.parse(data).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{item.name}</td>
                                                <td>{item.url}</td>
                                                <td>{item.id}</td>
                                                <td>{item.symbol}</td>
                                                <td>{item.explorer}</td>
                                                <td style={{ display: 'flex' }}>
                                                    <button onClick={() => handleAddNetwork(
                                                        item.name,
                                                        item.url,
                                                        item.id,
                                                        item.symbol,
                                                        item.explorer
                                                    )}>
                                                        Add Network
                                                    </button>
                                                    <button onClick={() => handleDelete(i)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </output>

            <br />

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Network name</legend>
                        <input name='name' placeholder='My local network' required />
                    </fieldset>
                    <fieldset>
                        <legend>New RPC URL</legend>
                        <input list='localhost-urls' name='url' placeholder='http://127.0.0.1:7545' required />
                        <datalist id='localhost-urls'>
                            <option value="http://127.0.0.1:7545" />
                            <option value="http://127.0.0.1:8545" />
                        </datalist>
                    </fieldset>
                    <fieldset>
                        <legend>Chain ID</legend>
                        <input type='number' name='id' placeholder='5777' required />
                    </fieldset>
                    <fieldset>
                        <legend>Currency symbol</legend>
                        <input name='symbol' placeholder='ETH' required />
                    </fieldset>
                    <fieldset>
                        <legend>Block explorer URL(Optional)</legend>
                        <input name='explorer' placeholder='https://' />
                    </fieldset>
                    <button type="submit">Save network</button>
                </form>
            </div>
        </>
    );
}