import React from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import Link from 'next/link';

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
    totalNumStakers: string;
    // Add other props here if needed
}

{/* <Link href="/operator/0x321980af329232423423"> */ }

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoiceKey, amount, chain, dueDate, buyer, seller, payer, payee, nftOwner, totalNumStakers }) => {
    return (
        <div className="p-5 justify-between items-center bg-gray-100 rounded-3xl ">
            <div className='flex flex-row w-full items-center gap-4'>
                <FaFileInvoiceDollar className='bg-[#98EE2B] rounded-3xl p-1 text-5xl' />
                <div>
                    <h2 className="text-left text-xl font-semibold font-sm">Invoice {invoiceKey}</h2>
                    <div className='text-[12px]'> Amount : {amount}</div>
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
                {/* <div className="">
                    <div className='flex items-center justify-between'>
                        <div className=''>TOTAL NUM. STAKERS</div>
                        <div>{totalNumStakers}</div>
                    </div>
                </div> */}
            </div>
            <div className='flex gap-4 text-center '>
                <button onSubmit={() => { console.log('Buy Invoice') }}
                    className="mt-2 inline-flex align-left rounded-3xl text-sm items-center bg-[#98EE2B] relative px-3 py-2 mr-5 font-semibold hover:bg-[#f0f0f0] cursor-pointer" >
                    Buy Invoice
                </button>

            </div>
        </div>
    );
};

export default InvoiceCard;