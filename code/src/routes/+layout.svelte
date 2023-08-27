<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './app.css';

</script>

<div class="app">
	<Header />

	<main class="mx-4">
		<slot />
	</main>

	<Footer />
</div>

<style>

</style>
