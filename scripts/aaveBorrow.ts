const aaveBorrow = async () => {
    //the protocol treats everything as an ERC20 token
}

aaveBorrow()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
