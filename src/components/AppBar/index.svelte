<script lang="ts">
  import {
    isConnect,
    myAddress,
    myAddressShort,
    v1List,
    v1Loading,
    v2List,
    v2Loading,
  } from '@/stores/index'
  import {
    addChain,
    connect,
    ethereum,
    getAddress,
    getAddressShort,
    requestAccount,
    accountsChanged,
  } from '@/chain/index'
  import axios from 'axios'
  import { onMount } from 'svelte'

  onMount(async () => {
    await accountsChanged()
  })

  async function walletConnect() {
    await addChain()
    await requestAccount()
    await connect()
    $myAddress = await getAddress()
    $myAddressShort = await getAddressShort()
    $isConnect = true
    await getMyNFTListV1()
    await getMyNFTListV2()
    changed()
  }

  function changed() {
    ethereum.on('accountsChanged', async () => {
      await walletConnect()
    })
  }

  async function getMyNFTListV1() {
    $v1Loading = true
    const data = await axios({
      method: 'get',
      url: `http://localhost:3000/nft/v1/${$myAddress}`,
    })
    $v1List = [...data.data.tokenIds]
    $v1Loading = false
  }

  async function getMyNFTListV2() {
    $v2Loading = true
    const data = await axios({
      method: 'get',
      url: `http://localhost:3000/nft/v2/${$myAddress}`,
    })
    $v2List = [...data.data.tokenIds]
    $v2Loading = false
  }
</script>

<div class="appbar">
  {#if $isConnect}
    <div class="address">{$myAddressShort}</div>
  {:else}
    <div class="button" on:click={walletConnect}>Wallet Connect</div>
  {/if}
</div>

<style lang="scss">
  .appbar {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }

  .button {
    padding: 15px;
    background-color: $main;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
  }

  .address {
    padding: 15px;
    background-color: $main;
    font-weight: bold;
    border-radius: 10px;
  }
</style>
