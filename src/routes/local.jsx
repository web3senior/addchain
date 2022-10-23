import {
    Outlet,
    Link,
    useLoaderData
} from "react-router-dom";

export default function Local() {
    const data = useLoaderData()

    return (
        <>
            <h2>Local</h2>
            <mark>Coming Soon</mark>
            {/* <form method="post">
                <button type="submit">New</button>
            </form> */}
        </>
    );
}