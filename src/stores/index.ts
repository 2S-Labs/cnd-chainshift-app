import { writable } from 'svelte/store'

export const isConnect: any = writable(false)
export const myAddress: any = writable(null)
export const myAddressShort: any = writable('0x0000...0000')
export const v1List: any = writable([])
export const v2List: any = writable([])
export const v1Loading: any = writable(false)
export const v2Loading: any = writable(false)