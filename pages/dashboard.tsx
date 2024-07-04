import("@requestnetwork/invoice-dashboard");
import Head from "next/head";
import { useEffect, useRef } from "react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { InvoiceDashboardProps } from "@/types";
import { useConnectWallet } from "@web3-onboard/react";
import { RequestNetwork, Types } from "@requestnetwork/request-client.js";

export default function InvoiceDashboard() {
    const [{ wallet }] = useConnectWallet();
    const { requestNetwork } = useAppContext();
    const dashboardRef = useRef<InvoiceDashboardProps>(null);

    const requestClient = new RequestNetwork({
        nodeConnectionConfig: {
            baseURL: "https://sepolia.gateway.request.network/",
        },
    });

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
                });
            }
        }, [wallet, requestNetwork]);

    return (
        <div className="pt-10" style={{ background: "linear-gradient(to right, rgb(254, 240, 138), rgb(187, 247, 208), rgb(134, 239, 172))" }}>
            {/* <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 pt-10"> */}
            <Head>
                <title>Request Payment</title>
            </Head>
            <div className="container m-auto w-[100%] h-screen">
                <invoice-dashboard ref={dashboardRef} />
            </div>
        </div>
    );
}
