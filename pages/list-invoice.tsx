import("@requestnetwork/invoice-dashboard");
import React, { useEffect, useRef, useState } from "react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { InvoiceDashboardProps } from "@/types";
import { useConnectWallet } from "@web3-onboard/react";
import { RequestNetwork, Types } from "@requestnetwork/request-client.js";
import MintInvoiceCard from '@/components/MintCard';
import Link from 'next/link';

const listNFT = () => {
    const [{ wallet }] = useConnectWallet();
    const { requestNetwork } = useAppContext();
    const dashboardRef = useRef<InvoiceDashboardProps>(null);
    const [requests, setRequests] = useState([] as any[]);

    useEffect(() => {
        if (dashboardRef.current) {
            dashboardRef.current.config = config;

            if (wallet && requestNetwork) {
                dashboardRef.current.wallet = wallet;
                dashboardRef.current.requestNetwork = requestNetwork;
                console.log("requestNetwork", requestNetwork, "wallet", wallet);
            }
        }
        if (wallet) {
            requestNetwork
                ?.fromIdentity({
                    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                    value: wallet?.accounts[0].address as string,
                })
                .then((requests) => {
                    const requestDatas = requests.map((request) => request.getData());
                    console.log("requestDatas", requestDatas);
                    setRequests(requestDatas);
                });
        }
    }, [wallet, requestNetwork]);
    return (
        <div className='w-[100%] h-screen'>
            <figure className="flex flex-col items-center justify-center pt-10 pb-10 ">
                <div className="rounded-3xl min-w-[1200px]" style={{ background: "linear-gradient(to right, rgb(254, 240, 138), rgb(187, 247, 208), rgb(134, 239, 172))" }}>
                    <div className='p-10 text-center align-middle justify-center'>
                        <div className="text-[60px]  font-sans text-center">
                            List Your Invoices
                        </div>
                        <p className="font-Outfit pb-9">
                            On The Marketplace
                        </p>

                    </div>
                </div>
            </figure>
            <div>
                <div className="flex flex-col justify-center items-center content-center ">
                    {/* map nft data here using Event Card component to show multiple events*/}
                    <div className='px-14 py-5'>
                        <div className='text-2xl font-bold'>Mint Your Invoices</div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                            {requests.map((invoice, index) => (
                                <MintInvoiceCard
                                    invoice={invoice} key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default listNFT