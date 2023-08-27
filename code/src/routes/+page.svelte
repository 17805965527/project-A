<script lang="ts">
	import { descriptions } from './trade/config';
	import cosmos_network from '$lib/images/cosmos-network.png';
	import { connectKepler } from '@lib/abdex/kepler';

</script>

<svelte:head>
	<title>Abdex - Welcome</title>
	<meta name="description" content="Svelte demo app" />
	<meta name="author" content="gbr@abdex.fi" />
</svelte:head>

<section>
	<!-- 总起介绍 -->
  <div class="w-[1200px] hero mt-20 m-auto">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<img src={cosmos_network} class="max-w-sm rounded-lg" alt="cosmos network"/>
			<div>
				<h1 class="text-5xl font-bold">Abdex Appchain</h1>
				<p class="py-6">A financial application-specific blockchain with fully-decentralized stablecoins and orderbook trading.</p>
				<button class="btn btn-primary" on:click={connectKepler}>Connect Wallet</button>
				<a class="btn btn-outline" href="https://github.com/Abdex-Finance/whitepaper">Read Whitepaper</a>
			</div>
		</div>
	</div>
	<!-- 分项介绍 -->
  <div class="w-[1200px] grid grid-cols-2 gap-x-8 gap-y-2 justify-around mt-10 m-auto">
		{#each descriptions as description}
			<div class="hero h-[300px] rounded-box shadow-lg grid-cols-3">

				<div class="col-span-1">
					<span class="{description.icon_class} h-[150px] w-[150px]" />
				</div>
					
					<div class="col-span-2">
						<div class="grid grid-rows-3">
							<h1 class="text-3xl font-bold row-span-1 pr-4">{description.title}</h1>
						  <p class="py-6 pr-2 row-span-2">{description.detail}</p>

						</div>
						
					</div>
				
			</div>

		{/each}

	</div>
</section>

<style>

</style>
