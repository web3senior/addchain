import {
    Link,
    useLoaderData
} from "react-router-dom";
import { getTestnetNetworks } from '../util/api'
import Chain from './components/Chain'
export default function Testnet() {
    const data = useLoaderData()

    return (
        <>
            <h1>Testnet</h1>
            {(data) ? (
                <ul>
                    {data && data.map((item, i) =>
                        <Chain data={item} key={i} />
                    )}
                </ul>
            ) : (
                <p>
                    <i>No data</i>
                </p>
            )}
        </>
    );
}

export function loader() {
    return getTestnetNetworks();
}