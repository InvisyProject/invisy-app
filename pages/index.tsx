import Head from "next/head";
import React from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";


export default function HomePage() {
  return (
    <div
      className="hero min-h-screen bg-gradient-to-r from-teal-200 to-lime-200 bg-opacity-50"
    >
      <div className="hero-content text-black text-center">
        <div className="w-max">
          <div className="mb-5 text-5xl font-serif font-bold">Hey 👋, Welcome To Invicy
          </div>
          <div className="mb-5 text-xl">
            One stop platform to create, cancel approve, pay, manage, lend and borrow invoices.
          </div>
          <div className='flex gap-4 text-center align-middle justify-center'>
            <Link
              href="/create-invoice"
              className="rounded-xl inline-flex align-left items-center relative text-lg px-8 py-3 bg-white  mr-5 uppercase font-Agda font-bold text-b hover:bg-[#f0f0f0] cursor-pointer" >
              Create Invoice
              <BsArrowRight className=' ml-2' />
            </Link>
            <Link
              href="/marketplace"
              className="rounded-xl inline-flex align-left items-center relative text-lg px-8 py-3 bg-white  mr-5 uppercase font-Agda font-bold text-b hover:bg-[#f0f0f0] cursor-pointer" >
              Marketplace
              <BsArrowRight className=' ml-2' />
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
