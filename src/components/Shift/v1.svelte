<script lang="ts">
  import { v1List, v1Loading } from '@/stores'
  import { RingLoader } from 'svelte-loading-spinners'

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
</script>

<div class="sub-content">
  <div class="sub-title"><b>CxNxD V1 Dimensional Shift</b></div>
  <div class="sub-item">
    <div class="sub-item-wrap">
      <div class="sub-item-title"><b>Dimensional Shift to Klaytn</b></div>
      <div class="sub-item-explain">CxNxD V1클론을 클레이튼 블록체인으로 차원이동 시킵니다.</div>
      <div class="sub-item-title"><b>Klaytn Address</b></div>
      <div class="sub-item-explain">전송받을 클레이튼 지갑 주소를 입력 해주세요</div>
      <input type="number" readonly disabled />
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
        {#each $v1List as item, index}
          <li class="list-item">
            {#if checkedIds.includes(item) === true}
              <div class="checked" value={item} on:click={() => cheked(item)} />
            {:else}
              <div class="check" value={item} on:click={() => cheked(item)} />
            {/if}
            <div class="item-number">{index + 1}</div>
            <div class="item-name">CxNxD K #{item}</div>
            <div class="item-id">{item}</div>
          </li>
        {/each}
        {#if $v1Loading === true}
          <div class="loading">
            <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
          </div>
        {/if}
        <!-- {#if $walletLoading === false}
          <div class="loading">
            <RingLoader size="60" color="#FF7F00" unit="px" duration="1s" />
          </div>
        {/if}
      </ul>

      <!-- <div class="sub-selected">Selected ID: {checkedIds}</div> -->
        <!-- <div class="sub-selected">Selected clones: {checkedIds.length}</div>
      {#if checkedIds.length === 0}
        <div class="sub-btn-non"><b>Staking</b></div>
      {:else}
        <div class="sub-btn" on:click={goLotus}><b>Staking</b></div>
      {/if} -->
      </ul>
    </div>
  </div>
</div>

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
  .sub-btn-non {
    width: 100%;
    background-color: lightgray;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
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

  .sub-btn {
    width: 100%;
    background-color: $main;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .sub-selected {
    margin-top: 10px;
    margin-bottom: 10px;
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
