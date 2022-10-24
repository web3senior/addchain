export async function getMainnetNetworks() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}rpc?type=mainnet`)
    if (!response.ok) {
        throw new Response('Failed to fetch mainnet networks', { status: 500 })
    }
    // return null;
    return response.json()
}

export async function getTestnetNetworks() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}rpc?type=testnet`)
    if (!response.ok) {
        throw new Response('Failed to fetch testnet networks', { status: 500 })
    }
    return response.json()
}

export async function searchNetworks(q, type) {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}search?q=${q}&type=${type}`)
    if (!response.ok) {
        throw new Response('Failed to search networks', { status: 500 })
    }
    return response.json()
}