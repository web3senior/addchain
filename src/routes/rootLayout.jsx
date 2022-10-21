import {
    Outlet,
    useLoaderData
} from 'react-router-dom';
import Aside from './components/Aside'
import Header from './components/Header'

export default function Root() {
    return (
        <>
            <Header />
            <Aside />
            <main className='ms-motion-fadeIn'>
                <Outlet />
            </main>
        </>
    );
}