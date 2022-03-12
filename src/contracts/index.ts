import { ethers } from 'ethers'
import { signer } from '@/chain/index'
import ChainShiftABI from '@/abi/ChainShift.json'

const chainShiftV1CA = ''
const chainShiftV2CA = '0x574bed967Ba7ac8aE9d57044aF637b439b81FA53'

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