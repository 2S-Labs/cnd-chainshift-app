import { ethers } from 'ethers'

export const ethereum: any | undefined = (window as any).ethereum
export let provider: any
export let signer: any

export async function getAddressShort() {
  const address = await getAddress()
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export async function getAddress() {
  return await signer.getAddress()
}

export async function connect() {
  provider = new ethers.providers.Web3Provider(ethereum)
  signer = provider.getSigner()
}

export async function requestAccount() {
  await ethereum.request({ method: 'eth_requestAccounts' })
}

export async function addChain() {
  // await ethereum.request({
  //   method: 'wallet_addEthereumChain',
  //   params: [
  //     {
  //       chainId: '0x4bd',
  //       chainName: 'Popcateum',
  //       nativeCurrency: {
  //         name: 'Popcat',
  //         symbol: 'POP',
  //         decimals: 18
  //       },
  //       rpcUrls: ['https://dataseed.popcateum.org'],
  //       blockExplorerUrls: ['https://explorer.popcateum.org']
  //     }
  //   ]
  // })
  await ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x89',
        chainName: 'Polygon',
        nativeCurrency: {
          name: 'Matic',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    ]
  })
}