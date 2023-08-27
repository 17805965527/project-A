<script lang="ts">
  import { readable, derived } from 'svelte/store';
  import type { ClobQueryObNResponse } from '@lib/ts-client/abdex.clob/rest';
  import { EncodeRestStr } from '@lib/utils/rest';
  import { abdexClient } from '@lib/abdex/client';
  import { userMkt } from '@lib/stores/user';
  import { denomsMetadata } from '@lib/stores/abdex';

  let orderbookOrLasttrades: 'orderbook'|'lasttrades' = "orderbook"

  // 订单簿
  export const orderBook = readable<ClobQueryObNResponse>({},function start(set) {
    const interval = setInterval(async () => {
      if ($userMkt) {
        abdexClient.AbdexClob.query
          .queryObN(EncodeRestStr($userMkt), 5)
          .then((res) => {
            let ret = res.data;
            let amtMul = 1
            if (ret.sort == "spot") {
              amtMul = 10000000000
            }
            let pcMul = 10000;
            if (ret.sort == "spot") {
              pcMul = 100
            }
            if (ret.askLmts) {
              ret.askLmts = ret.askLmts.reverse()
            }
            if (ret.bidLmts) {
              // denomsMetadata.
              ret.bidLmts.forEach((value, index, array) => {
                array[index] = {
                  pc: (Number(value.pc)/Number(ret.pcTk)*pcMul).toFixed(2),
                  amt: (Number(value.amt)/Number(ret.amtTk)*amtMul).toFixed(2),
                }; 
              });
            }
            if (ret.askLmts) {
              ret.askLmts.forEach((value, index, array) => {
                array[index] = {
                  pc: (Number(value.pc)/Number(ret.pcTk)*pcMul).toFixed(2),
                  amt: (Number(value.amt)/Number(ret.amtTk)*amtMul).toFixed(2),
                }; 
              });
            }
            set(res.data)
            return res.data;
          })
          .catch((error) => {
            console.log('getOrderBook error:', error);
          });
      }
      return {};
    }, 1000);

    return function stop() {
		clearInterval(interval);
	};
  });

</script>

<section class="w-full bg-base-100 shadow rounded-box px-1 py-3"> 
  <!-- order book / last trades 切换 -->
  <div class="tabs">
    <span class="tab tab-bordered tab-active">Order book</span> 
    <!-- <span class="tab tab-bordered">Last trades</span>  -->
  </div>
  <!-- 订单簿ask部分 -->
  <div class="overflow-x-auto mt-2">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Price(USDT)</th>
          <th>Amount(ETH)</th>
        </tr>
      </thead>
      <tbody>
        <!-- row -->
        {#each $orderBook?.askLmts || [] as lmt}
        <tr>
          <td class="text-red-500">{lmt.pc}</td>
          <td>{lmt.amt}</td>
        </tr>  
        {/each}        
        
      </tbody>
    </table>
  </div>
  <!-- 订单簿中间价 -->
  <!-- <div class="test-lgs">1924.24</div> -->
  <!-- 订单簿bid部分 -->
  <div class="overflow-x-auto mt-2">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Price(USDT)</th>
          <th>Amount(ETH)</th>
        </tr>
      </thead>
      <tbody>
        <!-- row -->
        {#each $orderBook?.bidLmts || [] as lmt}
          <tr>
            <td class="text-green-500">{lmt.pc}</td>
            <td>{lmt.amt}</td>
          </tr>  
        {/each}
      </tbody>
    </table>
  </div>



  


</section>