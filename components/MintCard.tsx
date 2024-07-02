
import React, { useState } from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { ethers } from "ethers";
import InvoiceNFT from "@/lib/contract/InvoiceNFT.json";
import { InvoiceNFTContract } from "@/lib/constant";

const MintInvoiceCard = ({ invoice }: any) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    if (!invoice) return null
    let amount: string = invoice.expectedAmount
    const currency = invoice.currency
    const requestId = invoice.requestId

    if (currency == "fUSDC-sepolia") {
        amount = (parseFloat(invoice.expectedAmount) / 1000000).toString()
    }
    if (currency == "FAU-sepolia") {
        amount = (parseFloat(invoice.expectedAmount) / Math.pow(10, 18)).toString()
    }
    console.log("invoice", invoice)


    const connectWallet = async () => {
        if (window.ethereum) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            try {
                await web3Provider.send('eth_requestAccounts', []);
                const signer = web3Provider.getSigner();
                const accounts = await signer.getAddress();
                setAccount(accounts);
                setProvider(web3Provider);

                const invoiceNFTContract = new ethers.Contract(InvoiceNFTContract, InvoiceNFT, signer);
                setContract(invoiceNFTContract);
            } catch (error) {
                console.error('User denied account access', error);
            }
        } else {
            console.error('No Ethereum browser extension detected');
        }
    };

    const mintInvoice = async () => {
        if (contract && account) {
            const billAmount = amount;
            const token = invoice?.currency;
            const dueDate = invoice.contentData.paymentTerms.dueDate;
            const uniqueId = requestId;
            const buyer = invoice?.contentData?.buyerInfo?.firstName + invoice?.contentData?.buyerInfo?.lastName (invoice?.contentData?.buyerInfo?.businessName);
            const seller =invoice?.contentData?.sellerInfo?.firstName + invoice?.contentData?.sellerInfo?.lastName;

            const payer = invoice.payer.value;
            const payee = invoice.payee.value;

            try {
                const tx = await contract.mintInvoice(
                    account,
                    billAmount,
                    token,
                    dueDate,
                    uniqueId,
                    buyer,
                    seller,
                    payer,
                    payee
                );
                await tx.wait();
                console.log('Invoice NFT minted successfully');
            } catch (error) {
                console.error('Error minting invoice NFT:', error);
            }
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
                <button onSubmit={mintInvoice}
                    className="mt-2 inline-flex align-left rounded-3xl text-sm items-center bg-[#98EE2B] relative px-3 py-2 mr-5 font-semibold hover:bg-[#f0f0f0] cursor-pointer" >
                    Mint Your Invoice
                </button>
            </div>
        </div>
    );
};

export default MintInvoiceCard;