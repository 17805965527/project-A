<script lang="ts">
  import { abdexClient } from '@lib/abdex/client';
  import { userAddr } from "@lib/stores/user";
  import { frozen } from '@lib/stores/abdex';


  let longOrShort: 'long'|'short' = 'long';
  let marketOrLimit: 'market'|'limit' = "market";
  let limitPrice: string = '0';
  let limitAmt: string = '0';
  let marketAmountOrTotal: 'Amount'|'Total' = 'Amount';

  const longeth = async () => {
    console.log("eth")
    const res = await abdexClient.AbdexSpot.tx.sendMsgPlcMktodr({
      value: {
        creator: $userAddr,
        mkt: "ETH/USDa",
        amt: 1000,
        val: 190000,
        bid: true,
      },
      fee: {
        amount: [{ amount: '0', denom: 'uabd' }],
        gas: '200000',
      },
    })
  }

  const shortnq = async () => {
    console.log("nq")
    const res = await abdexClient.AbdexDeriv.tx.sendMsgPlcLmtodr({
      value: {
        creator: $userAddr,
        mkt: "NQ.CME/USDa:USDa-230915",
        pc: 15195,
        amt: 10000,
        bid: false,
        mm: false,
      },
      fee: {
        amount: [{ amount: '0', denom: 'uabd' }],
        gas: '200000',
      },
    })
    frozen.set(1519.5)
  }

</script>

<section class="w-full bg-base-100 shadow rounded-box px-1 py-3"> 
  <!-- 多空选择 -->
  <div class="join rounded-box w-full">
    <input class="join-item btn border-none w-1/2 checked:!bg-green-500" type="radio" name="longOrShort" 
    bind:group={longOrShort} aria-label="Long" value="long" checked/>
    <input class="join-item btn border-none w-1/2 checked:!bg-red-500" type="radio" name="longOrShort" 
    bind:group={longOrShort} aria-label="Short" value="short"/>
  </div>
  <!-- 订单类型选择 -->
  <div class="tabs mt-2">
    <button class="tab tab-bordered w-1/2 {marketOrLimit === 'market' ? 'tab-active' : ''}" on:click={()=>{marketOrLimit = 'market'}}>
      Market
    </button> 
    <button class="tab tab-bordered w-1/2 {marketOrLimit === 'limit' ? 'tab-active' : ''}" on:click={()=>{marketOrLimit = 'limit'}}>
      Limit
    </button> 
  </div>
  <!-- 下单界面 -->
  <div>
    {#if marketOrLimit === "market"}
      <!-- 价格输入框 -->
      <div class="form-control w-full max-w-xs mt-3">
        <span class="label label-text">Price (USDt)</span>
        <input type="text" 
        class="input input-bordered input-sm w-full max-w-xs"
        disabled
        placeholder="Market price" />
      </div>
      <!-- Amount/Total 下拉选择 -->
      <div class="dropdown dropdown-bottom">
        <span tabindex="-1" class="label label-text">
          {marketAmountOrTotal}
          <span class="icon-[gridicons--dropdown]" />
        </span>
        <ul tabindex="-1" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li on:click={() => {marketAmountOrTotal = 'Amount'}}>Amount</li>
          <li on:click={() => {marketAmountOrTotal = 'Total'}}>Total</li>
        </ul>
      </div>
      <!-- Amount输入框 -->
      {#if marketAmountOrTotal === 'Amount'}
        <input type="text" 
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={limitAmt} />
      {/if}
      <!-- Total输入框 -->     
      {#if marketAmountOrTotal === 'Total'}
        <input type="text" 
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={limitPrice} />
      {/if}

    {:else if marketOrLimit === "limit"}
      <!-- 价格输入框 -->
      <div class="form-control w-full max-w-xs mt-3">
        <span class="label label-text">Price (USDt)</span>
        <input type="text" 
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={limitPrice} />
      </div>
      <!-- Amount输入框 -->
      <div class="form-control w-full max-w-xs mt-3">
        <span class="label label-text">Amount (ETH)</span>
        <input type="text" 
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={limitAmt} />
      </div>
      <!-- Total输入框 -->
      <!-- <div class="form-control w-full max-w-xs mt-3">
        <span class="label label-text">Total (USDT)</span>
        <input type="text" 
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={limitPrice} />
      </div> -->
    {/if}
  </div>
  <!-- 可用 + 可买/可卖 -->
  <div class="mt-3">
    <span class="label label-text">Available</span>
    <span class="label label-text">Max {longOrShort}</span>
  </div>
  <!-- 交易按钮 -->
  <div class="mt-3">
    {#if longOrShort === 'long'}
      <button class="btn border-none w-full bg-green-500" on:click={longeth}>Long</button>
    {:else if longOrShort === 'short'}
      <button class="btn border-none w-full bg-red-500" on:click={shortnq}>Short</button>
    {/if}
  </div>
</section>