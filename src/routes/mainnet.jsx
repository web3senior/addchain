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
import Heading from './helper/Heading'
import { Title } from './helper/DocumentTitle'

export const loader = async () => {
    return defer({ mainnet: getMainnetNetworks() })
}

export default function Mainnet() {
    Title('Mainnet Networks')
    const [loaderData, setLoaderData] = useState(useLoaderData())
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    return (
        <>
            <Header loaderData={loaderData} setLoaderData={setLoaderData} networkType='mainnet' />
            <Heading name='Mainnet' />
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