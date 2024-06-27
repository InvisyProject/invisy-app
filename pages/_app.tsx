import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import Navbar from "@/components/common/Navbar";
import { Provider } from "@/utils/context";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import { onboardConfig, config } from "../utils/connectWallet";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const montserrat = Montserrat({ subsets: ["latin"] });

const wen3Onboard = init({
  connect: {
    autoConnectAllPreviousWallet: true,
  },
  ...onboardConfig,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.className}`}>
      <Web3OnboardProvider web3Onboard={wen3Onboard}>
        <WagmiProvider config={config}>
          <Provider>
            <Navbar />
            <Component {...pageProps} />
          </Provider>
        </WagmiProvider>
      </Web3OnboardProvider>
    </div>
  );
}
