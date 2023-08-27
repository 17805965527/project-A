<script lang="ts">
  import { abdexBlock, oracleFormattedPc, timeLeft } from "@lib/stores/abdex";
  import { userMkt } from "@lib/stores/user";
  import { parseMkt } from "@lib/utils/parseMkt";
  import { clobMkts } from "@lib/stores/config";
  // 解析mkt
  $: mktSort = parseMkt($userMkt).sort;

</script>

<section> 
  <div class="flex items-center w-full bg-base-100 shadow rounded-box mb-10 divide-x">
    <!-- 标的选择 和 做市订单 链上做市算法 展示-->
    <div class="flex pr-5">
      <!-- 标的选择 -->
      <div class="px-2">
        <select class="select select-bordered w-auto" bind:value={$userMkt}>
          {#each Object.entries(clobMkts) as [mkt, _]}
            {#if mkt === 'ETH/USDa'}
              <option value={mkt} selected>{mkt}</option>
            {:else}
              <option value={mkt}>{mkt}</option>
            {/if}
          {/each}
        </select>
      </div>
      <!-- 做市订单 链上做市算法 展示 -->
      <div class="inline-grid w-auto grid-cols-1">
        <span class="badge w-[110px] badge-primary badge-outline">On-chain MM</span>
        <span class="badge w-[110px] badge-secondary badge-outline">MM Order</span>
      </div>
      
    </div>

    <!-- 区块高度 -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Block Height</div>
      <div class="stat-value text-xl">{$abdexBlock.height}</div>
    </div>

    <!-- 中间价格 -->
    <!-- <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Mid Price</div>
      {#if $userMkt === "ETH/USDa"}
          <div class="stat-value text-xl">1850.00</div>
      {:else}

      {/if}
    </div> -->

    <!-- 预言机价格 -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Oracle Price</div>
      <div class="stat-value text-xl">{$oracleFormattedPc}</div>
    </div>

    <!-- 当前资金费率 (perp特有) -->
    {#if mktSort === 'perp'}
      <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
        <div class="stat-title">Current Funding Rate</div>
        <div class="stat-value text-xl">1,200</div>
      </div>
    {/if}

    <!-- 资金费率倒计时 (perp特有) -->
    <!-- <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Funding Rate Countdown</div>
      <div class="stat-value text-xl">124314</div>
    </div> -->

    <!-- 期货倒计时 (fut特有) -->
    {#if mktSort === 'fut' }
      <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
        <div class="stat-title">Time to delivery</div>
        <div class="stat-value text-xl">{$timeLeft?.days} days {$timeLeft?.hours} hours {$timeLeft?.minutes} min</div>
      </div>
    {/if}
    

  </div>


</section>