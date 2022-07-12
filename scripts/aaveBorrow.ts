import { ethers, getNamedAccounts, network } from "hardhat"
import { Address } from "hardhat-deploy/dist/types"
import { networkConfig } from "../helper-hardhat-config"
import { getWeth, AMOUNT } from "./getWeth"
import { ILendingPool } from "../typechain-types"
import { BigNumber } from "ethers"

const aaveBorrow = async () => {
    //the protocol treats everything as an ERC20 token
    await getWeth()
    const { deployer } = await getNamedAccounts()
    //need abi and address to interact with aave protocol
    //lendingpool address: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    //lending pool ^
    const lendingPool: ILendingPool = await getLendingPool(deployer)
    console.log(`LendingPool Address ${lendingPool.address}`)

    //deposit. Need approve first
    const wethTokenAddress = networkConfig[network.config!.chainId!].wethToken!
    //then approve
    await approveERC20(wethTokenAddress, lendingPool.address, AMOUNT, deployer)
    console.log("Depositing...")
    await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    console.log("Deposited!")
    //getting borrowing stats
    let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(lendingPool, deployer)
    const daiPrice = await getDaiPrice()
    const amountDaiToBorrow = availableBorrowsETH.div(daiPrice)
    console.log(`You can borrow ${amountDaiToBorrow} DAI`)
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
    //availableBorrowsETH?what conversion rate on DAI is?
    //borrow time!
    //know first how much we have borrowed, have in collateral, we can borrow(getting borrowing stats above)
    await borrowDai
}

const borrowDai = async (
    daiAddress: string,
    lendingPool: ILendingPool,
    amountDaiToBorrowWei: string,
    account: Address
) => {
    const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrowWei, 1, 0, account)
    await borrowTx.wait(1)
    console.log("You borrowed!")
}

const getDaiPrice = async () => {
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        networkConfig[network.config!.chainId!].daiEthPriceFeed!
        //reading no need signer(account/depoyer)
    )
    const price = (await daiEthPriceFeed.latestRoundData())[1]
    console.log(`The DAI/ETH price is ${price.toString()}`)
    return price
}

const getBorrowUserData = async (lendingPool: ILendingPool, account: Address) => {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
        await lendingPool.getUserAccountData(account)
    console.log(`You have ${totalCollateralETH} worth of ETH deposited`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed`)
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH`)
    return { availableBorrowsETH, totalDebtETH }
}

const getLendingPool = async (account: Address): Promise<ILendingPool> => {
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

const approveERC20 = async (
    erc20Address: string,
    spenderAddress: string,
    amountToSpend: string,
    account: Address
) => {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("Approved")
}

aaveBorrow()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
