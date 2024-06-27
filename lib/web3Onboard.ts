import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const onboard = Onboard({
    wallets: [injected],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'
        },
        {
            id: '0x3',
            token: 'rETH',
            label: 'Ropsten Testnet',
            rpcUrl: 'https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID'
        }
    ]
});

export default onboard;
