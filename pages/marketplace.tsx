"use client";

import React, { useState } from 'react';
import { useRequest } from '@/lib/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';
import { type DateRange } from 'react-day-picker';
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import Image from "next/image";


const marketplace = () => {
    const { getAllRequestsData, data } = useRequest();
    console.log("data", data)

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
                            Your Favorite Game Streaming Events are here
                        </p>
                        <div className='flex gap-4 text-center align-middle justify-center'>
                            <Link
                                href="/list"
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
                    <div className="flex flex-row p-10">
                        {/* creating duplicate events */}
                        <div className="card card-compact mx-5 w-[400px] bg-[#202020] p-4 text-white shadow-xl">
                            <figure>
                                <Image
                                    src="/images/sui.png"
                                    alt="Gaming Trends on Sui"
                                    width={500} height={200}
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex">
                                    <div className="font-Agda text-[18px] uppercase text-[#98ee2c]"> Nov 02</div>
                                    <div className="font-Agda text-[18px] uppercase px-2"> Starting At 6:00PM</div>
                                    <div className="text-end justify-end">
                                        <BiHeart />
                                    </div>
                                </div>
                                <h2 className="card-title font-Montserrat text-[24px] pb-4">Gaming Trends on Sui</h2>
                                <div className="flex ">
                                    <button
                                        className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                                        Watch Live
                                        <BsArrowRight className='mt-1 ml-2' />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default marketplace