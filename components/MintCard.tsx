"use client";

import React, { useEffect, useState } from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { ethers } from "ethers";
import { useAccount } from 'wagmi';
import Marketplace from "@/lib/contract/Marketplace.json";
import { marketplaceAddress } from "@/lib/constant";

declare global {
    interface Window {
        ethereum: any;
    }
}

const MintInvoiceCard = ({ invoice }: any) => {
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const { address, isConnected } = useAccount();
    console.log("invoice", invoice);

    if (!invoice) return null;

    let amount: string = invoice.expectedAmount;
    const oldAmount = invoice.expectedAmount;
    const currency = invoice.currency;
    const requestId = invoice.requestId;
    const date = (new Date(invoice.contentData?.paymentTerms?.dueDate)).getTime();

    if (currency === "fUSDC-sepolia") {
        amount = (parseFloat(invoice.expectedAmount) / 1000000).toString();
    }
    if (currency === "FAU-sepolia") {
        amount = (parseFloat(invoice.expectedAmount) / Math.pow(10, 18)).toString();
    }

    useEffect(() => {
        const setupContract = async () => {
            if (typeof window !== 'undefined' && window.ethereum && isConnected && address) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const network = await provider.getNetwork();
                    if (network.chainId !== 11155111) { // Sepolia chainId
                        throw new Error("Please connect to the Sepolia network");
                    }
                    const invoiceNFTContract = new ethers.Contract(marketplaceAddress, Marketplace.abi, signer);
                    setContract(invoiceNFTContract);
                    setProvider(provider);
                } catch (error) {
                    console.error("Error setting up contract:", error);
                }
            }
        };
        setupContract();
    }, [isConnected, address]);

    const mintInvoice = async () => {
        if (!contract || !address) {
            console.error('Contract or address not initialized');
            return;
        }

        const billAmount = oldAmount;
        const token = invoice?.currency;
        const dueDate = invoice.contentData.paymentTerms.dueDate;
        const uniqueId = requestId;
        const invoiceBuyer = `${invoice?.contentData?.buyerInfo?.firstName || ''}${invoice?.contentData?.buyerInfo?.lastName || ''}${invoice?.contentData?.buyerInfo?.businessName || ''}`;
        const invoiceSeller = `${invoice?.contentData?.sellerInfo?.firstName || ''}${invoice?.contentData?.sellerInfo?.lastName || ''}`;
        const payer = invoice.payer.value;
        const payee = invoice.payee.value;
        const status = invoice.state;
        const minBid = oldAmount;
        console.log('addressn billAmount , token , dueDate , uniqueId , invoiceBuyer , invoiceSeller , payer , payee , status',address, billAmount, token, date, uniqueId, invoiceBuyer, invoiceSeller, payer, payee, status, minBid);

        try {
            // Convert addresses to checksummed addresses
            const payerAddress = ethers.utils.getAddress(payer);
            const payeeAddress = ethers.utils.getAddress(payee);
            console.log('payerAddress', payerAddress, 'payeeAddress', payeeAddress);
            console.log('payer', payer, 'payee', payee);
            const tx = await contract.mintAndListInvoice(
                address,
                billAmount,
                token,
                date,
                uniqueId,
                invoiceBuyer,
                invoiceSeller,
                payerAddress,
                payeeAddress,
                status,
                minBid,
                {
                    gasLimit: ethers.utils.hexlify(1000000), // Setting a manual gas limit
                }
            );
            await tx.wait();
            console.log('Invoice NFT minted successfully', tx);
        } catch (error) {
            console.error("Error minting invoice NFT:", error);
        }
    };

    return (
        <div className="p-5 justify-between items-center bg-gray-100 rounded-3xl min-w-[350px]">
            <div className='flex flex-row w-full items-center gap-4'>
                <FaFileInvoiceDollar className='bg-[#98EE2B] rounded-3xl p-1 text-5xl' />
                <div>
                    <h2 className="text-left text-xl font-semibold font-sm">Invoice</h2>
                    <div className='text-[12px]'> Amount : {amount}</div>
                    <div className='text-[12px]'> Chain :{invoice.currency}</div>
                    <div className='text-[12px]'> Created : {new Date(invoice.timestamp * 1000).toLocaleString()}</div>
                    <div className='text-[12px]'> Due Date : {new Date(invoice.contentData.paymentTerms.dueDate).toLocaleString()}</div>
                </div>
            </div>
            <div className="divider divider-neutral"></div>
            <div className='flex flex-row'>
                <div className='pb-4'> Status: </div>
                <div className="badge badge-outline text-sm mx-4">{invoice.state}</div>
            </div>
            <div className='text-[12px]'>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Buyer:</div>
                        <div className=''>
                            {invoice?.contentData?.buyerInfo?.firstName} {invoice?.contentData?.buyerInfo?.lastName} ({invoice?.contentData?.buyerInfo?.businessName})
                        </div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Seller:</div>
                        <div className=''>
                            {invoice?.contentData?.sellerInfo?.firstName} {invoice?.contentData?.sellerInfo?.lastName}

                        </div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Payer</div>
                        <div className='text-[12px] pl-4'>{invoice.payer.value}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className='font-semibold font-sm'>Payee</div>
                        <div className='text-[12px] pl-4'>  {invoice.payee.value}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
            </div>
            <div className='flex gap-4 text-center '>
                <button onClick={mintInvoice}
                    className="mt-2 inline-flex align-left rounded-3xl text-sm items-center bg-[#98EE2B] relative px-3 py-2 mr-5 font-semibold hover:bg-[#f0f0f0] cursor-pointer" >
                    Mint Your Invoice
                </button>
            </div>
        </div>
    );
};

export default MintInvoiceCard;