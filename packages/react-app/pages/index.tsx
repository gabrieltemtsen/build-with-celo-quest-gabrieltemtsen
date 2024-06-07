import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const { getContract, formatEther, createPublicClient, http } = require("viem");
const { celo } = require("viem/chains");
const { stableTokenABI } = require("@celo/abis");

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const [isMinipay, setIsMinipay] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        async function fetchBalance() {
            if (isConnected && address) {
                let balance = await checkCUSDBalance(publicClient, address);
                setBalance(balance);
            }
        }
        fetchBalance();
        if (window && window.ethereum) {
            // User has a injected wallet
          
            if (window.ethereum.isMinipay) {
              // User is using Minipay
                setIsMinipay(true);
            }
          
            // User is not using MiniPay
            setIsMinipay(false);
          }
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    if (!isMounted) {
        return null;
    }
    async function checkCUSDBalance(publicClient: any, address: any) {
        let StableTokenContract = getContract({
            abi: stableTokenABI,
            address: STABLE_TOKEN_ADDRESS,
            publicClient,
        });
      
        let balanceInBigNumber = await StableTokenContract.read.balanceOf([
            address,
        ]);
      
        let balanceInWei = balanceInBigNumber.toString();
      
        let balanceInEthers = formatEther(balanceInWei);
      
        return balanceInEthers;
      }
      
      const publicClient = createPublicClient({
        chain: celo,
        transport: http(),
      }); // Mainnet
      

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h1">
                There you go... a canvas for your next Celo project!
            </div>
            {isConnected ? (
                <div className="h2 text-center">
                    Your address: {userAddress}
                    {isMinipay && <div>Using Minipay</div>}
                </div>
            ) : (
                <div>No Wallet Connected</div>
            )}
        </div>
    );
}
