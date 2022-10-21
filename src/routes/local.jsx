import {
    Outlet,
    Link,
    useLoaderData
} from "react-router-dom";

export default function Local() {
    const data = useLoaderData()
    console.log(data)
    return (
        <>
            <h1>Local</h1>
            <form method="post">
                <button type="submit">New</button>
            </form>
        </>
    );
}