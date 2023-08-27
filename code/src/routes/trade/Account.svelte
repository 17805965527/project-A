<script lang="ts">
  import { readable, derived } from 'svelte/store';
  import { abdexClient } from '@lib/abdex/client';
  import { userAddr } from "@lib/stores/user";
  import type { V1Beta1Coin } from '@lib/ts-client/cosmos.bank.v1beta1/rest';
  import { frozen } from '@lib/stores/abdex';

  let accountType: 'spot'|'usda' = "spot"

  // spot账户余额
  const spotBalance = readable<V1Beta1Coin[]>([], function start(set) {
    const interval = setInterval(async () => {
      if ($userAddr) {
        abdexClient.CosmosBankV1Beta1.query
          .queryAllBalances($userAddr)
          .then((res) => {
            if (res.data.balances) {
              let balances = res.data.balances;
              balances.forEach((value, index, array) => {
                if (value.denom === "wei") {
                  array[index] = {
                    denom: "ETH",
                    amount: (Number(value.amount)/Math.pow(10, 18)).toFixed(2),
                  }; 
                }
                if (value.denom === "uusda") {
                  array[index] = {
                    denom: "USDa",
                    amount: (Number(value.amount)/Math.pow(10, 6)).toFixed(2),
                  }; 
                }
                set(balances)
              });
            }
          })
          .catch((error) => {
            console.log('getSpotBalance error:', error);
          });
      }
    }, 1000);

    return function stop() {
		clearInterval(interval);
  };
  });

  let margin = 0;

  const fakeDeposit = async () => {
    abdexClient.AbdexDeriv.tx.sendMsgPlcLmtodr({
      value: {
        creator: $userAddr,
        mkt: "NQ.CME/USDa:USDa-230915",
        pc: 1,
        amt: 1000,
        bid: true,
        mm: false,
      },
      fee: {
        amount: [{ amount: '0', denom: 'uabd' }],
        gas: '200000',
      },
    })
    await new Promise( resolve => setTimeout(resolve, 5000));
    margin = 2000;
  }
 

</script>

<section class="w-full bg-base-100 shadow rounded-box px-1 py-3"> 
  <!-- 账户切换 -->
  <div class="tabs">
    {#if accountType === "spot"}
      <span class="tab tab-bordered tab-active">Spot Account</span>
    {:else}
      <span class="tab tab-bordered">Spot Account</span>
    {/if}

    {#if accountType === "usda"}
      <span class="tab tab-bordered tab-active">USDa Margin Account</span>
    {:else}
      <span class="tab tab-bordered" on:click={() => {accountType="usda"}}>USDa Margin Account</span>
    {/if}
    <span class="tab tab-bordered">BTC Margin Account</span> 
    <span class="tab tab-bordered">ETH Margin Account</span> 
  </div>
  <!-- 账户展示 -->
  {#if accountType === 'spot'}
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Denom</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <!-- row -->
          {#each $spotBalance as balance}
            <tr>
              <th></th>
              <td>{balance.denom}</td>
              <td>{balance.amount}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if accountType === 'usda'}
     
    <div class="overflow-x-auto">
      <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs ml-1" />
      <button class="btn mt-3 w-30" on:click={fakeDeposit}>Deposit</button>
      <button class="btn btn-primary w-30">Withdraw</button>
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Margin</th>
            <th>Frozen</th>
          </tr>
        </thead>
        <tbody>
          <!-- row -->
          <tr>
            <th></th>
            <td>{margin.toFixed(2)}</td>
            <td>{$frozen.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
  


</section>