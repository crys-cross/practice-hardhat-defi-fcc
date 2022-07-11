import { ethers, getNamedAccounts, network } from "hardhat"
import { Address } from "hardhat-deploy/dist/types"
import { networkConfig } from "../helper-hardhat-config"
import { getWeth } from "./getWeth"
import { ILendingPool } from "../typechain-types"

const aaveBorrow = async () => {
    //the protocol treats everything as an ERC20 token
    await getWeth()
    const { deployer } = await getNamedAccounts()
    //need abi and address to interact with aave protocol
    //lendingpool address: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    //lending pool ^
    const lendingPool = await getLendingPool(deployer)
    console.log(`LendingPool Address ${lendingPool.address}`)
}

export const getLendingPool = async (account: Address): Promise<ILendingPool> => {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        networkConfig[network.config.chainId!].lendingPoolAddressesProvider!,
        account
    )
    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool()
    const lendingPool: ILendingPool = await ethers.getContractAt(
        "ILendingPool",
        lendingPoolAddress,
        account
    )
    return lendingPool
}

aaveBorrow()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
