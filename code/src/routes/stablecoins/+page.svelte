<script lang="ts">
  import StablecoinsHeader from "./StablecoinsHeader.svelte";

  import { abdexClient } from '@lib/abdex/client';
  import { userAddr } from "@lib/stores/user";
  // import { Coin } from "@lib/ts-client/abdex.stbcon/types/cosmos/base/v1beta1/coin";

  const oprt = async () => {
    console.log("oprt");  
    const res = await abdexClient.AbdexStbcon.tx.sendMsgOprt({
      value: {
        creator: $userAddr,
        dpStbcons: [],
        dpCollats: [{amount: '1000000000000000000', denom: 'wei'}],
        wdStbcons: [{amount: '1000000000', denom: 'uusda'}],
        wdCollats: [],
      },
      fee: {
        amount: [{ amount: '0', denom: 'uabd' }],
        gas: '200000',
      },
    })
    console.log(res);
    
  }
</script>

<section>
  <!-- 价格显示栏 -->
  <StablecoinsHeader />
  
  <!-- 输入框 -->
  <div class="w-full grid grid-cols-2 gap-x-8 gap-y-8 justify-around mt-10 m-auto shadow rounded-box">
		<div class="m-auto mt-10">
      <span class="label-text">Deposit BTC</span>
      <input type="text" placeholder="0.0000" class="input input-bordered h-7 w-40" />
    </div>
    <div class="m-auto mt-10">
      <span class="label-text">Withdraw BTC</span>
      <input type="text" placeholder="0.0000" class="input input-bordered h-7 w-40 " />
    </div>
    <div class="m-auto mt-10">
      <span class="label-text">Deposit ETH</span>
      <input type="text" placeholder="0.00" class="input input-bordered h-7 w-40" />
    </div>
    <div class="m-auto mt-10">
      <span class="label-text">Withdraw ETH</span>
      <input type="text" placeholder="0.00" class="input input-bordered h-7 w-40 " />
    </div>
    <div class="m-auto mt-10">
      <span class="label-text">Loan USDa</span>
      <input type="text" placeholder="0.00" class="input input-bordered h-7 w-40" />
    </div>
    <div class="m-auto mt-10">
      <span class="label-text">Repay USDa</span>
      <input type="text" placeholder="0.00" class="input input-bordered h-7 w-40 " />
    </div>
    <div class="m-auto mt-10">
      <span class="label-text">Loan EURa</span>
      <input type="text" placeholder="0.00" class="input input-bordered h-7 w-40" />
    </div>
    <div class="m-auto mt-10 mb-10">
      <span class="label-text">Repay EURa</span>
      <input type="text" placeholder="0.00" class="input input-bordered h-7 w-40 " />
    </div>
 
    <button class="btn btn-primary col-span-2 m-auto w-20 mb-10" on:click={oprt}>OPERATE</button>



		

	</div>

</section>