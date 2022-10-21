export async function getMainnetNetworks() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}rpc?type=mainnet`)
    if (!response.ok) {
        throw { message: 'Failed to fetch mainnet networks', status: 500 }
    }
    return response.json()
}

export async function getTestnetNetworks() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}rpc?type=testnet`)
    if (!response.ok) {
        throw { message: 'Failed to fetch testnet networks', status: 500 }
    }
    return response.json()
}