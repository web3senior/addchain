import {
    Link,
    useLoaderData
} from "react-router-dom";
import { getMainnetNetworks } from '../util/api'
// import Layout from './components/Layout'
import Chain from './components/Chain'
export default function Mainnet() {
    const data = useLoaderData()

    return (
        <>
            <h2>Mainnet</h2>
            {(data) ? (
                <>
                    {data && data.map((item, i) =>
                        <Chain data={item} key={i} />
                    )}
                </>
            ) : (
                <p>
                    <i>No data</i>
                </p>
            )}
        </>
    );
}

export const loader = async () => {
    return await getMainnetNetworks();
}