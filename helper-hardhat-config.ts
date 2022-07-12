import { ethers } from "hardhat"

export interface networkConfigItem {
    name?: string
    wethToken?: string
    lendingPoolAddressesProvider?: string
    daiEthPriceFeed?: string
    daiToken?: string
    blockConfirmations?: number
    ethUsdPriceFeed?: string
    // vrfCoordinatorV2?: string
    // raffleEntranceFee?: any
    // gasLane?: string
    // subscriptionId?: string
    // callbackGasLimit?: string
    // keeperUpdateInterval?: string
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    31337: {
        name: "localhost",
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        lendingPoolAddressesProvider: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        daiEthPriceFeed: "0x773616E4d11A78F511299002da57A0a94577F1f4",
        daiToken: "0x6b175474e89094c44da98b954eedeac495271d0f",
        // vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        // raffleEntranceFee: ethers.utils.parseEther("0.1"), // 0.1 ETH
        // gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        // subscriptionId: "6727",
        // callbackGasLimit: "500000" /*500,000*/,
        // keeperUpdateInterval: "30",

        // ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    42: {
        name: "kovan",
        wethToken: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
        lendingPoolAddressesProvider: "0x88757f2f99175387aB4C6a4b3067c77A695b0349",
        daiEthPriceFeed: "0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541",
        daiToken: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    },
    // 4: {
    //     name: "rinkeby",
    //     vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    //     raffleEntranceFee: "100000000000000000", // 0.1 ETH
    //     gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    //     subscriptionId: "6727", //for rinkeby
    //     callbackGasLimit: "500000" /*500,000*/,
    //     keeperUpdateInterval: "30",

    //     // ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    // },
    // 80001: {
    //     name: "polygon(mumbai-testnet)",
    //     // ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    // },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
