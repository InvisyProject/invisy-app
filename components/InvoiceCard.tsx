import React from 'react';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import Link from 'next/link';

interface InvoiceCardProps {
    key: number;
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

const InvoiceCard: React.FC<InvoiceCardProps> = ({ key, amount, chain, dueDate, buyer, seller, payer, payee, nftOwner, totalNumStakers }) => {
    return (
        <div className="p-5 justify-between items-center">
            <div className='flex flex-row w-full items-center gap-4'>
                <FaFileInvoiceDollar className='bg-green-300 rounded-xl text-3xl' />
                <div>
                    <h2 className="text-left text-xl font-semibold">Invoice {key}</h2>
                    <div className='text-[12px]'> Amount : {amount}</div>
                    <div className='text-[12px]'> Chain : {chain}</div>
                    <div className='text-[12px]'> Due Date : {dueDate}</div>
                </div>
            </div>
            <div className="divider divider-neutral"></div>
            <div>
                <div className='pb-4'> Status</div>
            </div>
            <div className='text-sm'>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className=''>Buyer:</div>
                        <div className=''>{buyer}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className=''>Seller:</div>
                        <div className=''>{seller}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className=''>Payer</div>
                        <div className='text-sm'>{payer}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className=''>Payee</div>
                        <div className='text-sm'>{payee}</div>
                    </div>
                </div>
                <div className="my-1 border-t border-gray-300"></div>
                <div className="">
                    <div className='flex items-center justify-between'>
                        <div className=''>NFT Owner</div>
                        <div className='text-sm'>{nftOwner}</div>
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
        </div>
    );
};

export default InvoiceCard;