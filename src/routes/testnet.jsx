import React, { Suspense, useState, defaultProps } from 'react'
import {
    Await,
    defer,
    useLoaderData
} from 'react-router-dom'
import { getTestnetNetworks } from '../util/api'
import Chain from './components/Chain'
import LoadingSpinner from './components/LoadingSpinner'
import Header from './components/Header'

export const loader = async () => {
    return defer({ testnet: getTestnetNetworks() })
}

export default function Testnet() {
    const [loaderData, setLoaderData] = useState(useLoaderData())

    return (
        <>
            <Header loaderData={loaderData} setLoaderData={setLoaderData} networkType='testnet' />
            <h2>Testnet</h2>
            <Suspense fallback={<LoadingSpinner />}>
                <Await
                    resolve={loaderData.testnet}
                    errorElement={<p>⚠️Could not load the networks</p>}
                >
                    {(loaderTestnet) => {
                        return <Chain data={loaderTestnet} type='testnet' />
                    }}
                </Await>
            </Suspense>
        </>
    );
}