<script lang="ts">
  import { oraclePcs, denomsMetadata, stbcon } from "@lib/stores/abdex";
  import { userNow, userMkt, userAddr } from '@lib/stores/user';
  import { readable, derived } from 'svelte/store';
  
  // const denom_units = $denomsMetadata.find((item) => item.display === "btc")?.denom_units;
    // const btcExpo = denom_units?.find((item) => item.denom === "btc")?.exponent;

  const fmtBtcPc = derived(oraclePcs, ($oraclePcs) => {
    const btcPc = $oraclePcs.find((item) => item.market === "BTC/USDa");
    if (btcPc) {
		let formattedPc = (Number(btcPc.answer) / Math.pow(10, 6)).toFixed(2);
		return formattedPc;
	  }
  });

  const fmtEthPc = derived(oraclePcs, ($oraclePcs) => {
    const ethPc = $oraclePcs.find((item) => item.market === "ETH/USDa");
    if (ethPc) {
		let formattedPc = (Number(ethPc.answer) / Math.pow(10, 6)).toFixed(2);
		return formattedPc;
	  }
  });
  
  $: dpEthAmt = $stbcon?.troves?.[$userAddr]?.dpCollats?.find(ele => ele.denom === "wei")?.amount;
  $: wdUsdaAmt = $stbcon?.troves?.[$userAddr]?.wdStbcons?.find(ele => ele.denom === "uusda")?.amount;
  $: rate = $stbcon?.troves?.[$userAddr]?.rate



</script>

<section> 
  <div class="flex items-center w-full bg-base-100 shadow rounded-box mb-10 divide-x">
    <!-- BTC价格 -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">BTC Oracle Price</div>
      <div class="stat-value text-xl">{$fmtBtcPc}</div>
    </div>

    <!-- ETH价格 -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">ETH Oracle Price</div>
      <div class="stat-value text-xl">{$fmtEthPc}</div>
    </div>

    <!-- 用户质押的BTC -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Your Deposited BTC</div>
      <div class="stat-value text-xl">0.00</div>
    </div>

    <!-- 用户质押的ETH -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Your Deposited ETH</div>
      <div class="stat-value text-xl">{
        dpEthAmt ? parseFloat(dpEthAmt) / Math.pow(10, 18) : "0.00"
      }</div>
    </div>

    <!-- 用户提取的USDa -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Your Borrowed USDa</div>
      <div class="stat-value text-xl">{
        wdUsdaAmt ? parseFloat(wdUsdaAmt) / Math.pow(10, 6) : "0.00"
    }</div>
    </div>

    <!-- 用户提取的EURa -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Your Borrowed EURa</div>
      <div class="stat-value text-xl">0.00</div>
    </div>

    <!-- 用户的质押率 -->
    <div class="inline-grid w-auto grid-cols-1 py-1 px-5">
      <div class="stat-title">Your Collateral Rate (%)</div>
      <div class="stat-value text-xl">{ rate ? parseFloat(rate) / Math.pow(10, 16) : "--"}</div>
    </div>

  </div>

</section>