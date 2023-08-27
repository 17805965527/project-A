<script lang="ts">
  import TradeHeader from './TradeHeader.svelte';
  import Order from './Order.svelte';
  import OrderBook from './OrderBook.svelte';
  import BarChart from './BarChart.svelte';
  import Account from './Account.svelte';

</script>

<section> 
  <!-- 标的选择和展示栏 -->
  <TradeHeader />
  <!-- grid布局 下单 订单簿/最近成交 k线图/简介 现货/衍生品账户 -->
  <div class="grid grid-cols-5 grid-flow-row-6 gap-4">
    <!-- 下单 -->
    <div class="col-span-1 row-span-6">
      <Order />
    </div>
    <!-- 订单簿/最近成交 -->
    <div class="col-span-1 row-span-4">
      <OrderBook />
    </div>
    <!-- k线图/简介 -->
    <div class="col-span-3 row-span-4">
      <BarChart />
    </div>
    <!-- 现货/衍生品账户 -->
    <div class="col-span-4 row-span-2">
      <Account />
    </div>

  </div>
  


</section>