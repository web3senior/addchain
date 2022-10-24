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
import Heading from './helper/Heading'
import { Title } from './helper/DocumentTitle'

export const loader = async () => {
    return defer({ testnet: getTestnetNetworks() })
}

export default function Testnet() {
    Title('Testnet Networks')
    const [loaderData, setLoaderData] = useState(useLoaderData())

    return (
        <>
            <Header loaderData={loaderData} setLoaderData={setLoaderData} networkType='testnet' />
            <Heading name='Testnet' />
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