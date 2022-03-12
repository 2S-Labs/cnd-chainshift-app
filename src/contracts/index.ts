import { ethers } from 'ethers'
import { signer } from '@/chain/index'
import ChainShiftABI from '@/abi/ChainShift.json'

const chainShiftV1CA = '0x8FCdD6DD063570Ec81Cba14d8CC35Dbf828dEC88'
const chainShiftV2CA = '0x5DC00aF0874215Dd9fCb066097144be298804DDB'

export async function inputV1(tokenIds: Array<any>, to: string) {
  const contract = new ethers.Contract(chainShiftV1CA, ChainShiftABI, signer)
  const tx = await contract.input(tokenIds, to)
  await tx.wait()
}

export async function inputV2(tokenIds: Array<any>, to: string) {
  const contract = new ethers.Contract(chainShiftV2CA, ChainShiftABI, signer)
  const tx = await contract.input(tokenIds, to)
  await tx.wait()
}