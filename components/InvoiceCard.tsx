import React, { useState } from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import Link from 'next/link';
import { ethers } from 'ethers';
import MarketplaceJson from "@/lib/contract/Marketplace.json";
import { marketplaceAddress } from "@/lib/constant";

interface InvoiceCardProps {
    invoiceKey: number;
    amount: string;
    chain: string;
    dueDate: string;
    buyer: string;
    seller: string;
    payer: string;
    payee: string;
    nftOwner: string;
    // Add other props here if needed
}

interface PurchaseInvoiceProps {
    tokenId: number;
    minBid: ethers.BigNumber;
    onPurchaseSuccess: () => void;
    onPurchaseError: (error: string) => void;
}


const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoiceKey, amount, chain, dueDate, buyer, seller, payer, payee, nftOwner }) => {
    // const [bidAmount, setBidAmount] = useState<string>(amount);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const floatAmount = ethers.utils.formatEther(amount)
    const bidAmount = amount;
    const invoiceKeyInt = parseInt(invoiceKey.toString());
    console.log("amount", amount, "bidAmount", bidAmount, "invoiceKey", invoiceKeyInt);
    console.log("parseUnits", ethers.utils.parseUnits(".1",2), "parseEther", ethers.utils.parseEther(".1"), "formatEther", ethers.utils.formatEther("1"));

    const handlePurchase = async () => {

        setIsLoading(true);

        try {
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(marketplaceAddress, MarketplaceJson.abi, signer);

                const bidAmountWei = ethers.utils.parseEther(floatAmount);
                const minBidWei = ethers.utils.parseUnits("1");

                console.log("bidAmountWei", bidAmountWei, "invoiceKey", invoiceKeyInt, "floatAmount", floatAmount, );

                // if (bidAmountWei.lt(minBid)) {
                //     onPurchaseError("Bid amount is too low");
                //     setIsLoading(false);
                //     return;
                // }

                const transaction = await contract.purchaseInvoice(invoiceKey, {
                    value: bidAmountWei
                });
                await transaction.wait();
                console.log("Invoice purchased successfully", transaction);

            }
            else {
                console.error("Metamask not installed");
            }
        } catch (error) {
            console.error("Error purchasing invoice:", error);
        }

        setIsLoading(false);
    };
    return (
        <div className="p-5 justify-between items-center bg-gray-100 rounded-3xl ">
            <div className='flex flex-row w-full items-center gap-4'>
                <FaFileInvoiceDollar className='bg-[#98EE2B] rounded-3xl p-1 text-5xl' />
                <div>
                    <h2 className="text-left text-xl font-semibold font-sm">Invoice {invoiceKeyInt}</h2>
                    <div className='text-[12px]'> Amount : {floatAmount}</div>
                    <div className='text-[12px]'> Chain : {chain}</div>
                    <div className='text-[12px]'> Due Date : {dueDate}</div>
                </div>
            </div>
            <div className="divider divider-neutral"></div>
            <div>
                <div className='pb-4'> Status</div>
            </div>
            <div className='text-[12px]'>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Buyer:</div>
                        <div className=''>{buyer}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Seller:</div>
                        <div className=''>{seller}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Payer</div>
                        <div className='text-[12px]'>{payer}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Payee</div>
                        <div className='text-[12px]'>{payee}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>NFT Owner</div>
                        <div className='text-[12px] pl-4'>{nftOwner}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
            </div>
            <div className='flex gap-4 text-center '>
                <button onClick={handlePurchase} disabled={isLoading}
                    className="mt-2 inline-flex align-left rounded-3xl text-sm items-center bg-[#98EE2B] relative px-3 py-2 mr-5 font-semibold hover:bg-[#f0f0f0] cursor-pointer" >
                    Buy Invoice
                </button>

            </div>
        </div>
    );
};

export default InvoiceCard;