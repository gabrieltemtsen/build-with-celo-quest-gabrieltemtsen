import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const [isMinipay, setIsMinipay] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
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
