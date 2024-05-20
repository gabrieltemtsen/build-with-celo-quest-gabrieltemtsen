const { ethers } = require("hardhat");

//CA- 0x503Ce8c70Bbf1791920DaFFFE449c38191f63437
//CA celo - 0x9f4Bf4D2aEc7C5C79256c47480d4aad261Dd645C

async function interact() {
    const contractAddress = "0x503Ce8c70Bbf1791920DaFFFE449c38191f63437";
    const contractABI = [
        // contract ABI here
    ];

    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Set the winner name and address
    const winnerName = "John Doe";
    const winnerAddress = "0x123456789abcdef";
    await contract.setWinner(winnerName, winnerAddress);

    // Set the reward amount
    const rewardAmount = ethers.utils.parseEther("10");
    await contract.setRewardAmount(rewardAmount);

    // Pay the reward
    await contract.payReward();

    console.log("Interactions completed successfully!");
}

interact().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});