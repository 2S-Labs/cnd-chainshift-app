<script lang="ts">
  import { v2List, v2Loading, isConnect, myAddress } from '@/stores'
  import { RingLoader } from 'svelte-loading-spinners'
  import { inputV2 } from '@/contracts/index'
  import { Diamonds } from 'svelte-loading-spinners'
  import axios from 'axios'

  let spinnerState = false
  let klayAddress: string = ''
  let checkedIds: Array<any> = []

  function cheked(num: number) {
    if (checkedIds.includes(num)) {
      let filteredId = checkedIds.filter((ids) => {
        return ids !== num
      })
      checkedIds = filteredId
    } else {
      if (checkedIds.length === 100) {
        alert('There are 100 clones that can be steaked at once.')
        return false
      }
      checkedIds.push(num)
      checkedIds = checkedIds
    }
  }

  function selectMax() {
    if ($v2List.length < 100) {
      for (let i = 0; i < $v2List.length; i++) {
        cheked($v2List[i])
      }
    } else {
      for (let i = 0; i < 100; i++) {
        cheked($v2List[i])
      }
    }
  }

  async function getMyNFTListV2() {
    $v2Loading = true
    const data = await axios({
      method: 'get',
      url: `https://chainshiftapi.clonesneverdie.com/nft/v2/${$myAddress}`,
    })
    $v2List = [...data.data.tokenIds]
    $v2Loading = false
  }

  async function shiftInput() {
    spinnerState = true
    try {
      await inputV2(checkedIds, klayAddress)
      await getMyNFTListV2()
      checkedIds = []
      klayAddress = ''
      spinnerState = false
      alert('success')
    } catch (error) {
      spinnerState = false
      alert('error')
      console.log(error)
    }
  }
</script>

<div class="sub-content">
  <div class="sub-title"><b>CxNxD V2 Dimensional Shift</b></div>
  <div class="sub-item">
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Dimensional Shift to Klaytn</b></div>
      <div class="sub-item-explain">
        CxNxD V2클론을 클레이튼 블록체인으로 차원이동 시킵니다. 한번에 최대 100개까지 전송
        가능합니다.
      </div>
      <div class="sub-item-explain">
        오픈씨 컬렉션: <a
          class="link"
          target="_blank"
          href="https://opensea.io/collection/clones-never-die-mu">Clones Never Die Mu</a
        >
      </div>
      <div class="sub-item-title"><b>Klaytn Address</b></div>
      <div class="sub-item-explain">전송받을 클레이튼 지갑 주소를 입력 해주세요</div>
      {#if $isConnect}
        <input type="text" bind:value={klayAddress} />
      {:else}
        <input type="text" readonly disabled />
      {/if}
      {#if $isConnect}
        <div class="select-btn" on:click={selectMax}>Select Max</div>
      {:else}
        <div class="select-btn-unactive">Select Max</div>
      {/if}
      <div class="sub-item-title"><b>My Clones</b></div>
      <ul class="sub-item-list-head">
        <li class="list-item">
          <div class="item-number">Select</div>
          <div class="item-number">No.</div>
          <div class="item-name">Clone Name</div>
          <div class="item-id">Clone ID</div>
        </li>
      </ul>
      <ul class="sub-item-list">
        {#each $v2List as item, index}
          <li class="list-item">
            {#if checkedIds.includes(item) === true}
              <div class="checked" value={item} on:click={() => cheked(item)} />
            {:else}
              <div class="check" value={item} on:click={() => cheked(item)} />
            {/if}
            <div class="item-number">{index + 1}</div>
            <div class="item-name">CxNxD 萬 #{item}</div>
            <div class="item-id">{item}</div>
          </li>
        {/each}
        {#if $v2Loading === true}
          <div class="loading">
            <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
          </div>
        {/if}
      </ul>
      {#if $isConnect && klayAddress.length === 42 && checkedIds.length > 0}
        <div class="subbtn" on:click={shiftInput}>
          <b> Dimensional Shift </b>
        </div>
      {:else}
        <div class="subbtn-disable">
          <b> Dimensional Shift </b>
        </div>
      {/if}
    </div>
  </div>
</div>

{#if spinnerState}
  <div class="spiner">
    <Diamonds size="60" color="#FF7F00" unit="px" duration="1s" />
  </div>
{/if}

<style lang="scss">
  .check {
    width: 15px;
    height: 15px;
    background-color: lightgray;
    cursor: pointer;
  }
  .checked {
    width: 15px;
    height: 15px;
    background-color: $main;
    cursor: pointer;
  }

  .sub-content {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }

  .sub-title {
    color: $main;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .sub-item {
    border: 2px solid $main;
    height: auto;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .sub-item-wrap {
    padding: 30px;
    display: flex;
    height: 80%;
    flex-direction: column;
    justify-content: space-around;
  }

  .sub-item-title {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .sub-item-explain {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .sub-item-list {
    padding: 10px;
    height: 200px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .sub-item-list::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .sub-item-list-head {
    box-sizing: border-box;
    border-radius: 10px;
  }

  .list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  input {
    width: 100%;
    height: 40px;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 30px;
    display: flex;
    box-sizing: border-box;
  }

  .subbtn-disable {
    width: 100%;
    background-color: lightgray;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
  }

  .subbtn {
    width: 100%;
    background-color: $main;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    cursor: pointer;
  }

  .subbtn:active {
    opacity: 0.7;
  }

  .spiner {
    z-index: 100;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 120%;
  }

  .link {
    color: white;
  }

  .select-btn {
    font-size: 1.2rem;
    padding: 10px;
    margin-bottom: 20px;
    background-color: $main;
    width: 150px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
  }

  .select-btn-unactive {
    font-size: 1.2rem;
    padding: 10px;
    margin-bottom: 20px;
    background-color: lightgray;
    width: 150px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    .sub-item-wrap {
      padding: 15px;
    }
    .list-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 0.7rem;
    }
  }
</style>
