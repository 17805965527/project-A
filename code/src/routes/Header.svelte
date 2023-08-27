<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import abdex_part_logo from '$lib/images/abdex-part-logo.png';
	import { connectKepler } from '@lib/abdex/kepler';
	import { userAddr } from '@lib/stores/user';

	interface MenuItem {
		title: string;
		href: string;
		icon_class: string;
	}

	const menu_items: MenuItem[] = [
		{ title: 'Welcome', href: '/', icon_class: 'icon-[iconamoon--home]' },
		{ title: 'Trade', href: '/trade', icon_class: 'icon-[tabler--chart-bar]' },
		{ title: 'Stable Coins', href: '/stablecoins', icon_class: 'icon-[solar--dollar-outline]' },
		{ title: 'Market Making', href: '/marketmaking', icon_class: 'icon-[mdi--water-outline]' },
		{ title: 'Abdexscan', href: '/abdexscan', icon_class: 'icon-[ph--browser-light]' },
		{ title: 'Payment', href: '/payment', icon_class: 'icon-[mdi--account-payment-outline]' },
		{ title: 'Documentation', href: '/documentation', icon_class: 'icon-[solar--document-linear]' },
		{ title: 'Faucet', href: '/faucet', icon_class: 'icon-[material-symbols--faucet-outline]' },
	];

	let acctDdlOpn = false;

</script>

<!-- 为导航栏添加左右pad -->
<header class="mx-4 mt-1 mb-5">
	<!-- 设置阴影圆角的导航栏整体 -->
	<div class="navbar bg-base-100 mb-39 shadow-lg rounded-box">
  <!-- 导航栏左侧下拉栏 大屏幕隐藏 flex-none不随弹性盒子伸缩 -->
		<div class="flex-none">
			<div class="dropdown">
				<label tabindex="-1" class="btn btn-ghost lg:hidden">
					<span class="icon-[dashicons--menu] h-5 w-5" />
				</label>
				<ul tabindex="-1" class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
					<!-- 左侧导航部分 -->
					{#each menu_items as item}
						<li><a href={item.href}>
							<span class={item.icon_class} />
							{item.title}
						</a></li>
					{/each}
				</ul>
			</div>
		</div>
		<!-- 导航栏左侧的icon和Abdex -->
		<div class="flex-none">
			<a class="btn btn-ghost normal-case text-xl" href="/">
				<img class="h-5" src={abdex_part_logo} alt="abdex_part_logo">
				Abdex
			</a>
		</div>
		<!-- 导航栏剩余的导航部分 -->
	  <div class="flex-1">
			<!-- 小屏幕隐藏 大屏幕flex显示 -->
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<!-- 横向导航栏部分 -->
          {#each menu_items as item}
						<li><a href={item.href}>
							<span class={item.icon_class} />
							{item.title}
						</a></li>
					{/each}

					<!-- <li><a>Item 1</a></li>
					<li><a>Item 3</a></li> -->
				</ul>
			</div>
		</div>
		<!-- 导航栏右侧通知 -->
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<label tabindex="-1" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<!-- 通知图像 -->
            <span class="icon-[iconamoon--notification] h-6 w-6" />
						<!-- 通知数目角标 -->
						<span class="badge badge-sm indicator-item border-none opacity-80">0</span>
					</div>
				</label>
				<div tabindex="-1" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
					<div class="card-body">
						<span class="font-bold text-lg">8 Items</span>
						<span class="text-info">Subtotal: $999</span>
						<div class="card-actions">
							<button class="btn btn-primary btn-block">View cart</button>
						</div>
					</div>
				</div>
			</div>
		</div>
    <!-- 导航栏右侧 -->
		{#if $userAddr != ''}
		  <button on:click={()=>acctDdlOpn=true}>
				<div class="dropdown dropdown-end">
					<button class="badge badge-outline badge-primary h-7" on:click|stopPropagation={()=>acctDdlOpn=!acctDdlOpn}> 
						{$userAddr.slice(0, 9) + '...' + $userAddr.slice(-4)} 
					</button>
					{#if acctDdlOpn}
						<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li><button class="justify-between" on:click={()=>userAddr.set('')}>
									Logout
							</button></li>
						</ul>
					{/if}
				</div>
			</button>
		{/if}
		<!-- 导航栏右侧头像(未登陆) -->
		{#if $userAddr === ''}
			<button class="flex-none" on:click={()=>acctDdlOpn=true}>
				<div class="dropdown dropdown-end">
					<button class="btn btn-ghost btn-circle avatar" on:click|stopPropagation={()=>acctDdlOpn=!acctDdlOpn}>
						<div class="w-7 rounded-full">
							<span class="icon-[clarity--avatar-line] h-7 w-7" />
						</div>
					</button>
					{#if acctDdlOpn}
						<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li><button class="justify-between" on:click={connectKepler}>
									Connect Kepler Wallet
							</button></li>
						</ul>
					{/if}
				</div>
			</button>
		{/if}
		
	</div>
</header>

<style>
	
</style>
