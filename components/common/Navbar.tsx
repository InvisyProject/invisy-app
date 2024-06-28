/* eslint-disable @next/next/no-img-element */
import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetContent,
} from "@/components/ui/Sheet";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ArrowUpRight, BurgerMenu, Close } from "@/icons";
import { Button, Dropdown } from "../common";
import { truncateAddress } from "@/utils/walletUtils";

const Navbar = () => {
  const router = useRouter();
  const [{ wallet }, connect] = useConnectWallet();
  const [isDocsHovered, setIsDocsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    {
      name: "My dashboard",
      href: "/",
    },
    {
      name: "Create an Invoice",
      href: "/create-invoice",
    },
    {
      name:"Marketplace",
      href:"/marketplace"
    }
  ];

  return (
    <nav className="relative h-full flex items-center p-[20px] gap-[20px] xl:gap-[60px] bg-white shadow-small mb-[30px] tablet:mb-[80px]">
      <Link
        href="/"
        className="mr-auto tablet:mr-0"
      >

        <div className="flex items-center justify-center align-middle text-black font-serif">
          <img
            src="assets/invicy-logo.png"
            alt="Invicy Network Logo"
            className="w-[30px] xl:w-[50px]"
          />
          <div className="flex-row text-4xl font-serif px-4">
            Invicy
          </div>

        </div>
      </Link>
      <BurgerMenu
        className="block tablet:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      />
      <ul className="hidden tablet:flex  h-full gap-[20px] xl:gap-[60px] text-[14px] lg:text-[16px]">
        {links.map((link, index) => (
          <li className={`h-full relative text-black`} key={index}>
            <Link href={link.href}>{link.name}</Link>
            <div
              className={`${router.pathname === link.href &&
                "h-[4px] bg-green w-full absolute bottom-[-28px]"
                }`}
            ></div>
          </li>
        ))}
      </ul>


      <div className="hidden tablet:flex items-center gap-[15px] lg:gap-[35px] ml-auto ">
        <Button
          className="px-[14px] lg:px-[20px] text-14px lg:text-[16px] py-[8px]"
          text={
            wallet
              ? truncateAddress(wallet.accounts[0].address)
              : "Connect Wallet"
          }
          onClick={() => {
            connect();
          }}
        />
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent>
          <SheetTitle hidden>Menu</SheetTitle>
          <SheetClose className="absolute right-5 top-5">
            <Close />
          </SheetClose>
          <ul className="flex flex-col gap-7 text-[16px] w-full">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className={`w-[80%] block h-[30px] ${router.pathname === link.href &&
                    "border-b-[1px] border-solid border-blue-500 "
                    }`}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Button
                className="w-[122px] justify-center text-[16px]  py-[8px]"
                text={
                  wallet
                    ? truncateAddress(wallet.accounts[0].address)
                    : "Connect Wallet"
                }
                onClick={() => {
                  connect();
                  setIsMobileMenuOpen(false);
                }}
              />
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
