"use client";

import React, { useState, useEffect } from 'react';
import { useRequest } from '@/lib/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';
import { type DateRange } from 'react-day-picker';
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import InvoiceCard from '@/components/InvoiceCard';
import invoiceData from '@/lib/data.json';
import { ethers } from 'ethers';
import MarketplaceJson from "@/lib/contract/Marketplace.json";
import { marketplaceAddress } from "@/lib/constant";

// Define the structure of a listing
interface Listing {
    tokenId: number;
    seller: string;
    minBid: ethers.BigNumber;
    active: boolean;
    billAmount: ethers.BigNumber;
    token: string;
    dueDate: ethers.BigNumber;
    uniqueId: string;
    invoiceBuyer: string;
    invoiceSeller: string;
    payer: string;
    payee: string;
    status: string;
}

interface InvoiceFactoringMarketplace extends ethers.Contract {
    getTotalListings(): Promise<ethers.BigNumber>;
    getListing(tokenId: number): Promise<Listing>;
}

const marketplace = () => {
    const { getAllRequestsData, data } = useRequest();
    const [listings, setListings] = useState<Listing[]>([]);
    const [totalListings, setTotalListings] = useState<number>(0);


    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(1719775001000),
        to: new Date(4875323911000),
    });

    const { data: requests, refetch } = useQuery({
        queryKey: ['requests', date],
        queryFn: async () => {
            const from = date?.from?.getTime()
                ? Math.round(date.from.getTime() / 1000)
                : undefined;
            const to = date?.to?.getTime()
                ? Math.round(date.to.getTime() / 1000)
                : undefined;

            return await getAllRequestsData(from, to);
        },
        initialData: [],
        enabled: Boolean(data),
    });

    useEffect(() => {
        const fetchListings = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(marketplaceAddress, MarketplaceJson.abi, signer) as InvoiceFactoringMarketplace;

                    const total = await contract.getTotalListings();
                    setTotalListings(total.toNumber());
                    console.log("total", total.toNumber());

                    const fetchedListings: Listing[] = [];

                    for (let i = 0; i < total.toNumber(); i++) {
                        const listing = await contract.listings(i);
                        console.log("listing..", listing);

                        if (listing.active) {
                            fetchedListings.push({
                                ...listing,
                                tokenId: i
                            });
                        }
                    }
                    console.log("fetchedListings", fetchedListings);
                    setListings(fetchedListings);
                } catch (error) {
                    console.error("Error fetching listings:", error);
                }
            }
            else {
                console.error("Ethereum undefined");
            }
        };

        fetchListings();
    }, []);

    console.log("requests", requests, "dates", date)

    return (
        <div className="min-h-screen">
            <figure className="flex flex-col items-center justify-center pt-10 pb-10 ">
                <div className="rounded-3xl min-w-[1200px]" style={{ background: "linear-gradient(to right, rgb(254, 240, 138), rgb(187, 247, 208), rgb(134, 239, 172))" }}>
                    <div className='p-10 text-center align-middle justify-center'>
                        <div className="text-[60px]  font-sans text-center">
                            Explore Marketplace
                        </div>
                        <p className="font-Outfit pb-9">
                            Lend & Borrow Invoices
                        </p>
                        <div className='flex gap-4 text-center align-middle justify-center'>
                            <Link
                                href="/list-invoice"
                                className="inline-flex align-left items-center relative text-lg px-8 py-3 bg-white  mr-5 uppercase font-Agda font-bold text-b hover:bg-[#f0f0f0] cursor-pointer" >
                                List Your Invoice
                                <BsArrowRight className=' ml-2' />
                            </Link>
                            <Link
                                href="/dashboard"
                                className="inline-flex align-left items-center relative text-lg px-8 py-3 bg-white  mr-5 uppercase font-Agda font-bold text-b hover:bg-[#f0f0f0] cursor-pointer" >
                                Dashboard
                                <BsArrowRight className=' ml-2' />
                            </Link>
                        </div>
                    </div>
                </div>
            </figure>

            <div>
                <div className="flex flex-col justify-center items-center content-center ">
                    {/* map nft data here using Event Card component to show multiple events*/}
                    <div className='px-14 py-5'>
                        <div className='text-2xl font-bold'>Listed Invoices</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {listings.map((listing) => (
                                <InvoiceCard
                                    key={listing.tokenId}
                                    invoiceKey={listing.tokenId}
                                    amount={listing.billAmount.toString()}
                                    chain={listing.token}
                                    dueDate={new Date(listing.dueDate.toNumber() * 1000).toLocaleDateString()}
                                    buyer={listing.invoiceBuyer}
                                    seller={listing.invoiceSeller}
                                    payer={listing.payer}
                                    payee={listing.payee}
                                    nftOwner={listing.seller}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default marketplace