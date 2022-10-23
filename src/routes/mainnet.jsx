import { Suspense, useState } from 'react'
import {
    Await,
    defer,
    useLoaderData
} from 'react-router-dom'
import { getMainnetNetworks } from '../util/api'
import Chain from './components/Chain'
import LoadingSpinner from './components/LoadingSpinner'
import Header from './components/Header'

export const loader = async () => {
    return defer({ mainnet: getMainnetNetworks() })
}

export default function Mainnet() {
    const [loaderData, setLoaderData] = useState(useLoaderData())

    return (
        <>
            <Header setLoaderData={setLoaderData} networkType='mainnet' />
            <h2>Mainnet</h2>
            <Suspense fallback={<LoadingSpinner />}>
                <Await
                    resolve={loaderData.mainnet}
                    errorElement={<p>⚠️Could not load the networks</p>}
                >
                    {(loaderMainnet) => {
                        return <Chain data={loaderMainnet} type='mainnet' />
                    }}
                </Await>
            </Suspense>
        </>
    )
}