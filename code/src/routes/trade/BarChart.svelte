<script lang="ts">
  import { userNow, userMkt, userAddr } from '@lib/stores/user';

  let chartOrOverview: 'chart'|'overview' = "chart"

</script>

<section class="w-full bg-base-100 shadow rounded-box px-1 py-3"> 
  <!-- chart / overview 切换 -->
  <div class="tabs">
    <!-- <span class="tab tab-bordered">Chart</span>  -->
    <span class="tab tab-bordered tab-active">Overview</span> 
  </div>
  <!-- overview 展示 -->
  <div class="card card-side bg-base-100 bg-opacity-0 p-5">
    <figure>
      {#if $userMkt === "ETH/USDa"}
        <img class="w-[150px]" src="https://thegivingblock.com/wp-content/uploads/2021/07/Ethereum-ETH-Logo.png" alt="Movie"/>
      {:else}
        <img class="w-[150px]" src="https://www.etftrends.com/wp-content/uploads/2023/07/Preparing-for-Upcoming-QQQ-Changes.jpg" alt="Movie"/>
      {/if}    
    </figure>
    <div class="card-body">
      {#if $userMkt === "ETH/USDa"}
        <h2 class="card-title">Ethereum</h2>
        <p>Ethereum (ETH) is a decentralized blockchain network. Its native coin, Ether (ETH), serves as a digital payment method and a software platform for creating and deploying decentralized applications (DApps) and smart contracts.</p>
        <div class="card-actions justify-end">
          <button class="btn">Official Website</button>
        </div>
      {:else}
        <h2 class="card-title">E-mini Nasdaq-100</h2>
        <p>Our E-mini Nasdaq-100 products give you one of the most cost-effective ways to gain market exposure to the Nasdaq-100 Index, a broad-based, modified capitalization-weighted index that tracks 100 large-cap companies that span major industry groups. Enjoy the liquidity and flexibility to react to global events as they unfold around the clock.</p>
        <div class="card-actions justify-end">
          <button class="btn">Official Website</button>
        </div>
      {/if}    
    </div>
  </div>

</section>